/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import BookList from './components/BookList'
import Book from './components/Book'
// import ToDos from './components/ToDos'

export default class fb01 extends Component {
  render () {
    return (
      <Router>
        <Scene key='root' navigationBarStyle={{ backgroundColor: '#2980b9' }}>
          <Scene key='bookStore' component={BookList} title='Book Store' initial />
          <Scene key='book' component={Book} title='Detail' />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('fb01', () => fb01)
