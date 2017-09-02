import React from 'react'
import { Text, View, ListView, Button } from 'react-native'
import firebase from '../config/Firebase'

export default class ToDos extends React.Component {
  constructor () {
    super()
    this.ref = null
    this.listView = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      todos: this.listView.cloneWithRows({})
    }

    // Keep a local reference of the TODO items
    this.todos = {}
  }

  // Load the Todos on mount
  componentDidMount () {
    this.ref = firebase.database().ref('todos')
    this.ref.on('value', this.handleToDoUpdate)
  }

  // Unsubscribe from the todos on unmount
  // componentWillUnmount() {
  //   if (this.ref) {
  //     this.ref.off('value', this.handleToDoUpdate);
  //   }
  // }

  // Handle ToDo updates
  handleToDoUpdate = snapshot => {
    this.todos = snapshot.val() || {}

    this.setState({
      todos: this.listView.cloneWithRows(this.todos)
    })
  }

  // Add a new ToDo onto Firebase
  // If offline, this will still trigger an update to handleToDoUpdate
  // addToDo() {
  //   firebase.database()
  //     .ref('todos')
  //     .set({
  //       ...this.todos, {
  //          title: 'Yet another todo...',
  //          important: 1,
  //       },
  //     });
  // }

  // Render a ToDo row
  renderToDo (todo) {
    // Dont render the todo if its complete
    if (todo.complete) {
      return null
    }

    return (
      <View>
        <Text>{todo.title}</Text>
      </View>
    )
  }

  // Render the list of ToDos with a Button
  render () {
    return (
      <View>
        <ListView dataSource={this.state.todos} renderRow={(...args) => this.renderToDo(...args)} />
      </View>
    )
  }
}

// <Button title={'Add ToDo'} onPress={() => this.addToDo} /> */}
