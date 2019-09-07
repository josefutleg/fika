import React, { Component } from "react";
import _loadWeather from "../services/weatherService";

class Weather extends Component {
  state = { weather: " " };

  componentDidMount() {
    return _loadWeather().then(resultingJSON =>
      this.setState({ weather: resultingJSON })
    );
  }

  testMap = () => {
    let arr = this.state.weather.map(x => {
      console.log(x);
    });
  };

  showWeather = () => {};

  render() {
    return (
      <div>
        <button onClick={this.testMap}>test</button>
        <p>{this.state.weather[0].temp}</p>
        {/* {this.state.weather.map(x => (
          <p key={x.id}>
            {x.temp} ||
            {x.timestamp} ||
            {x.description}
          </p>
        ))} */}
      </div>
    );
  }
}

export default Weather;
