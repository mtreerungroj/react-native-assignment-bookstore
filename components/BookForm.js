import React from 'react'
import { Text, View, Button, TextInput, ScrollView } from 'react-native'
import firebase from '../config/Firebase'
import BookInput from './BookInput'
import { Actions } from 'react-native-router-flux'

export default class BookForm extends React.Component {
  onSubmitPress = (book, callback) => {
    firebase
      .database()
      .ref('books/')
      .set({
        ...this.books,
        book
      })
      .catch(err => {
        callback(err)
      })
  }

  render () {
    return (
      <View>
        <ScrollView>
          <BookInput onSubmitPress={this.onLoginPress} />
        </ScrollView>
      </View>
    )
  }
}
