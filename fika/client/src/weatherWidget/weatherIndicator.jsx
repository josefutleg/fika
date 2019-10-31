import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
class Indicator extends Component {
  state = {
    amPm: "am",
    description: "Clouds",
    icon: faCloudSun
  };

  //Fog, Mist, Haze, Rain, Smoke

  // changeIcon = () => {
  //   if (this.props.amPm == "am") {
  //     if (this.props.description == "Clouds") {
  //       this.setState({ icon: faCloudSun });
  //       console.log("checked2");
  //       if (this.props.description == "Clear") {
  //         this.setState({ icon: faSun });
  //         console.log("checked");
  //       }
  //     } else this.setState({ icon: faSun });
  //   }
  //   if (this.props.amPm == "pm") {
  //     if (this.props.description == "Clouds") {
  //       this.setState({ icon: faCloudSun });
  //       console.log("checked2");
  //       if (this.props.description == "Clear") {
  //         this.setState({ icon: faSun });
  //         console.log("checked");
  //       }
  //     } else this.setState({ icon: faSun });
  //   }
  //   if (this.props.amPm == "pm" && this.props.h > 6) {
  //     if (this.props.description == "Clear") this.setState({ icon: faMoon });
  //     if (this.props.description == "Clouds")
  //       this.setState({ icon: faCloudMoon });
  //     else this.setState({ icon: faMoon });
  //   }
  // };

  // componentDidMount() {
  //   setTimeout(this.changeIcon, 1000);
  //   this.loadInterval = setInterval(this.changeIcon, 1800000);
  // }

  render() {
    const divStyle = {
      float: "left",
      paddingLeft: "20px"
    };
    return (
      <div style={divStyle}>
        <FontAwesomeIcon icon={this.props.icon} size="lg" />
        {/* {this.state.amPm == "am" && <FontAwesomeIcon icon={faCloud} />}
        {this.state.amPm == "pm" && <FontAwesomeIcon icon={faCloudMoon} />} */}
      </div>
    );
  }
}

export default Indicator;
