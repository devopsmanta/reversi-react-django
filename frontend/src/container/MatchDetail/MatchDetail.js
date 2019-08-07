import React from 'react';

import { MDBBtn, MDBIcon } from 'mdbreact';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './MatchDetail.css';
import '../../index.css';

class MatchDetail extends React.Component {
  onGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const index = parseInt(this.props.match.params.id);
    if (isNaN(index) || index > this.props.results.length - 1) {
      return (
        <div style={{ textAlign: 'center', flex: 1, backgroundColor: 'green' }}>
          <h1> This match result doesn't exist.</h1>
        </div>
      );
    }
    return (
      <div className="main-area">
        <div className="detail-area">
          <div>Match Details</div>
          <div className="match-detail">
            <div
              className="circle-shape-black-small"
              style={{ margin: '10px 20px' }}
            />
            {this.props.results[index].nBlack}&nbsp;&nbsp;:&nbsp;&nbsp;
            {this.props.results[index].nWhite}
            <div
              className="circle-shape-white-small"
              style={{ margin: '10px 20px' }}
            />
          </div>
          <div style={{ margin: '15px' }}>
            Final Time : {this.props.results[index].finalTime}
          </div>
          <MDBBtn
            color="primary"
            size="g"
            onClick={() => this.onGoBack()}
            style={{ margin: '15px' }}
          >
            <MDBIcon icon="long-arrow-alt-left" size="lg" className="mr-1" />{' '}
            Back
          </MDBBtn>
        </div>
      </div>
    );
  }
}

const mapMsgToProps = state => {
  return {
    results: state.result.results,
  };
};

export default compose(
  connect(mapMsgToProps),
  withRouter
)(MatchDetail);
