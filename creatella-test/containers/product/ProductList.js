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
      page: 1,
      limit: 30,
    }
  }

  componentDidMount() {
    this._loadProduct()                     // get first batch of product to be displayed initially
  }

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
      page: 1,
    }, () => {
      this.props.reset()                    // clear out the already downloaded product list
      this._loadProduct()                   // repopulate list with the sorted product list
    })
  }

  // get more product each time user sees the end of product list
  _onLoadMore() {
    this.setState((prev) => {
      return { page: prev.page + 1 }
    }, () => {
      this._loadProduct()
    })
  }

  // call api to get product
  _loadProduct() {
    let param = '_page=' + this.state.page +
                '&_limit=' + this.state.limit +
                ( this.state.filter_type !== null ? '&_sort=' + this.state.filter_type : '' )
    this.props.getBatchProduct(param)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.93}}>
          <FlatList
            styles={styles.container}
            data={this.props.product}
            renderItem={this._renderProduct}
            keyExtractor={(item, index) => item.id}
            onEndReached={() => this._onLoadMore()}
          />
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
