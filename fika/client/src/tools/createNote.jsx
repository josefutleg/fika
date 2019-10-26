import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faChevronDown,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

class CreateNote extends Component {
  state = {};

  componentDidMount() {
    document.addEventListener("mousedown", this.expand, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.expand, false);
  }

  handleMinimize = e => {
    console.log("clicked out");
  };
  //rework this func to minimize when clicked out.
  minimize = e => {
    if (this.node.contains(e.target)) {
      console.log(e.target);
    } else this.handleMinimize();
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="quickSelect"
          ref={node => (this.node = node)}
          onClick={this.minimize}
        >
          <h4>Add Note</h4>
          <textarea
            rows="4"
            cols="30"
            placeholder="write note"
            onChange={this.props.handleChange}
          ></textarea>
          <div>
            <p>Add to Project</p>
          </div>
          <input
            type="text"
            placeholder="search..."
            onChange={this.props.handleSearchInput}
          />
          <button onClick={this.props.handleSearchOne}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button onClick={this.props.handleSearchAll}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div>
            <button onClick={this.props.handleCancel}>Cancel</button>
            <button onClick={this.props.handleSubmit}>Submit</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateNote;
