import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { _loadCurrentWeather } from "./weatherWidget/weatherService";
import Weather from "./weatherWidget/weatherWidget";
import Sidebar from "./sidebar/sidebar";

class App extends Component {
  state = {
    page: "home",
    weather: "",
    isOpen: false
  };

  getWeather = () => {
    return _loadCurrentWeather().then(resultingJSON =>
      this.setState({ weather: resultingJSON })
    );
  };

  componentDidMount() {
    this.loadInterval = setInterval(this.getTime, 1000);
    this.getWeather();
    this.loadInterval = setInterval(this.getWeather, 3600000);
  }

  collapse = () => {
    if (this.state.isOpen == false) this.setState({ isOpen: true });
    else this.setState({ isOpen: false });
  };

  getTime = () => {
    const takeTwelve = n => (n > 12 ? n - 12 : n),
      addZero = n => (n < 10 ? "0" + n : n);

    setInterval(() => {
      let d, h, m, s, t, amPm;

      d = new Date();
      h = addZero(takeTwelve(d.getHours()));
      m = addZero(d.getMinutes());
      s = addZero(d.getSeconds());
      t = `${h}:${m}:${s}`;

      amPm = d.getHours() >= 12 ? "pm" : "am";

      this.setState({
        h: h,
        time: t,
        amPm: amPm
      });
    }, 1000);
  };
  loadHome = event => {
    this.setState({ page: "home" });
  };
  loadCalendar = event => {
    this.setState({ page: "calendar" });
  };
  loadNotes = event => {
    this.setState({ page: "notes" });
  };
  render() {
    const openStyle = {
      marginLeft: "20%"
    };
    const closeStyle = {
      marginLeft: "7%"
    };
    return (
      <div>
        <Sidebar
          handleCollapse={this.collapse}
          handleHome={this.loadHome}
          handleCalendar={this.loadCalendar}
          handleNotes={this.loadNotes}
          time={this.state.time}
          amPm={this.state.amPm}
          h={this.state.h}
          temp={this.state.weather.temp}
          description={this.state.weather.description}
          isOpen={this.state.isOpen}
        />
        <main
          className="mainCont"
          style={this.state.isOpen ? openStyle : closeStyle}
        >
          {this.state.page == "home" && <h1>Home!</h1>}
          {this.state.page == "calendar" && <h1>Calendar!</h1>}
          {this.state.page == "notes" && <h1>Notes!</h1>}
        </main>
      </div>
    );
  }
}
//test
export default App;
