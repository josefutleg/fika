import React, { Component } from "react";
import "./App.css";
import { _loadCurrentWeather } from "./weatherWidget/weatherService";
import Nav from "./sidebar/sideNav";
import CalendarComponent from "./pages/CalendarComponent";
import UpcomingEvents from "./pages/UpcomingEvents";
import Calendar from "./tools/calendar";
import Login from "./pages/LoginComponent";
import NotesPage from "./pages/NotesPage"
import { _loadNotes, _deleteNote } from "./services/CRUDservices"

class App extends Component {
  state = {
    loggedIn: false,
    page: "dashboard",
    weather: "",
    isExpanded: false,
    viewProject: null,
    userInfo: {
      username: "jian",
      userId: "09211987"
    }
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

  handleLogOut = e => {
    localStorage.clear();
    window.location.href = "/";
    this.setState({ loggedIn: false });
  };
  handleLogIn = userObj => {
    this.setState({ userInfo: userObj });
    this.setState({ loggedIn: true });
  };

  loadHomeFeatures = objFunc => {
    if (objFunc == "logout") {
      this.handleLogOut();
      return;
    } else this.setState({ page: objFunc });
  };
  loadCalendar = event => {
    this.setState({ page: "calendar" });
  };
  loadNotes = event => {
    this.setState({ isExpanded: false });
    _loadNotes(this.state.userInfo.userId).then(rj => {

      this.setState({ notes: rj })
      console.log(rj)
      this.setState({ page: "notes" });
    });
  };

  newNote = (noteObj) => {
    // let newObj = [...this.state.notes];
    // newObj.push(noteObj);
    // this.setState({ notes: newObj });
    _loadNotes(this.state.userInfo.userId).then(rj => {

      this.setState({ notes: rj })
      console.log(rj)
      this.setState({ page: "notes" });
    });
  }

  handleDeleteNote = event => {
    let id = event.target.getAttribute("data-id");
    _deleteNote(id).then(deletedNoteId => {
      let notes = this.state.notes.filter(note => note._id !== deletedNoteId);
      this.setState({ notes });
    });
  };

  loadProjects = event => {
    this.setState({ isExpanded: false });
    this.setState({ page: "projects" });
  };
  viewProject = event => {
    // event.stopPropagation();
    console.log(event.target.getAttribute("dataname"));
    console.log(event.target.getAttribute("dataid"));
    let currentProjectName = event.target.getAttribute("dataname");
    let currentProjectId = event.target.getAttribute("dataid");
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
      <React.Fragment>
        <div>
          {this.state.loggedIn === true && (
            <Nav
              userInfo={this.state.userInfo}
              handleProjects={this.loadProjects}
              viewProject={this.viewProject}
              expandNav={this.collapse}
              isExpanded={this.state.isExpanded}
              loadNotes={this.loadNotes}
              newNote={this.newNote}
              loadTasks={this.loadTasks}
              loadCalendar={this.loadCalendar}
              loadHomeFeatures={this.loadHomeFeatures}
              amPm={this.state.amPm}
              h={parseInt(this.state.h)}
              description={this.state.weather.description}
              temp={this.state.weather.temp}
              time={this.state.time}
            />
          )}
          {this.state.loggedIn === true && (
            <main
              className="mainCont"
              style={this.state.isExpanded ? openStyle : closeStyle}
            >
              {this.state.page === "dashboard" && <h1>Dashboard!</h1>}
              {this.state.page === "settings" && <h1>Settings!</h1>}
              {this.state.page === "calendar" && (
                <React.Fragment>
                  <div className="calendar-page">
                    <div className="calendar-events">
                      <UpcomingEvents />
                    </div>
                    <div className="calendar">
                      <CalendarComponent />
                    </div>
                  </div>
                </React.Fragment>
              )}
              {this.state.page === "notes" && <NotesPage notes={this.state.notes} handleDelete={this.handleDeleteNote} />}
              {this.state.page === "projects" && <h1>Projects!</h1>}
              {this.state.page === "view project" && (
                <h1>{this.state.viewProject}</h1>
              )}
              {this.state.page === "tasks" && <h1>Tasks!</h1>}
            </main>
          )}
          {this.state.loggedIn === false && (
            <Login handleLogin={this.handleLogIn} />
            // <div className="mainCont">
            //   <div className="calendar">
            //     <CalendarComponent />
            //   </div>
            // </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
//test
export default App;
