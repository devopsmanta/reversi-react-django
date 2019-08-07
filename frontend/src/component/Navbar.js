import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { logout } from '../actions/auth';
import { clearProfile } from '../actions/profile';
import { clearResult } from '../actions/result';
import { reset } from '../actions/game';

import './component.css';

class Navbar extends React.Component {
  handleLogoutClick = e => {
    e.preventDefault();
    this.logout();
    this.props.history.push('/');
  };
  logout() {
    this.props.logout();
    this.props.reset();
    this.props.clearProfile();
    this.props.clearResult();
  }
  render() {
    const authLinks = (
      <div className="header">
        <div className="header-title">Reversi Application</div>
        <div className="header-links">
          <Link className="link " to="/">
            Play Game
          </Link>
          <Link className="link" to="/score">
            Score
          </Link>
          <Link className="link" to="/profile">
            Profile
          </Link>
          <Link className="link" onClick={this.handleLogoutClick}>
            Log Out
          </Link>
        </div>
      </div>
    );
    const guestLinks = (
      <div className="header">
        <div className="header-title">Reversi Application</div>
        <div className="header-links">
          <Link className="link" to="/">
            Sign In
          </Link>
          <Link className="link " to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    );
    return this.props.isAuthenticated ? authLinks : guestLinks;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  clearProfile: () => dispatch(clearProfile()),
  clearResult: () => dispatch(clearResult()),
  reset: () => dispatch(reset()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Navbar);
