import React, { Component } from "react";
import Weather from "../weatherWidget/weatherWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faCalendar,
  faHome,
  faStickyNote
} from "@fortawesome/free-solid-svg-icons";
import "./sidebarStyle.css";
class Sidebar extends Component {
  state = {
    // openClose: "close"
  };
  // collapse = () => {
  //   if (this.state.openClose == "close") this.setState({ openClose: "open" });
  //   else this.setState({ openClose: "close" });
  // };

  render() {
    const pStyle = {
      paddingLeft: "20px"
    };
    const spanStyle = {
      paddingLeft: "10px"
    };

    return (
      <div>
        {this.props.isOpen == false && (
          <div className="sideNavClose">
            <p className="burger" onClick={this.props.handleCollapse}>
              <FontAwesomeIcon icon={faHamburger} size="lg" />
            </p>
            <p className="selectionClose" onClick={this.props.handleHome}>
              <FontAwesomeIcon icon={faHome} size="lg" />
            </p>
            <p className="selectionClose" onClick={this.props.handleCalendar}>
              <FontAwesomeIcon icon={faCalendar} size="lg" />
            </p>
            <p className="selectionClose" onClick={this.props.handleNotes}>
              <FontAwesomeIcon icon={faStickyNote} size="lg" />
            </p>
          </div>
        )}
        {this.props.isOpen == true && (
          <div className="sideNavOpen">
            <p
              className="burger"
              style={pStyle}
              onClick={this.props.handleCollapse}
            >
              <FontAwesomeIcon icon={faHamburger} size="lg" />
            </p>
            <Weather
              time={this.props.time}
              amPm={this.props.amPm}
              h={this.props.h}
              temp={this.props.temp}
              description={this.props.description}
              isOpen={this.props.isOpen}
            />
            <p
              className="selectionOpen"
              onClick={this.props.handleHome}
              style={pStyle}
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
              <span style={spanStyle}>Home</span>
            </p>
            <p
              className="selectionOpen"
              onClick={this.props.handleCalendar}
              style={pStyle}
            >
              <FontAwesomeIcon icon={faCalendar} size="lg" />
              <span style={spanStyle}>Calendar</span>
            </p>
            <p
              className="selectionOpen"
              onClick={this.props.handleNotes}
              style={pStyle}
            >
              <FontAwesomeIcon icon={faStickyNote} size="lg" />
              <span style={spanStyle}>Notes</span>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
