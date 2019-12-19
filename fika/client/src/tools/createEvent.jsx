import React, { Component } from "react";
class NewEvent extends Component {
  state = {
    newTask: {
      text: "",
      date: "today"
      //get date once handleSubmit is clicked before posting to db
    },
    isMinimized: false,
    search: ""
  };
  handleChange = e => {
    let value = e.target.value;
    this.setState({ newTask: { text: value } });
  };
  handleSubmit = () => {
    const checked = this.state.newTask.text.trim();
    if (checked) {
      console.log(checked);
      //add checked to db with timestamp
      this.props.handleClose();
      this.setState({ newTask: { text: "" } });
    } else {
      alert("write something!");
      this.setState({ newTask: { text: "" } });
    }
  };
  handleCancel = () => {
    this.setState({ newTask: { text: "" } });
    this.props.handleClose();
  };
  //add to project functions
  handleSearchInput = e => {
    let value = e.target.value;
    this.setState({ search: value });
  };
  handleSearchOne = e => {
    //validate further. no spaces allowed
    const checked = this.state.search.trim();
    // read state.search ; if value.length > 4 then search db and add response to state. will need an array
    if (checked) {
      console.log(checked);
    } else {
      alert("write something!");
      this.setState({ search: "" });
    }
  };
  handleSearchAll = () => {
    console.log("call to db. search all project names");
  };

  // handleMinimize = e => {
  //   if (this.state.isMinimized === false) {
  //     this.setState({ isMinimized: true });
  //     console.log("minimized");
  //   } else this.setState({ isMinimized: false });
  // };

  //rework this func to minimize when clicked out.
  // minimize = e => {
  //   if (this.node.contains(e.target)) {
  //     console.log(e.target);
  //     return;
  //   } else this.handleMinimize();
  // };

  render() {
    const textAreaStyle = {
      backgroundColor: "ghostwhite",
      border: "none"
    };
    const textAreaStyle2 = {
      backgroundColor: "ghostwhite",
      border: "none",
      width: "70%",
      borderBottom: "solid 1px lightgray"
    };
    const pDivStyle = {
      borderTop: "solid 1px lightgray",
      marginTop: "12px"
    };
    return (
      <React.Fragment>
        {this.props.isMinimized === true && (
          <div className="minimizedNote">
            <button
              className="minimizedButton"
              onClick={() => {
                this.props.handleMinimize();
              }}
            >
              <FontAwesomeIcon icon={faTasks} size="sm" />
            </button>
          </div>
        )}
        {/* need function that will handle clickouts. 
            if form is partially filled quicknote will minimize so data will not be lost. 
            //if clickout detected and this.state.quickNote contains value */}
        {this.props.isMinimized === false && (
          <div
            className="newTask"
            ref={node => (this.node = node)}
            onClick={this.minimize}
          >
            <h4>
              New Event
              <span style={{ float: "right" }}>
                <button
                  className="noteButton"
                  onClick={this.props.handleMinimize}
                >
                  -
                </button>
              </span>
            </h4>
            <textarea
              rows="4"
              cols="30"
              placeholder="write here..."
              style={textAreaStyle}
              onChange={this.handleChange}
              value={this.state.newTask.text ? this.state.newTask.text : ""}
            ></textarea>
            <div style={pDivStyle}>
              <p style={{ marginTop: "10px" }}>Add to Project</p>
            </div>
            <input
              type="text"
              placeholder="search..."
              style={textAreaStyle2}
              onChange={this.handleSearchInput}
              value={this.state.search ? this.state.search : ""}
            />
            <button className="noteButton" onClick={this.handleSearchOne}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="noteButton" onClick={this.handleSearchAll}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div style={{ float: "right", marginTop: "10px" }}>
              <button className="noteButton" onClick={this.handleCancel}>
                Cancel
              </button>
              <button className="noteButton" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default NewEvent;
