import React, { Component } from "react";
import "./Square.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.isClicked = false;
  }

  handleClick() {
    this.props.onClick(this.props.value);
    this.isClicked = true;
  }

  render() {
    return (
      <button
        className={this.isClicked ? "square-clicked" : "square-normal"}
        onClick={() => this.handleClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
