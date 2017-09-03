import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, Keyboard } from 'react-native'
import t from 'tcomb-form-native'

var Form = t.form.Form
var options = {
  // auto: 'placeholders',
  fields: {
    password: {
      autoCapitalize: 'none',
      autoCorrect: false,
      secureTextEntry: true,
      underlineColorAndroid: 'transparent',
      blurOnSubmit: true
    }
  }
}

// here we are: define your domain model
var Person = t.struct({
  email: t.String, // a required string
  password: t.String // an optional string
})

export default class TitledInput extends React.Component {
  state = {
    loading: false
  }
  onPress = () => {
    this.setState({ loading: true })
    var { email, password } = this.refs.form.getValue() || {}
    if (!email || !password) {
      this.setState({ loading: false })
      Alert.alert('Error', 'email or password is not valid', [{ text: 'Try again', onPress: () => console.log('Try again pressed') }], { cancelable: false })
    } else {
      this.props.onLoginPress(email, password, (err, user) => {
        this.setState({ loading: false })
        if (err != null) {
          Alert.alert('Login failed', err.message, [{ text: 'Try again', onPress: () => console.log('Try again pressed') }], { cancelable: false })
        }
        Keyboard.dismiss()
      })
    }
  }

  render () {
    const { inputStyle, labelStyle, containerStyle } = styles
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref='form' type={Person} options={options} />
        <TouchableHighlight
          style={this.state.loading ? styles.disabledButton : styles.button}
          onPress={this.onPress}
          underlayColor='#99d9f4'
          disabled={this.state.loading}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
// <View style={containerStyle}>
//   <Text style={labelStyle}>{label.toUpperCase()}</Text>
//   <TextInput autoCorrect={false} placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} onChangeText={onChangeText} style={inputStyle} />
// </View>

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabledButton: {
    height: 36,
    backgroundColor: '#bdc3c7',
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

// const styles = {
//   inputStyle: {
//     paddingRight: 5,
//     paddingLeft: 5,
//     paddingBottom: 2,
//     color: '#262626',
//     fontSize: 18,
//     fontWeight: '200',
//     flex: 1,
//     // height: 50,
//     width: '100%'
//   },
//   labelStyle: {
//     fontSize: 16,
//     color: '#7F7D7D',
//     fontWeight: '200',
//     flex: 1
//   },
//   containerStyle: {
//     height: 60,
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     width: '100%',
//     borderColor: '#D4D4D4',
//     borderBottomWidth: 1
//   }
// }
