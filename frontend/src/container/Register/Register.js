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
import { register } from '../../actions/auth';
import api from '../../api';
import { validateRegisterInput } from '../../utils';
import PlayGame from '../PlayGame/PlayGame';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      error: {},
      canSubmit: false,
    };
  }

  handleInputChange = e => {
    const {errors, isValid, isFull} = validateRegisterInput({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      [e.target.name]: e.target.value,
    });
    this.setState({
      [e.target.name]: e.target.value,
      canSubmit: isValid,
      errors,
      isFull,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };

    this.props.register(api.auth.register(user, this.props.history));
  };

  render() {
    if (this.props.isAuthenticated) {
      return (<PlayGame/>);
    }
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
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <MDBInput
                  label="Your name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="name"
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  name="password"
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Confirm your password"
                  icon="exclamation-triangle"
                  group
                  type="password"
                  validate
                  name="password_confirm"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="text-center">
                {this.state.canSubmit ? (
                  <MDBBtn type="submit">Register</MDBBtn>
                ) : (
                  <MDBBtn type="submit" disabled>
                    Register
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
    isAuthenticated: state.auth.isAuthenticated,
    errorMsg: state.auth.registerErrorMsg,
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      register,
    }
  ),
  withRouter
)(Register);
