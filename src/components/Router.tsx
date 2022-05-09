import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import BookMark from './routes/BookMark'
import Search from './routes/Search'

const Router = () => {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' exact component={Search} />
          <Route path='/bookmark' exact component={BookMark} />
          <Redirect from='*' to='/' />
        </Switch>
      </HashRouter>)

}

export default Router