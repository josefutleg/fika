import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faChevronDown,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
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
    quickNote: {
      text: null,
      date: "today"
      //get date once handleSubmit is clicked before posting to db
    }
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
  };

  expand = e => {
    if (this.node.contains(e.target)) {
      if (this.state.isExpanded === false) {
        this.setState({ isExpanded: true });
        this.setState({ isActive: true });
        this.setState({ isQuickSelect: false });
      }
      return;
    } else this.handleClickOut();
  };

  handleChange = e => {
    let value = e.target.value;
    this.setState({ quickNote: { text: value } });
  };
  handleSubmit = () => {
    //validate textfield further - if state contains "/n" or "" > DO NOT SUBMIT
    if (this.state.quickNote.text) {
      console.log(this.state.quickNote);
    } else alert("write something!");
  };
  handleCancel = () => {
    this.setState({ quickNote: { text: null } });
    this.setState({ isQuickSelect: false });
  };
  //add to project functions
  handleSearchInput = e => {
    let value = e.target.value;
    this.setState({ search: value });
  };
  handleSearchOne = e => {
    //validate further. no spaces allowed
    // read state.search ; if value.length > 4 then search db and add response to state. will need an array
    if (this.state.search) {
      console.log(this.state.search);
    } else alert("write something!");
  };
  handleSearchAll = () => {
    console.log("call to db. search all project names");
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
        {/* need function that will handle clickouts. 
        if form is partially filled quicknote will minimize so data will not be lost. 
        //if clickout detected and this.state.quickNote contains value */}
        {this.state.isQuickSelect === true && (
          <CreateNote
            handleSearchAll={this.handleSearchAll}
            handleCancel={this.handleCancel}
            handleSearchInput={this.handleSearchInput}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Notes;
