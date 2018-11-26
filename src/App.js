import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Header from './common/header/index'
import Home from './pages/home'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'


class App extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='/' exact component={Home}></Route>
          </div>
        </BrowserRouter>

      </Provider>
    )
   }
 }

export default App