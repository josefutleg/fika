import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";

class Projects extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    options: [
      {
        option: "View Projects",
        id: "000",
        func: this.props.handleProjects,
        isSolid: true
      },
      { option: "Project 1", id: "001", func: this.props.viewProject },
      { option: "Project 2", id: "002", func: this.props.viewProject },
      { option: "Project 3", id: "003", func: this.props.viewProject }
    ]
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
                datavalue={x.id}
                dataname={x.option}
                onClick={
                  x.isSolid ? this.handleViewProjects : this.handleViewProject
                }
              >
                {x.option}
              </p>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Projects;
