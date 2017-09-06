import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, Keyboard } from 'react-native'
import t from 'tcomb-form-native'

var Form = t.form.Form
// var options = {}
var options = {
  // auto: 'placeholders',
  fields: {
    description: {
      // autoCapitalize: 'none',
      // autoCorrect: false,
      // secureTextEntry: true,
      // underlineColorAndroid: 'transparent',
      // blurOnSubmit: true,
      multiline: true,
      numberOfLines: 3
    }
  }
}

// here we are: define your domain model
var Book = t.struct({
  title: t.String, // a required string
  author: t.String,
  publisher: t.String,
  description: t.String,
  isbn: t.String,
  price: t.Number
})

// var Book = t.struct({
//   name: t.String, // a required string
//   surname: t.maybe(t.String), // an optional string
//   age: t.Number, // a required number
//   rememberMe: t.Boolean // a boolean
// })

export default class BookInput extends React.Component {
  state = {
    loading: false
  }
  // onPress = () => {
  //   this.setState({ loading: true })
  //   var book = ({ title, author, publisher, description, isbn, price } = this.refs.form.getValue() || {})
  //   if (!title || !author || !publisher || !description || !isbn || !price) {
  //     this.setState({ loading: false })
  //     Alert.alert('Error', 'Please fill in all information', [{ text: 'Try again', onPress: () => console.log('Try again pressed') }], { cancelable: false })
  //   } else {
  //     this.props.onSubmitPress(book, (err, user) => {
  //       this.setState({ loading: false })
  //       if (err != null) {
  //         Alert.alert('Add failed', err.message, [{ text: 'Try again', onPress: () => console.log('Try again pressed') }], { cancelable: false })
  //       }
  //       Keyboard.dismiss()
  //     })
  //   }
  // }

  render () {
    const { inputStyle, labelStyle, containerStyle } = styles
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref='form' type={Book} options={options} />
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
// <View style={containerStyle}>
//   <Text style={labelStyle}>{label.toUpperCase()}</Text>
//   <TextInput autoCorrect={false} placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} onChangeText={onChangeText} style={inputStyle} />
// </View>

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
