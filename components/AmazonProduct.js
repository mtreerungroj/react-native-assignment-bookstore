import React, { Component } from 'react'
import { WebView } from 'react-native'

export default class AmazonProduct extends Component {
  render () {
    const uri = this.props.amazon_product_url
    return <WebView source={{ uri }} />
  }
}
