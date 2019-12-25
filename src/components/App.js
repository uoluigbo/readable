import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import Nav from './Nav'
import PageNotFound from './PageNotFound'
import Dashboard from './Dashboard'
import Categroy from './Category'
import AddPost from './AddPost'

import '../App.css'
import PostsDetails from './PostsDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
              <Nav />
            <div className="App">
              <Switch>
                  <Route path='/add-post' component={AddPost} />
                  <Route path='/page-not-found' component={PageNotFound} />
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/:categoryId' exact component={Categroy} />
                  <Route path='/category/:postId' component={PostsDetails} />
                  <Route path='*' component={PageNotFound}/>
                </Switch> 
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App);
