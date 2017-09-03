import React from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import firebase from '../config/Firebase'
import TitledInput from './TitledInput'
import { Actions } from 'react-native-router-flux'

export default class LogInForm extends React.Component {
  constructor () {
    super()
    // this.state = {
    //   email: '',
    //   password: ''
    // }
  }

  onLoginPress = (email, password, callback) => {
    // const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        callback(null, user)
        console.log('User successfully logged in', user)
        // this.createBookShelf(user.uid)
        Actions.bookStore()
      })
      .catch(err => {
        callback(err)
        // console.error('User signin error', err)
      })
  }

  // createBookShelf (uid) {
  //   firebase.database().ref(`bookshelfs/${uid}`).set([{ '1455572101': 10 }])
  // }

  render () {
    return (
      <View>
        <TitledInput onLoginPress={this.onLoginPress} />
      </View>
    )
  }
}
