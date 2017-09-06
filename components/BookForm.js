import React from 'react'
import { Text, View, Button, TextInput, ScrollView } from 'react-native'
import firebase from '../config/Firebase'
import BookInput from './BookInput'
import { Actions } from 'react-native-router-flux'

export default class BookForm extends React.Component {
  onSubmitPress = (book, callback) => {
    firebase
      .database()
      .ref('books')
      .push({
        title: book.title.toUpperCase(),
        author: book.author,
        publisher: book.publisher,
        description: book.description,
        primary_isbn10: book.isbn,
        price: book.price
      })
      .then(callback('SUCCESS'))
      .catch(err => {
        callback(err)
      })
  }

  render () {
    return (
      <View>
        <ScrollView>
          <BookInput onSubmitPress={this.onSubmitPress} />
        </ScrollView>
      </View>
    )
  }
}
