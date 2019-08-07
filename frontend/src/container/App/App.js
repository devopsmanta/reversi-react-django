import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Navbar from '../../component/Navbar';
import Home from '../Home/Home';
import NoMatch from '../NoMatch';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import MatchDetail from '../MatchDetail/MatchDetail';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SpinnerOverlay from '../../component/SpinnerOverlay';

import { setToken, logout } from '../../actions/auth';
import { profile } from '../../actions/profile';
import { getResult } from '../../actions/result';
import api from '../../api';
import { setAuthToken } from '../../utils';
import { setBaseURL } from '../../utils';
import './App.css';

class App extends React.Component {

  componentWillMount() {
    setBaseURL('http://localhost:5000/api');
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      const decoded = jwt_decode(localStorage.jwtToken);
      if (decoded.exp < currentTime) {
        this.props.logout();
        this.props.history.push('/');
      } else {
        this.props.setToken(localStorage.jwtToken);
      }
    }
  }


  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.props.profile(api.profile.profile());
      this.props.getResult(api.result.getResult());
    }
  }

  render() {
    return (
      <>
        <SpinnerOverlay visible={this.props.pending} />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/score"
            exact
            component={this.props.isAuthenticated ? ScoreBoard : Home}
          />
          <Route
            path="/score/:id"
            exact
            component={this.props.isAuthenticated ? MatchDetail : Home}
          />
          <Route
            path="/profile"
            exact
            component={this.props.isAuthenticated ? Profile : Home}
          />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  profile: promise => dispatch(profile(promise)),
  getResult: promise => dispatch(getResult(promise)),
  setToken: token => dispatch(setToken(token)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
