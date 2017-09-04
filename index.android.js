import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { Actions } from 'react-native-router-flux'
import firebase from './config/Firebase'
import BookList from './components/BookList'
import Book from './components/Book'
import LogInForm from './components/LogInForm'
import AmazonProduct from './components/AmazonProduct'

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

  // onLoginPress = (email, password) => {
  //   console.log(email, password)
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(user => {
  //       console.log('User successfully logged in')
  //       this.setState({ isUser: true, isLoading: false })
  //       Action.bookList()
  //     })
  //     .catch(err => {
  //       console.error('User signin error', err)
  //     })
  // }

  // onLogoutPress = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       console.log('User signed out successfully')
  //       this.setState({ isUser: false, isLoading: false })
  //       Action.logIn()
  //     })
  //     .catch()
  // }

  render () {
    return this.state.isLoading
      ? <View><Text>loading...</Text></View>
      : <Router>
        <Scene key='root' navigationBarStyle={{ backgroundColor: '#2980b9' }}>
          <Scene key='logIn' component={LogInForm} title='Login' initial />
          <Scene key='bookStore' component={BookList} title='Book Store' onBack={() => {}} />
          <Scene key='book' component={Book} title='Detail' />
          <Scene key='amazonProduct' component={AmazonProduct} title='Amazon Product' />
        </Scene>
      </Router>
  }
}

AppRegistry.registerComponent('fb01', () => fb01)
