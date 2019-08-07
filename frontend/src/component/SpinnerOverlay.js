import React from 'react';

class SpinnerOverlay extends React.Component {
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div className="overlay">
        <div className="spinner-border text-primary" style={{width: 124, height: 124}} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default SpinnerOverlay;
