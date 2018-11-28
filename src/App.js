import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      textBox: ''
    }
  }
  submitEvent = event => {
    event.preventDefault()
    axios
      .post(
        'https://one-list-api.herokuapp.com/items?access_token=tacowednesday',
        {
          item: {
            text: `${this.state.textBox}`
          }
        }
      )
      .then(response => {
        axios
          .get(
            'https://one-list-api.herokuapp.com/items?access_token=tacowednesday'
          )
          .then(response => {
            this.setState({
              todos: response.data
            })
          })
      })
  }
  changeText = event => {
    this.setState({
      textBox: event.target.value
    })
  }
  componentDidMount = () => {
    axios
      .get(
        'https://one-list-api.herokuapp.com/items?access_token=tacowednesday'
      )
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }
  deleteItem = event => {
    event.preventDefault()
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.itemid
        }?access_token=tacowednesday`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        axios
          .get(
            'https://one-list-api.herokuapp.com/items?access_token=tacowednesday'
          )
          .then(response => {
            this.setState({
              todos: response.data
            })
          })
      })
  }
  finish = event => {
    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.itemid
        }?access_token=tacowednesday`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        axios
          .get(
            'https://one-list-api.herokuapp.com/items?access_token=tacowednesday'
          )
          .then(response => {
            this.setState({
              todos: response.data
            })
          })
      })
  }
  updateItem = event => {
    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.itemid
        }?access_token=tacowednesday`,
        {
          item: {
            text: `${this.state.textBox}`,
            complete: false
          }
        }
      )
      .then(response => {
        axios
          .get(
            'https://one-list-api.herokuapp.com/items?access_token=tacowednesday'
          )
          .then(response => {
            this.setState({
              todos: response.data
            })
          })
      })
    console.log('update')
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li
                  key={index}
                  data-itemid={todo.id}
                  onClick={this.finish}
                  className={todoClass}
                  onContextMenu={this.deleteItem}
                  onDoubleClick={this.updateItem}
                >
                  {todo.text}
                </li>
              )
            })}
          </ul>
          <form onSubmit={this.submitEvent}>
            <input
              type="text"
              placeholder="Whats up?"
              onChange={this.changeText}
            />
          </form>
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; 2018 Suncoast Developers Guild</p>
        </footer>
      </div>
    )
  }
}

export default App
