import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  MDBContainer,
  MDBAlert,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdbreact';

import SpinnerOverlay from '../../component/SpinnerOverlay';
import { login } from '../../actions/auth';
import api from '../../api';
import { validateLoginInput } from '../../utils';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: {},
      canSubmit: false,
    };
  }

  handleInputChange = e => {
    const { isValid } = validateLoginInput({
      email: this.state.email,
      password: this.state.password,
      [e.target.name]: e.target.value,
    });

    this.setState({
      [e.target.name]: e.target.value,
      canSubmit: isValid,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(api.auth.login(user));
  };

  render() {
    return (
      <MDBContainer>
        <SpinnerOverlay visible={this.props.isPending} />
        <MDBRow className="mt-4" style={{ justifyContent: 'center' }}>
          {this.props.errorMsg && (
            <MDBContainer>
              <MDBAlert color="warning" dismiss>
                {this.props.errorMsg}
              </MDBAlert>
            </MDBContainer>
          )}
          <MDBCol md="6">
            <form onSubmit={this.handleSubmit}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  type="email"
                  name="email"
                  label="Type your email"
                  group
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  name="password"
                  type="password"
                  label="Type your password"
                  group
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="text-center">
                {this.state.canSubmit ? (
                  <MDBBtn type="submit">Login</MDBBtn>
                ) : (
                  <MDBBtn type="submit" disabled>
                    Login
                  </MDBBtn>
                )}
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPending: state.auth.isPending,
    errorMsg: state.auth.loginErrorMsg,
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      login,
    }
  ),
  withRouter
)(Login);
