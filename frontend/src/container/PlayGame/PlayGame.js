import React from 'react';
import moment from 'moment';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { MDBBtn, MDBIcon } from 'mdbreact';

import './PlayGame.css';
import Board from '../../component/Board';
import BoardState from '../../component/BoardState';
import { addStone, skipTurn, reset } from '../../actions/game';
import { addResult } from '../../actions/result';
import { BOARD_SIZE } from '../../constants';
import { postResult } from '../../actions/result';
import api from '../../api';

class PlayGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameOver: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.calculateGameOver(nextProps);
  }

  calculateGameOver(props) {
    if (this.state.isGameOver) {
      return;
    }
    if (
      props.nBlack === 0 ||
      props.nWhite === 0 ||
      props.nBlack + props.nWhite === BOARD_SIZE * BOARD_SIZE * 4
    ) {
      this.setState({
        isGameOver: true,
      });

      const finalTime = moment(Date()).format('YYYY.M.D HH:mm:ss');
      this.props.addResult(props.nBlack, props.nWhite, finalTime);
      this.props.postResult(
        api.result.postResult({
          nBlack: props.nBlack,
          nWhite: props.nWhite,
          finalTime,
        })
      );
    }
  }
  clickCell = (x, y) => {
    if (this.state.isGameOver) {
      return;
    }
    this.props.addStone(x, y);
  };

  onClickSkip = () => {
    this.props.skipTurn();
  };

  onClickReset = () => {
    this.props.reset();
    this.setState({
      isGameOver: false,
    });
  };

  render() {
    let blackResult = '';
    let whiteResult = '';
    if (this.state.isGameOver) {
      if (this.props.nBlack > this.props.nWhite) {
        blackResult = 'Winner';
        whiteResult = 'Loser';
      } else if (this.props.nBlack < this.props.nWhite) {
        blackResult = 'Loser';
        whiteResult = 'Winner';
      } else {
        blackResult = whiteResult = 'Draw';
      }
    }
    return (
      <div className="game-area">
        <BoardState black={this.props.nBlack} white={this.props.nWhite} />
        <div className="game-board">
          <div className="side-pane" style={{ alignItems: 'flex-end' }}>
            <div className="turn-wrapper">
              <div
                className="circle-shape-black"
                style={{
                  visibility: this.state.isGameOver
                    ? 'visible'
                    : this.props.turn
                    ? 'visible'
                    : 'hidden',
                }}
              />
              <p>{blackResult}</p>
            </div>
            <MDBBtn
              color="primary"
              size="g"
              floating
              onClick={this.onClickSkip}
              style={{
                visibility: this.state.isGameOver ? 'hidden' : 'visible',
              }}
            >
              <MDBIcon icon="step-forward" size="lg" className="mr-1" /> Skip
            </MDBBtn>
          </div>
          <div className="board">
            <Board cells={this.props.cells} onClickCell={this.clickCell} />
          </div>
          <div className="side-pane" style={{ alignItems: 'flex-start' }}>
            <div className="turn-wrapper">
              <div
                className="circle-shape-white"
                style={{
                  visibility: this.state.isGameOver
                    ? 'visible'
                    : !this.props.turn
                    ? 'visible'
                    : 'hidden',
                }}
              />
              <p>{whiteResult}</p>
            </div>
            <MDBBtn
              color="primary"
              size="g"
              floating
              onClick={this.onClickReset}
            >
              <MDBIcon icon="redo" size="lg" className="mr-1" /> Reset
            </MDBBtn>
          </div>
        </div>
        <div style={{ minHeight: 100 }} />
      </div>
    );
  }
}

const mapMsgToProps = state => ({
  cells: state.game.cells,
  nBlack: state.game.nBlack,
  nWhite: state.game.nWhite,
  turn: state.game.turn,
});

const mapDispatchToProps = dispatch => ({
  addStone: (x, y, color) => dispatch(addStone(x, y, color)),
  skipTurn: () => dispatch(skipTurn()),
  reset: () => dispatch(reset()),
  addResult: (nBlack, nWhite, finalTime) =>
    dispatch(addResult(nBlack, nWhite, finalTime)),
  postResult: promise => dispatch(postResult(promise)),
});

export default compose(
  connect(
    mapMsgToProps,
    mapDispatchToProps
  ),
  withRouter
)(PlayGame);
