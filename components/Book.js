import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class Book extends React.Component {
  render () {
    const book = this.props.bookData
    console.log('book=', book.key)
    const handleAdd = this.props.handleAdd
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}><Text style={styles.rankText}>#{book.rank}</Text> {book.title}</Text>
        <Image source={{ uri: book.book_image }} style={styles.image} />

        <View style={{ flex: 1, margin: 10 }}>
          <Detail header='Description: ' body={book.description} />
          <Detail header='Author: ' body={book.author} />
          <Detail header='Publisher: ' body={book.publisher} />
          <Detail header='Price: ' body={book.price} />
          <Button title={'Buy'} onPress={() => handleAdd(0)} />
        </View>
      </View>
    )
  }
}

const Detail = ({ header, body }) => <Text style={styles.detailText}><Text style={styles.boldText}>{header}: </Text>{body}</Text>

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    color: 'black'
  },
  detailText: {
    padding: 5,
    color: 'dimgrey'
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  rankText: {
    color: 'darkslategrey'
  },
  image: {
    margin: 10,
    flex: 1,
    resizeMode: 'contain'
  },
  container: {
    flexDirection: 'column',
    flex: 1
  }
})
