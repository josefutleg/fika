import React, { Component } from "react";
import "./weather.css";

class TimeClock extends Component {
  state = {};

  //   componentDidMount() {
  //     this.loadInterval = setInterval(this.getTime, 1000);
  //   }

  //   getTime = () => {
  //     const takeTwelve = n => (n > 12 ? n - 12 : n),
  //       addZero = n => (n < 10 ? "0" + n : n);

  //     setInterval(() => {
  //       let d, h, m, s, t, amPm;

  //       d = new Date();
  //       h = addZero(takeTwelve(d.getHours()));
  //       m = addZero(d.getMinutes());
  //       s = addZero(d.getSeconds());
  //       t = `${h}:${m}:${s}`;

  //       amPm = d.getHours() >= 12 ? "pm" : "am";

  //       this.setState({
  //         time: t,
  //         amPm: amPm
  //       });
  //     }, 1000);
  //   };

  render() {
    return (
      <div>
        <span>{this.props.time}</span>
      </div>
    );
  }
}

export default TimeClock;
