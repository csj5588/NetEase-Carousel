import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import IndexPage from './pages/IndexPage';
import Slide from './pages/slide';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <IndexRedirect to="/slide" />
        <Route path="/slide" component={Slide} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
