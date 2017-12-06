import React from "react";

export class Loader extends React.Component {
  showLoader() {
    return (
      <div className="overlay">
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    );
  }
  render() {
    return this.props.show ? this.showLoader() : null;
  }
}
