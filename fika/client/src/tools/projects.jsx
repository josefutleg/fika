import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import CreateProject from "./createProject";

class Projects extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    isQuickSelect: false,
    options: [
      {
        name: "View Projects",
        id: "000",
        isSolid: true
      },
      {
        name: "New Project", id: "newProject"
      },
      {
        name: "Project 1", id: "5e1ea63791789f7bf9ade9fe"
      },
      {
        name: "Project 2", id: "5e4ea6579r789f7bf9ade4zv"
      }
    ],
    isMinimized: false,
  };

  //need a componentdidmount once mongo is connected. all options except view all will be database saved. use 'id' key to store mongo ._id to send request to db
  componentDidMount() {
    document.addEventListener("mousedown", this.expand, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.expand, false);
  }
  handleClickOut = e => {
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
  };

  handleViewProjects = e => {
    this.props.handleProjects(e);
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
  };

  handleViewProject = e => {
    this.props.viewProject(e);
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
  };

  handleNewProject = e => {
    this.setState({ isQuickSelect: true });
    this.setState({ isExpanded: false });
    this.setState({ isMinimized: false });
  };

  handleClose = e => {
    this.setState({ isQuickSelect: false });
    console.log("changed");
  };

  handleClick = e => {
    e.persist();
    let loadFunc = e.target.attributes.dataid.value
    console.log(loadFunc);
    if (loadFunc == "newProject") {
      this.handleNewProject();
    } else this.handleViewProject(e);
  }

  handleMinimize = e => {
    if (this.state.isMinimized === false) this.setState({ isMinimized: true });
    else this.setState({ isMinimized: false });
  };

  expand = e => {
    if (this.node.contains(e.target)) {
      if (this.state.isExpanded === false) {
        this.setState({ isExpanded: true });
        this.setState({ isActive: true });
      }
      return;
    } else this.handleClickOut();
  };

  render() {
    const openDivStyle = {
      width: "200px",
      float: "left",
      overflow: "hidden"
      // backgroundColor: "lightgreen"
    };
    const closeDivStyle = {
      width: "0px",
      display: "none"
    };
    const activeDivStyle = {
      backgroundColor: "orangered"
    };
    const inactiveDivStyle = {
      backgroundColor: "#222222"
    };
    return (
      <React.Fragment>
        <div
          className="option"
          ref={node => (this.node = node)}
          onClick={this.expand}
          style={this.state.isActive ? activeDivStyle : inactiveDivStyle}
        >
          <FontAwesomeIcon
            className="optionIcon"
            icon={faProjectDiagram}
            size="lg"
          />
          <div
            className="expandOptions"
            style={this.state.isExpanded ? openDivStyle : closeDivStyle}
          >
            {this.state.options.map(x => (
              <p
                className="expandOption"
                key={x.id}
                dataid={x.id}
                dataname={x.name}
                onClick={
                  x.isSolid ? this.handleViewProjects : this.handleClick
                }
              >
                {x.name}
              </p>
            ))}
          </div>
        </div>
        {this.state.isQuickSelect === true && (
          <CreateProject
            handleClose={this.handleClose}
            handleMinimize={this.handleMinimize}
            isMinimized={this.state.isMinimized}
            userInfo={this.props.userInfo}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Projects;
