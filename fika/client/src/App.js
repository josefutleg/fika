import React, { Component } from "react";
import "./App.css";
import { _loadCurrentWeather } from "./weatherWidget/weatherService";
import Nav from "./sidebar/sideNav";

class App extends Component {
  state = {
    page: "home",
    weather: "",
    isExpanded: false,
    viewProject: null
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
    if (this.state.isExpanded === false) this.setState({ isExpanded: true });
    else this.setState({ isExpanded: false });
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
    this.setState({ isExpanded: false });
    this.setState({ page: "notes" });
  };
  loadProjects = event => {
    this.setState({ isExpanded: false });
    this.setState({ page: "projects" });
  };
  viewProject = event => {
    // event.stopPropagation();
    console.log(event.target.getAttribute("dataname"));
    console.log(event.target.getAttribute("datavalue"));
    let currentProjectName = event.target.getAttribute("dataname");
    let currentProjectId = event.target.getAttribute("datavalue");
    this.setState({ viewProject: currentProjectName });
    this.setState({ isExpanded: false });
    this.setState({ page: "view project" });
  };
  loadTasks = event => {
    this.setState({ page: "tasks" });
  };
  render() {
    const openStyle = {
      marginLeft: "20%"
    };
    const closeStyle = {
      marginLeft: "7%"
    };
    const dimPage = {
      backgroundColor: "lightgray"
    };
    const regPage = {
      backgroundColor: "snow"
    };
    return (
      <div>
        <Nav
          handleProjects={this.loadProjects}
          viewProject={this.viewProject}
          expandNav={this.collapse}
          isExpanded={this.state.isExpanded}
          loadNotes={this.loadNotes}
          loadTasks={this.loadTasks}
          loadHome={this.loadHome}
          amPm={this.state.amPm}
          h={parseInt(this.state.h)}
          description={this.state.weather.description}
          temp={this.state.weather.temp}
          time={this.state.time}
        />
        <main
          className="mainCont"
          style={this.state.isExpanded ? openStyle : closeStyle}
        >
          {this.state.page === "home" && <h1>Home!</h1>}
          {this.state.page === "calendar" && <h1>Calendar!</h1>}
          {this.state.page === "notes" && <h1>Notes!</h1>}
          {this.state.page === "projects" && <h1>Projects!</h1>}
          {this.state.page === "view project" && (
            <h1>{this.state.viewProject}</h1>
          )}
          {this.state.page === "tasks" && <h1>Tasks!</h1>}
        </main>
      </div>
    );
  }
}
//test
export default App;
