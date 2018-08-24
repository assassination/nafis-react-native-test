import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import styles from './Style'

import { getBatchProduct } from 'Redux/reducer'

class ProductList extends Component {

  componentDidMount() {
    this.props.getBatchProduct()
  }

  _renderProduct = ({ item }) => (
    <View>
      <Text>{item.face}</Text>
    </View>
  )

  render() {
    return (
      <FlatList
        styles={styles.container}
        data={this.props.product}
        renderItem={this._renderProduct}
      />
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
