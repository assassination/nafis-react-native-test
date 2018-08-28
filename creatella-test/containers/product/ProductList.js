import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import styles from './Style'
import { centToDollar, getRelativeDate } from 'Utils'
import { Images } from 'Config'

import { getBatchProduct, reset } from 'Redux/reducer'
import { ModalSort, LoadingDot } from 'Component'

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

  // configure template layout for each product
  _renderProduct = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemFaceContainer}>
          <Text style={[ styles.itemFace, {fontSize: item.size} ]}> {item.face} </Text>
        </View>
        <View style={styles.itemDetailContainer}>
          <Text style={styles.itemPrice}> {centToDollar(item.price)} </Text>
          <Text style={styles.itemDate}> {getRelativeDate(item.date)} </Text>
        </View>
      </View>
    )
  }

  // configure footer layout below the product list
  _renderFooter = () => {
    return (  // show loading screen while preparing next batch to show on screen
      <View style={styles.loadingContainer}>
        <LoadingDot style={styles.loadingFooterDot} numberOfDots={5} animationDelay={150} />
      </View>
    )
  }

  render() {
    if(!this.state.is_fetching && this.state.product.length > 0) {  // show list only if product is not empty
      return (
        <View style={{flex: 1}}>
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.product}
              renderItem={this._renderProduct}
              keyExtractor={(item, index) => item.id}
              onEndReachedThreshold={0}
              onEndReached={() => this._onEndReached()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.itemWrapper}
              ListFooterComponent={this._renderFooter}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity     // button to open modal for choosing sorting option
              onPress={() => this._onShowFilter()}
              style={styles.button}>
              <Text style={styles.buttonTitle}>SORT</Text>
              <Image source={Images.sort} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
          <ModalSort      // show modal to display sorting option
            isVisible={this.state.is_filter_visible}
            closeModal={(type) => this._onFilterChanged(type)}
            onFilterActive={(filter) => this._onFilterChanged(filter)}/>
        </View>
      )
    } else {      // show loading screen, while fetching initial batch
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>Loading</Text>
          <LoadingDot style={styles.loadingDot} />
        </View>
      )
    }
  }

}

const mapStateToProps = state => {
  return {
    product: state.data,                          // holds all product item
    is_fetching: state.is_fetching,               // indicate whether now is still fetching or not
    is_batch_complete: state.is_batch_complete,   // indicate whether all batch is fetched succesfully or not
  }
}

const mapDispatchToProps = {
  getBatchProduct,
  reset
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
