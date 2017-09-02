import React from 'react'
import { StyleSheet, Text, View, ListView, Image, TouchableHighlight } from 'react-native'

const BookDetail = ({ handleRoute, book_image, title, contributor }) => (
  <TouchableHighlight onPress={handleRoute}>
    <View style={styles.container}>
      <Image source={{ uri: book_image }} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.authorText}>{contributor}</Text>
      </View>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 5,
    flex: 1
  },
  image: {
    flex: 1,
    width: 80
  },
  detailContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 12
  },
  titleText: {
    fontSize: 16
  },
  authorText: {
    fontSize: 14,
    color: 'grey'
  }
})

export default BookDetail
