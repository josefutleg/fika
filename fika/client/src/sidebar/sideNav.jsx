import React, { Component } from "react";
import Projects from "../tools/projects";
import Notes from "../tools/notes";
import Tasks from "../tools/tasks";
import Home from "../tools/home";

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
            loadHome={this.props.loadHome}
            amPm={this.props.amPm}
            h={this.props.h}
            description={this.props.description}
            temp={this.props.temp}
            time={this.props.time}
          />
          <Projects
            handleProjects={this.props.handleProjects}
            viewProject={this.props.viewProject}
          />
          <Notes loadNotes={this.props.loadNotes} />
          <Tasks loadTasks={this.props.loadTasks} />
          <div className="filler2"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;
