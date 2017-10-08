import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className='container'>
              <Route exact path='/' component={Landing} />
              <Route exact path='/surveys' component={Dashboard} />
              <Route exact path='/surveys/new' component={SurveyNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//
//   }
// }

export default connect(null, actions)(App)
