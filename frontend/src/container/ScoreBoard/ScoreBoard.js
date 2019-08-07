import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './ScoreBoard.css';
import '../../index.css';

class ScoreBoard extends React.Component {
  handleClick = index => {
    this.props.history.push(`/score/${index}`);
  };

  showResult = result => {
    if (result.nBlack === result.nWhite) {
      return (
        <>
          <div className="circle-shape-black-small" />
          <div className="circle-shape-white-small" />
        </>
      );
    }
    return (
      <div
        className={
          result.nBlack > result.nWhite
            ? 'circle-shape-black-small'
            : 'circle-shape-white-small'
        }
      />
    );
  };
  render() {
    let table = [];
    table = this.props.results.map((result, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="element" onClick={() => this.handleClick(index)}>
            {this.showResult(result)}
            <p style={{margin:10}}>
              {result.nBlack > result.nWhite
                ? 'Black'
                : result.nBlack < result.nWhite
                ? 'White'
                : 'Draw'}
            </p>
          </td>
        </tr>
      );
    });
    return (
      <div className="table-area">
        <table className="result-table">
          <tbody>
            <tr key="tr0">
              <th>No</th>
              <th className="user">Winner</th>
            </tr>
            {table}
          </tbody>
        </table>
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
)(ScoreBoard);
