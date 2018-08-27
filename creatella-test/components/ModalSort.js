import React, { Component } from 'react'
import { StyleSheet, View, Modal, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Metrics, Images } from 'Config'

/*
* Modal showing option of sort
*/
export default class ModalSort extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sort_selected: null,
    }
  }

  // user choose one of sorting options
  _onSortingChanged(type) {
    this.setState({ sort_selected: type })
  }

  // select style for sorting options container, depending on whether is being selected or not
  _getStyleButton(tipe) {
    let bgColor
    switch (tipe) {
      case 'size': bgColor = Colors.theme; break;
      case 'price': bgColor = Colors.themeHighlight; break;
      case 'id': bgColor = Colors.themeDark; break;
      default: bgColor = Colors.theme; break;
    }
    return this.state.sort_selected === tipe ?
              [ styles.sortItemSelected, {backgroundColor: bgColor} ] :
              styles.sortItem
  }

  // select style for sorting options title, depending on whether is being selected or not
  _getStyleButtonTitle(tipe) {
    return this.state.sort_selected === tipe ? styles.titleItemSelected : styles.titleItem
  }

  // unselect any selected sorting option
  _onCancelSorting() {
    this.setState({ sort_selected: null })
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => this.props.onModalClosed()}>
        <View style={styles.container}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sort by</Text>
          </View>

          <View style={styles.sortContainer}>
            <TouchableOpacity
              onPress={() => this._onSortingChanged('size')}
              style={this._getStyleButton('size')}>
              <Text style={this._getStyleButtonTitle('size')}>
                size
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onSortingChanged('price')}
              style={this._getStyleButton('price')}>
              <Text style={this._getStyleButtonTitle('price')}>
                price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onSortingChanged('id')}
              style={this._getStyleButton('id')}>
              <Text style={this._getStyleButtonTitle('id')}>
                id
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                this._onCancelSorting()
                this.props.closeModal(null)
              }}
              style={styles.buttonCancel}>
              <Text style={styles.buttonTitle}>CLEAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.closeModal(this.state.sort_selected)}
              style={styles.buttonOk}>
              <Text style={styles.buttonTitle}>SORT</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Metrics.baseHeight * 30,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowRadius: 15,
    shadowOpacity: 0.4,
    borderTopWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.themeDark,
  },
  sortContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: 'white'
  },
  sortItem: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    borderRadius: 20,
  },
  sortItemSelected: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  titleItemSelected: {
    color: 'white'
  },
  titleItem: {
    color: Colors.themeDark
  },
  buttonContainer: {
    flex: 0.25,
    flexBasis: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonOk: {
    flex: 1,
    backgroundColor: Colors.themeButton,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: Colors.themeLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

ModalSort.propTypes = {
  isVisible: PropTypes.bool,                  // should modal shown or not
  closeModal: PropTypes.func.isRequired,      // close the modal
}
