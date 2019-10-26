import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

class Tasks extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    options: [
      {
        option: "View All",
        id: "000",
        isSolid: true
      },
      { option: "Create Task", id: "001" }
    ]
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
    this.props.loadTasks(e);
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
  };

  handleCreateTask = e => {
    alert("create task");
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
      width: "120px",
      float: "left",
      backgroundColor: "lightgreen",
      overflow: "hidden"
    };
    const closeDivStyle = {
      width: "0px",
      display: "none"
    };
    const activeDivStyle = {
      backgroundColor: "lightgreen"
    };
    const inactiveDivStyle = {
      backgroundColor: "dimgrey"
    };
    return (
      <React.Fragment>
        <div
          className="option"
          ref={node => (this.node = node)}
          onClick={this.expand}
          style={this.state.isActive ? activeDivStyle : inactiveDivStyle}
        >
          <FontAwesomeIcon className="optionIcon" icon={faTasks} size="lg" />
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
                onClick={
                  x.isSolid ? this.handleViewTasks : this.handleCreateTask
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

export default Tasks;
