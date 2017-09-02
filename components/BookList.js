import React from 'react'
import { StyleSheet, Text, View, ListView } from 'react-native'
import BookDetail from './BookDetail'
import { Actions } from 'react-native-router-flux'
import firebase from '../config/Firebase'

export default class BookList extends React.Component {
  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = { dataSource }
  }

  componentDidMount () {
    this.ref = firebase.database().ref('books')
    this.ref.on('value', this.handleToDoUpdate)
  }

  handleToDoUpdate = snapshot => {
    this.books = snapshot.val() || {}

    // for (snap in snapshot.val()) {
    //   console.log('snap', snap)
    //   this.books.push({id: snap, {}})
    // }
    console.log('books=', this.books)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.books)
    })
  }

  // Add a new Book onto Firebase
  // If offline, this will still trigger an update to handleBookUpdate
  addBook (bookId) {
    firebase.database().ref('users/user1').push({ bookId })
    console.log('added book')
  }

  handleRoute = bookData => {
    const handleAdd = this.addBook
    return Actions.book({ bookData, handleAdd })
  }

  _renderRow = rowData => {
    return <BookDetail {...rowData} handleRoute={() => this.handleRoute(rowData)} />
  }

  render () {
    return <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
  }
}
