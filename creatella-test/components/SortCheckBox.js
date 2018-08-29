import React, { Component } from 'react'
import { StyleSheet, View, Modal, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Metrics, Images } from 'Config'
import FlexImage from 'react-native-flex-image'

/*
* Modal showing option of sort
*/
export default class SortCheckBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sort_selected: null,
      sort_types: ['size', 'price', 'id'],
    }
  }

  // user choose one of sorting options
  _onSortingChanged(type) {
    if(!this.props.isEnabled) return                          // if not allowed to change sorting option, then do nothing
    this.setState({ sort_selected: type }, () => {
      this.props.onSortingChanged(this.state.sort_selected)   // notify parents component that sorting option changed
    })
  }

  // select style for sorting options container, depending on whether is being selected or not
  _getButtonStyle(tipe) {
    let bgColor
    switch (tipe) {
      case 'size': bgColor = Colors.themeHighlight; break;
      case 'price': bgColor = Colors.theme; break;
      case 'id': bgColor = Colors.themeDark; break;
      default: bgColor = Colors.theme; break;
    }
    return this.state.sort_selected === tipe ?
              [ styles.sortItemSelected, {backgroundColor: bgColor} ] :
              styles.sortItem
  }

  // select style for sorting options title, depending on whether is being selected or not
  _getButtonTitleStyle(tipe) {
    return this.state.sort_selected === tipe ? styles.titleItemSelected : styles.titleItem
  }

  // unselect any selected sorting option
  _onCancelSorting() {
    if(!this.props.isEnabled) return                          // if not allowed to change sorting option, then do nothing
    this.setState({ sort_selected: null }, () => {
      this.props.onSortingChanged(this.state.sort_selected)   // notify parents component that sorting option changed
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Sort by </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollContainer}>
          { this.state.sort_types.map((item, i) =>
            (
              <TouchableOpacity
                key={i}
                onPress={() => this._onSortingChanged(item)}
                style={this._getButtonStyle(item)}>
                <Text style={this._getButtonTitleStyle(item)}>
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
          <View style={styles.cancelContainer}>
            <FlexImage
              style={styles.cancelImage}
              source={Images.clear}
              onPress={() => this._onCancelSorting()}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  info: {
    color: Colors.themeLight,
    alignSelf: 'center',
  },
  scrollContainer: {
    padding: 8
  },
  sortItem: {
    flex: 0.5,
    flexBasis: 30,
    paddingVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowRadius: 5,
    shadowColor: Colors.themeLight,
    shadowOpacity: 0.5,
    borderRadius: 20,
  },
  sortItemSelected: {
    flex: 1,
    flexBasis: 30,
    paddingVertical: 5,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  titleItemSelected: {
    marginHorizontal: 15,
    color: 'white'
  },
  titleItem: {
    marginHorizontal: 15,
    color: Colors.themeDark
  },
  cancelContainer: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  cancelImage: {
    flex:0.5
  }
})

SortCheckBox.propTypes = {
  onSortingChanged: PropTypes.func.isRequired,      // function which called when sorting option changed
  isEnabled: PropTypes.bool,                        // activate/deactivate sorting changes
}

SortCheckBox.defaultProps = {
  isEnabled: true,
}
