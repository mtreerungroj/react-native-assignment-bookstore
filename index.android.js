/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import ToDos from './components/ToDos'

export default class fb01 extends Component {
  render () {
    return <ToDos />
  }
}

AppRegistry.registerComponent('fb01', () => fb01)
