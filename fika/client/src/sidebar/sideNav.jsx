import React, { Component } from "react";
import Projects from "../tools/projects";
import Notes from "../tools/notes";
import Tasks from "../tools/tasks";
import Home from "../tools/home";
import Calendar from "../tools/calendar";

class Nav extends Component {
  state = {
    isExpanded: false
  };

  render() {
    // const openNavStyle = {
    //   width: "200px",
    //   textAlign: "initial"
    // };
    // const closeNavStyle = {
    //   width: "50px"
    // };
    return (
      <React.Fragment>
        <div
          className="sideNav"
        //   style={this.props.isExpanded ? openNavStyle : closeNavStyle}
        >
          <div className="filler1"></div>
          <Home
            userInfo={this.props.userInfo}
            loadHomeFeatures={this.props.loadHomeFeatures}
            amPm={this.props.amPm}
            h={this.props.h}
            description={this.props.description}
            temp={this.props.temp}
            time={this.props.time}
          />
          <Calendar loadCalendar={this.props.loadCalendar} />
          <Projects
            handleProjects={this.props.handleProjects}
            viewProject={this.props.viewProject}
            userInfo={this.props.userInfo}
          />
          <Notes loadNotes={this.props.loadNotes}
            userInfo={this.props.userInfo}
            newNote={this.props.newNote} />
          <Tasks loadTasks={this.props.loadTasks} />
          <div className="filler2"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;
