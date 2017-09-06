import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, Keyboard } from 'react-native'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'

var Form = t.form.Form
// var options = {}
var options = {
  fields: {
    title: {
      autoFocus: true,
      value: 'tt'
    },
    description: {
      numberOfLines: 3
    },
    isbn: {
      label: 'ISBN Number'
    },
    price: {
      label: 'Price (Baht)'
    }
  }
}

var Book = t.struct({
  title: t.String,
  author: t.String,
  publisher: t.String,
  description: t.String,
  isbn: t.String,
  price: t.Number
})

export default class BookInput extends React.Component {
  state = {
    loading: false,
    value: null
  }
  onPress = () => {
    this.setState({ loading: true })
    var book = ({ title, author, publisher, description, isbn, price } = this.refs.form.getValue() || {})
    if (Object.keys(book).length != 0) {
      this.props.onSubmitPress(book, res => {
        this.setState({ loading: false })
        if (res === 'SUCCESS') {
          Alert.alert('Success', 'Your book is already added.', [{ text: 'OK', onPress: () => Actions.bookStore() }], { cancelable: false })
        } else if (res != null) {
          Alert.alert('Add failed', err.message, [{ text: 'Try again', onPress: () => console.log('Try again pressed') }], { cancelable: false })
        }
        Keyboard.dismiss()
      })
    } else {
      this.setState({ loading: false })
      Alert.alert('Error', 'Please fill in all information', [{ text: 'Try again', onPress: () => console.log('Try again pressed') }], { cancelable: false })
    }
  }

  onChange = value => {
    this.setState({ value })
  }

  render () {
    const { inputStyle, labelStyle, containerStyle } = styles
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref='form' type={Book} options={options} value={this.state.value} onChange={this.onChange} />
        <TouchableHighlight
          style={this.state.loading ? styles.disabledButton : styles.button}
          onPress={this.onPress}
          underlayColor='#99d9f4'
          disabled={this.state.loading}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabledButton: {
    height: 36,
    backgroundColor: '#bdc3c7',
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
