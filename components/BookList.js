import React from 'react'
import { StyleSheet, Text, View, ListView, Button } from 'react-native'
import BookDetail from './BookDetail'
import { Actions } from 'react-native-router-flux'
import firebase from '../config/Firebase'

export default class BookList extends React.Component {
  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = { dataSource, user: {} }
    this.totalBuys = []
  }

  static navigationOptions = {
    headerLeft: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.ref = firebase.database().ref(`bookshelfs/${user.uid}`)
        this.ref.once().then(ss => {
          // {{ "123" : 0 }, {"543543":9}}
          this.totalBuys = ss.val() || {}

          this.ref = firebase.database().ref('books')
          this.ref.on('value', this.handleToDoUpdate)
        })
      }
    })
    firebase.messaging().subscribeToTopic('promotion')
    firebase.messaging().getToken().then(token => {
      console.log('Device FCM Token: ', token)
    })
  }

  getTotalBuy = primary_isbn10 => {
    // {{ "123" : 0 }, {"543543":9}}
    for (let key in this.totalBuys) {
      if (key === primary_isbn10) return this.totalBuys[key]
    }

    return 0
    // const lists = this.totalBuys.filter(broughtBook => broughtBook[primary_isbn10])
    // return lists.length > 0 ? lists[0][primary_isbn10] : 0
  }

  handleToDoUpdate = snapshot => {
    this.books = snapshot.val() || {}
    console.log('books=', this.books)

    this.books = this.books.map(book => {
      /*
       totalBuys = [ { "1455572101": 10 } ]
      */

      book.totalBuy = this.getTotalBuy(book.primary_isbn10)
      return book
    })

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.books)
    })
  }

  // Add a new Book onto Firebase
  // If offline, this will still trigger an update to handleBookUpdate
  // addBook (bookId) {
  //   firebase.database().ref('users/user1').push({ bookId })
  //   console.log('added book')
  // }

  handleRoute = bookData => {
    // const handleAdd = this.addBook
    return Actions.book({ bookData }) //, handleAdd
  }

  _renderRow = rowData => {
    return <BookDetail {...rowData} handleRoute={() => this.handleRoute(rowData)} />
  }

  render () {
    return (
      <View>
        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
      </View>
    )
  }
}
