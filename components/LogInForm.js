import React from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import firebase from '../config/Firebase'
import TitledInput from './TitledInput'
import { Actions } from 'react-native-router-flux'

export default class LogInForm extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  }

  onLoginPress () {
    this.setState({ error: '', loading: true })

    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User successfully logged in', user)
        Actions.bookStore()
      })
      .catch(err => {
        console.error('User signin error', err)
      })
  }

  render () {
    return (
      <View>
        <TitledInput label='Email Address' placeholder='you@domain.com' value={this.state.email} onChangeText={email => this.setState({ email })} />
        <TitledInput
          label='Password'
          autoCorrect={false}
          placeholder='*******'
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button title='Log in' onPress={this.onLoginPress.bind(this)} />
      </View>
    )
  }
}