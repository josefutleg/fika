import React, { Component } from "react";
import "../sidebar/sidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCloudMoon,
  faMoon,
  faSun,
  faCloudSun,
  faCloudSunRain,
  faCloudMoonRain
} from "@fortawesome/free-solid-svg-icons";
import Weather from "../weatherWidget/weatherWidget";
import { userInfo } from "os";

class Home extends Component {
  state = {
    isExpanded: false,
    isActive: false,
    icon: faSun,
    options: [
      {
        option: "Dashboard",
        id: "001",
        func: "dashboard"
      },
      {
        option: "Settings",
        id: "002",
        func: "settings"
      },
      {
        option: "Logout",
        id: "003",
        func: "logout"
      }
    ],
    userInfo: {
      username: "default",
      id: "10293845"
    }
  };

  componentDidMount() {
    // console.log("home mounted");
    // setTimeout(this.changeIcon, 1000);
    // this.loadInterval = setInterval(this.changeIcon, 1800000);
    this.setState({ userInfo: this.props.userInfo });
    document.addEventListener("mousedown", this.expand, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.expand, false);
  }

  handleClick = e => {
    e.persist();
    // console.log(e.target.attributes.datafunc.value);
    let loadFunc = e.target.attributes.datafunc.value;
    console.log(loadFunc);
    this.props.loadHomeFeatures(loadFunc);
    this.setState({ isExpanded: false });
    this.setState({ isActive: false });
    // console.log("hello");
  };
  // create arrays of categories that will cycle through statement to display either clouds or sun,
  //Fog, Mist, Haze, Rain, Smoke, Clouds == faCloudSun or faCloudMoon
  //Clear == faCloudSun or faCloudMoon
  //Rain
  changeIcon = () => {
    if (this.props.amPm === "am") {
      if (this.props.description === "Clouds") {
        this.setState({ icon: faCloudSun });
        console.log("am-clouds");
      }
      if (this.props.description === "Clear") {
        this.setState({ icon: faSun });
        console.log("am-clear");
      }
      if (this.props.description === "Rain") {
        this.setState({ icon: faCloudSunRain });
      } else this.setState({ icon: faSun });
    }
    if (this.props.amPm === "pm") {
      if (this.props.description === "Clouds") {
        this.setState({ icon: faCloudSun });
        console.log("checked2");
      }
      if (this.props.description === "Clear") {
        this.setState({ icon: faSun });
        console.log("checked");
      }
      if (this.props.description === "Rain") {
        this.setState({ icon: faCloudSunRain });
      }
    } else this.setState({ icon: faSun });

    if (this.props.amPm === "pm" && this.props.h > 6) {
      if (this.props.description === "Clear") this.setState({ icon: faMoon });
      if (this.props.description === "Clouds")
        this.setState({ icon: faCloudMoon });
      if (this.props.description === "Rain")
        this.setState({ icon: faCloudMoonRain });
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
        setTimeout(this.changeIcon, 10);
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
      backgroundColor: "royalblue"
    };
    const inactiveDivStyle = {
      backgroundColor: "#222222"
    };
    const userStyle = {
      float: "left",
      width: "100%",
      margin: "0",
      padding: "10px",
      color: "white"
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
            <p style={userStyle}>{this.state.userInfo.username}</p>
            {this.state.options.map(x => (
              <p
                className="expandOption"
                key={x.id}
                datavalue={x.id}
                dataname={x.option}
                datafunc={x.func}
                onClick={this.handleClick}
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
