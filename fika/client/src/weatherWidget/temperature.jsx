import React, { Component } from "react";
import "./weather.css";

class Temperature extends Component {
  state = {};

  render() {
    const divStyle = {
      fontSize: "20px",
      float: "left"
    };
    return (
      <div style={divStyle}>
        <span>{Math.round(this.props.temp)}°F</span>
      </div>
    );
  }
}

export default Temperature;
