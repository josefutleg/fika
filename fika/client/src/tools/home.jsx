import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCloudMoon,
  faMoon,
  faSun,
  faCloudSun
} from "@fortawesome/free-solid-svg-icons";
import Weather from "../weatherWidget/weatherWidget";

class Home extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    icon: faSun,
    options: [
      {
        option: "Go to Dashboard",
        id: "000",
        func: this.props.loadHome
      }
    ]
  };

  componentDidMount() {
    // console.log("home mounted");
    // setTimeout(this.changeIcon, 1000);
    // this.loadInterval = setInterval(this.changeIcon, 1800000);
    document.addEventListener("mousedown", this.expand, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.expand, false);
  }

  changeIcon = () => {
    if (this.props.amPm == "am") {
      if (this.props.description == "Clouds") {
        this.setState({ icon: faCloudSun });
        console.log("checked2");
        if (this.props.description == "Clear") {
          this.setState({ icon: faSun });
          console.log("checked");
        }
      } else this.setState({ icon: faSun });
    }
    if (this.props.amPm == "pm") {
      if (this.props.description == "Clouds") {
        this.setState({ icon: faCloudSun });
        console.log("checked2");
        if (this.props.description == "Clear") {
          this.setState({ icon: faSun });
          console.log("checked");
        }
      } else this.setState({ icon: faSun });
    }
    if (this.props.amPm == "pm" && this.props.h > 6) {
      if (this.props.description == "Clear") this.setState({ icon: faMoon });
      if (this.props.description == "Clouds")
        this.setState({ icon: faCloudMoon });
      else this.setState({ icon: faMoon });
    }
  };
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
        setTimeout(this.changeIcon, 1000);
      }
      return;
    } else this.handleClickOut();
  };
  render() {
    const openDivStyle = {
      width: "150px",
      float: "left",
      overflow: "hidden",
      backgroundColor: "lightgreen"
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
          <FontAwesomeIcon className="optionIcon" icon={faUser} size="lg" />
          <div
            className="expandOptions"
            style={this.state.isExpanded ? openDivStyle : closeDivStyle}
          >
            <Weather
              isExpanded={this.state.isExpanded}
              amPm={this.props.amPm}
              h={parseInt(this.props.h)}
              description={this.props.description}
              temp={this.props.temp}
              time={this.props.time}
              icon={this.state.icon}
            />
            {this.state.options.map(x => (
              <p
                className="expandOption"
                key={x.id}
                datavalue={x.id}
                dataname={x.option}
                onClick={x.func}
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

export default Home;
