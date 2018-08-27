import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from './Style'
import { centToDollar, getRelativeDate } from 'Utils'

import { getBatchProduct, reset } from 'Redux/reducer'
import { ModalFilter } from 'Component'

class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_filter_visible: false,
      filter_type: null,
      page: 0,
      limit: 50,
      product: []
    }
  }

  componentDidMount() {
    this._loadProduct()                     // get first batch of product to be displayed to user initially
  }

  componentWillReceiveProps(next) {
    if(this.props.product !== next.product && this.props.product.length === 0) {
      this._onShowNextBatch(next.product)     // show the first batch of product to user
    }
  }

  // configure template layout for each product
  _renderProduct = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.face}</Text>
      <Text>{centToDollar(item.price)}</Text>
      <Text>{getRelativeDate(item.date)}</Text>
    </View>
  )

  // show filter options
  _onShowFilter() {
    this.setState({ is_filter_visible: true })
  }

  // when user finished choosing one of the filter
  _onFilterChanged(type) {
    this.setState({
      is_filter_visible: false,
      filter_type: type,
      page: 0,
      product: []
    }, () => {
      this.props.reset()                    // clear out the already downloaded product list
      this._loadProduct()                   // repopulate list with the sorted product list
    })
  }

  // if the user reach the end of list
  _onEndReached() {
    this._onShowNextBatch(this.props.product)                           // show next batch each time user reach the end of list
  }

  // show the next batch of product to user
  _onShowNextBatch(newProduct) {
    if(this.state.product.length % this.state.limit === 0) {
      this._loadProduct()                                               // every 50 product shown to user, call api to fetch next 50 batch
    }
    this.setState((prevState) => {
      let productTotal = prevState.product.length                       // total product shown to user
      let newBatch = newProduct.slice(productTotal, productTotal + 10)  // obtain subsequent batch from redux
      return { product: prevState.product.concat(newBatch) }            // show new batch to user
    })
  }

  // call api to batch load the product list
  _loadProduct() {
    this.setState((prev) => {
      return { page: prev.page + 1 }                                    // make sure subsequent batch to be downloaded
    }, () => {
      let param = '_page=' + this.state.page +
                  '&_limit=' + this.state.limit +
                  ( this.state.filter_type !== null ? '&_sort=' + this.state.filter_type : '' )
      this.props.getBatchProduct(param)                                 // start api call
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.93}}>
          { this.state.product &&                     // show list only if product is not empty
            <FlatList
              styles={styles.container}
              data={this.state.product}
              renderItem={this._renderProduct}
              keyExtractor={(item, index) => item.id}
              onEndReachedThreshold={0}
              onEndReached={() => this._onEndReached()}
            />
          }
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this._onShowFilter()}
            style={styles.button}>
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>
        <ModalFilter
          isVisible={this.state.is_filter_visible}
          closeModal={(type) => this._onFilterChanged(type)}
          onFilterActive={(filter) => this._onFilterChanged(filter)}/>
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    product: state.data,
    is_batch_complete: state.is_batch_complete,
  }
}

const mapDispatchToProps = {
  getBatchProduct,
  reset
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
