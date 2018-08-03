import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../components/login';
import Signup from '../components/signup';
import NotFound from '../components/not-found';
import Dashboard from '../components/dashboard';
import Settings from '../components/settings';

const unauthentificatedPages = ['/', '/signup'];
const authentificatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthentificated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthentificatedPage = unauthentificatedPages.includes(pathName);
  const isAuthentificatedPage = authentificatedPages.includes(pathName);

  if (isUnauthentificatedPage && isAuthentificated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthentificatedPage && !isAuthentificated) {
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="/settings" component={Settings} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
)
