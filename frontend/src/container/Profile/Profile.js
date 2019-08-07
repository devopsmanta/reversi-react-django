import React from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import { modifyProfile } from '../../actions/profile';
import api from '../../api/';
import SpinnerOverlay from '../../component/SpinnerOverlay';

import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }
  componentWillMount() {
    if (!this.props.currentUser) return;
    this.setState({
      name: this.props.currentUser.name,
      email: this.props.currentUser.email,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser || !nextProps.currentUser) return;
    this.setState({
      name: nextProps.currentUser.name,
      email: nextProps.currentUser.email,
    });
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
    };

    this.props.modifyProfile(api.profile.modifyProfile(user));
  };
  render() {
    return (
      <div style={{ flex: 1, backgroundColor: 'green' }}>
        <MDBContainer style={{ marginTop: '10%' }}>
          <SpinnerOverlay visible={this.props.isPending} />
          <MDBRow className="mt-4" style={{ justifyContent: 'center' }}>
            <MDBCol md="6">
              <form onSubmit={this.handleSubmit} className="profile-area">
                <p className="h5 text-center mb-4">Your Profile</p>
                <div>
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="name"
                    textColor="red"
                    value={this.state.name}
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
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit">Save Changes</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.profile.currentUser,
  isPending: state.profile.isPending,
});

const mapDispatchToProps = dispatch => ({
  modifyProfile: promise => dispatch(modifyProfile(promise)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
