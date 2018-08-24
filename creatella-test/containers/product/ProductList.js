import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from './Style'
import { centToDollar, getRelativeDate } from 'Utils'

import { getBatchProduct } from 'Redux/reducer'
import { ModalFilter } from 'Component'

class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_filter_visible: false,
      filter_type: null,
    }
  }

  componentDidMount() {
    this.props.getBatchProduct(this.state.filter_type)
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
      filter_type: type
    }, () => {
      this.props.getBatchProduct(this.state.filter_type)    // get sorted product list
    })
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
    product: state.data
  }
}

const mapDispatchToProps = {
  getBatchProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
