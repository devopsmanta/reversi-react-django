import React from 'react';
import { connect } from 'react-redux';

import Login from '../Login/Login';
import PlayGame from '../PlayGame/PlayGame';

class Home extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <PlayGame />;
    } else {
      return <Login />;
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
)(Home);
