import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import firebase from './config/Firebase'
import BookList from './components/BookList'
import Book from './components/Book'
import LogInForm from './components/LogInForm'

export default class fb01 extends Component {
  state = {
    isUser: false,
    isLoading: true
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isUser: true, isLoading: false })
      } else {
        this.setState({ isUser: false, isLoading: false })
      }
    })
  }

  render () {
    return this.state.isLoading
      ? <View><Text>loading...</Text></View>
      : <Router>
        <Scene key='root' navigationBarStyle={{ backgroundColor: '#2980b9' }}>
          {!this.state.isUser
              ? <Scene key='logIn' component={LogInForm} title='Login' initial />
              : <Scene key='bookStore' component={BookList} title='Book Store' initial />}
          <Scene key='book' component={Book} title='Detail' />
        </Scene>
      </Router>
  }
}

AppRegistry.registerComponent('fb01', () => fb01)
