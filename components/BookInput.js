import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, Keyboard } from 'react-native'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

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

// More info on all the options is below in the README...just some common use cases shown here
var ImageOptions = {
  title: 'Choose a photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
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
    value: null,
    path: '',
    filename: '',
    timestamp: ''
  }
  onAddBookButton = () => {
    this.setState({ loading: true })
    var book = ({ title, author, publisher, description, isbn, price } = this.refs.form.getValue() || {})
    if (Object.keys(book).length != 0 && this.state.path.length) {
      this.props.onSubmitPress(book, this.state.path, this.state.filename, this.state.timestamp, res => {
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

  onChoosePhotoButton = () => {
    ImagePicker.showImagePicker(ImageOptions, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        var imageUri = response.uri + ''
        // console.log('imageUri', imageUri)
        // var path = response.path + ''
        var filename = response.fileName + ''
        var timestamp = response.timestamp + ''
        ImageResizer.createResizedImage(imageUri, 328, 495, 'JPEG', 60).then(response => {
          // console.log('response', response)
          var path = response.path + ''
          this.setState({ path, filename, timestamp })
        })
        // .catch(err => {
        //   console.log('err', err)
        //   Alert.alert('Oops, something went wrong', err)
        // })
      }
    })
  }

  onChange = value => {
    this.setState({ value })
  }

  render () {
    const { inputStyle, labelStyle, containerStyle } = styles
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onChoosePhotoButton} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Choose a photo...</Text>
        </TouchableHighlight>

        {/* display */}
        <Form ref='form' type={Book} options={options} value={this.state.value} onChange={this.onChange} />
        <TouchableHighlight
          style={this.state.loading ? styles.disabledButton : styles.button}
          onPress={this.onAddBookButton}
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
