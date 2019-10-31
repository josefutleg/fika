import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import CreateNote from "./createNote";

class Notes extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    isQuickSelect: false,
    search: null,
    options: [
      {
        option: "View All",
        id: "000",
        func: this.props.loadNotes,
        isSolid: true
      },
      { option: "Write Note", id: "001", func: this.props.viewProject }
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

  handleViewNotes = e => {
    this.props.loadNotes(e);
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
  };

  handleWriteNote = e => {
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
    const inputStyle = {
      position: "relative",
      top: "160px"
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
            icon={faStickyNote}
            size="lg"
          />
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
                  x.isSolid ? this.handleViewNotes : this.handleWriteNote
                }
              >
                {x.option}
              </p>
            ))}
          </div>
        </div>

        {this.state.isQuickSelect === true && (
          <CreateNote
            handleClose={this.handleClose}
            handleMinimize={this.handleMinimize}
            isMinimized={this.state.isMinimized}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Notes;
