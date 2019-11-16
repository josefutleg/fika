import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import CreateTask from "./createTask";

class Calendar extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    isQuickSelect: false,
    search: null,
    options: [
      {
        option: "View Calendar",
        id: "000",
        isSolid: true
      },
      { option: "New Event", id: "001" }
    ],
    isMinimized: false
  };

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

  handleViewTasks = e => {
    this.props.loadCalendar();
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
  };

  handleNewTask = e => {
    this.setState({ isQuickSelect: true });
    this.setState({ isExpanded: false });
    this.setState({ isMinimized: false });
  };

  handleClose = e => {
    this.setState({ isQuickSelect: false });
    console.log("changed");
  };

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
      // backgroundColor: "lightgreen",
      overflow: "hidden"
    };
    const closeDivStyle = {
      width: "0px",
      display: "none"
    };
    const activeDivStyle = {
      backgroundColor: "rebeccapurple"
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
          <FontAwesomeIcon className="optionIcon" icon={faCalendar} size="lg" />
          <div
            className="expandOptions"
            style={this.state.isExpanded ? openDivStyle : closeDivStyle}
          >
            {this.state.options.map(x => (
              <p
                key={x.id}
                className="expandOption"
                datavalue={x.id}
                dataname={x.option}
                onClick={x.isSolid ? this.handleViewTasks : this.handleNewTask}
              >
                {x.option}
              </p>
            ))}
          </div>
        </div>

        {/* {this.state.isQuickSelect === true && (
          <CreateTask
            handleClose={this.handleClose}
            handleMinimize={this.handleMinimize}
            isMinimized={this.state.isMinimized}
          />
        )} */}
      </React.Fragment>
    );
  }
}

export default Calendar;
