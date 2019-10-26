import React, { Component } from "react";
import "./weather.css";
import { _loadCurrentWeather } from "./weatherService";
import Temperature from "./temperature";
import Indicator from "./weatherIndicator";
import { parse } from "querystring";

class Weather extends Component {
  state = { weather: "" };

  // getWeather = () => {
  //   return _loadCurrentWeather().then(resultingJSON =>
  //     this.setState({ weather: resultingJSON })
  //   );
  // };

  // componentDidMount() {
  //   this.getWeather();
  //   this.loadInterval = setInterval(this.getWeather, 3600000);
  // }

  render() {
    const divStyle = {
      clear: "both",
      paddingLeft: "20px"
    };
    return (
      <div>
        {this.props.isExpanded === true && (
          <div className="weatherBox">
            <Indicator
              h={parseInt(this.props.h)}
              amPm={this.props.amPm}
              description={this.props.description}
              icon={this.props.icon}
            />
            <Temperature temp={this.props.temp} />
            <p style={divStyle}>{this.props.time}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
