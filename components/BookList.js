import React from 'react'
import { StyleSheet, Text, View, ListView } from 'react-native'
import BookDetail from './BookDetail'
import { Actions } from 'react-native-router-flux'

// const data = [
//   { bookId: 1, title: 'SEEING RED', author: 'Sandra Brown', book_image: 'https://s1.nyt.com/du/books/images/9781455572106.jpg' },
//   { bookId: 2, title: 'THE STORE', author: 'James Patterson and Richard DiLallo', book_image: 'https://s1.nyt.com/du/books/images/9780316395540.jpg' },
//   { bookId: 3, title: 'CAMINO ISLAND', author: 'John Grisham', book_image: 'https://s1.nyt.com/du/books/images/9780385543057.jpg' }
// ]

export default class BookList extends React.Component {
  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = { dataSource }
  }

  componentWillMount () {
    fetch('http://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=73b19491b83909c7e07016f4bb4644f9%3A2%3A60667290')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJSON.results.books)
        })
      })
  }

  handleRoute = bookData => {
    return Actions.book({ bookData })
  }

  _renderRow = rowData => {
    return <BookDetail {...rowData} handleRoute={() => this.handleRoute(rowData)} />
  }

  render () {
    return <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
  }
}
