import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import FlexImage from 'react-native-flex-image'
import styles from './Style'
import { centToDollar, getRelativeDate, getRandomNonDuplicate } from 'Utils'
import { Images, Colors, Projects } from 'Config'

import { getBatchProduct, reset } from 'Redux/reducer'
import { ModalSort, LoadingDot } from 'Component'

class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_filter_visible: false,
      filter_type: null,
      page: 0,
      limit: Projects.fetch_limit,
      product: [],
      prev_ads: -1,
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
    let adsSize = Math.floor(this.state.product.length / Projects.ads_interval) // the amount of ads which has been shown to user
    let productTotal = this.state.product.length - adsSize   // the total product shown to user (except ads)

    // every 50 product shown, do pre-emptive fetch on the next 50 products
    if(productTotal % this.state.limit === 0) {
      this._loadProduct()
    }

    // get the subsequent batch from pre-emptive fetch which will be shown to user
    let newBatch = newProduct.slice(productTotal, productTotal + Projects.batch_limit)

    // adding ads on every 20 products shown
    if((productTotal + Projects.batch_limit) % Projects.ads_interval === 0) {   // check whether needs to add the ads or not
      let adsIndex, isValidIndex = false
      // generate ads which differs with previous ads
      while(!isValidIndex) {
        let randomIndex = Math.floor( Math.random() * 1000 )
        if((this.state.prev_ads % 10) !== (randomIndex % 10)) {
          adsIndex = randomIndex
          isValidIndex = true
        }
      }
      // adding ads to product list
      let adsItem = { url: Projects.adsURL + adsIndex }
      newBatch = newBatch.concat(adsItem)
    }

    this.setState((prevState) => {
      return { product: prevState.product.concat(newBatch) }      // show latest batch to user
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
    if(item.hasOwnProperty('face')) {     // show product
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
    } else {                              // show ads
      return (
        <View style={styles.adsContainer}>
          <FlexImage
            loadingComponent={<ActivityIndicator color={Colors.theme} />}
            source={{ uri: item.url }}
          />
          <Text style={styles.itemDate}>Ads</Text>
        </View>
      )
    }
  }

  // configure layout below the product list
  _renderFooter = () => {
    if( !this.props.is_batch_complete ||    // show loading screen while preparing next batch to show on screen
        this.state.product.length < this.props.product.length ) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingDot style={styles.loadingFooterDot} numberOfDots={5} animationDelay={150} />
        </View>
      )
    }
    else {    // show message after reaching the final batch
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingFooterTitle}>~ End of Catalogue ~</Text>
        </View>
      )
    }
  }

  render() {
    if(!this.state.is_fetching && this.state.product.length > 0) {  // show list only if product is not empty
      return (
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Buy My Faces</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList     // product list
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
