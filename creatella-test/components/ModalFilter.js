import React, { Component } from 'react'
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

/*
* Modal showing option of filter
*/
export default class ModalFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filter_selected: null,
    }
  }

  // user choose one of filter
  _onFilterChanged(type) {
    this.setState({ filter_selected: type })
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => this.props.onModalClosed()}>
        <View style={styles.container}>

          <Text style={styles.title}>Filter by</Text>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => this._onFilterChanged('size')}
              style={this.state.filter_selected === 'size' ? styles.filterItemSelected : styles.filterItem}>
              <Text style={this.state.filter_selected === 'size' ? styles.titleItemSelected : styles.titleItem}>
                size
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onFilterChanged('price')}
              style={this.state.filter_selected === 'price' ? styles.filterItemSelected : styles.filterItem}>
              <Text style={this.state.filter_selected === 'price' ? styles.titleItemSelected : styles.titleItem}>
                price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onFilterChanged('id')}
              style={this.state.filter_selected === 'id' ? styles.filterItemSelected : styles.filterItem}>
              <Text style={this.state.filter_selected === 'id' ? styles.titleItemSelected : styles.titleItem}>
                id
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.props.closeModal(this.state.filter_selected)}
              style={styles.button}>
              <Text style={styles.buttonTitle}>OK</Text>
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
    height: 200,
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
  title: {
    alignSelf: 'center',
    fontSize: 17,
    marginTop: 10,
  },
  filterContainer: {
    flex: 2,
    flexDirection: 'row',
    marginVertical: 15,
  },
  filterItem: {
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
  filterItemSelected: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  titleItemSelected: {
    color: 'white'
  },
  titleItem: {

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white'
  }
})

ModalFilter.propTypes = {
  isVisible: PropTypes.bool,                  // should modal shown or not
  closeModal: PropTypes.func.isRequired,      // close the modal
}
