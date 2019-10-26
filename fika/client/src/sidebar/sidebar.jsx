import React, { Component } from "react";
import Weather from "../weatherWidget/weatherWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faCalendar,
  faHome,
  faStickyNote,
  faProjectDiagram,
  faTasks,
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import "./sidebarStyle.css";
class Sidebar extends Component {
  state = {
    options: [
      {
        id: 1,
        destination: null,
        icon: faHamburger,
        func: this.props.handleCollapse
      },
      { id: 2, destination: "home", icon: faHome, func: this.props.handleHome },
      {
        id: 3,
        destination: "calendar",
        icon: faCalendar,
        func: this.props.handleCalendar
      },
      {
        id: 4,
        destination: "notes",
        icon: faStickyNote,
        func: this.props.handleNotes
      },
      {
        id: 5,
        destination: "projects",
        icon: faProjectDiagram,
        func: this.props.handleProjects,
        expand: [
          { project: "Project 1" },
          { project: "Project 2" },
          { project: "Project 3" },
          { project: "Project 4" },
          { project: "Project 5" }
        ]
      },
      {
        id: 6,
        destination: "tasks",
        icon: faTasks,
        func: this.props.handleTasks
      }
    ],
    expanded: false
  };

  expand = e => {
    e.stopPropagation();

    if (this.state.expanded == false) {
      this.setState({ expanded: true });
      const projDiv = document.getElementsByClassName("selectionOpen")[3];
      document.getElementsByClassName("selectionOpen")[3].style.height =
        "100px";
      for (let i in this.state.options[4].expand) {
        console.log(this.state.options[4].expand[i].project);
        let p = document.createElement("P");
        let t = document.createTextNode(
          this.state.options[4].expand[i].project
        );
        p.appendChild(t);
        p.classList.add("expOPt");
        p.setAttribute("data-value", i);
        document.getElementsByClassName("selectionOpen")[3].appendChild(p);
      }
    } else {
      this.setState({ expanded: false });
      // let pp = document.getElementsByClassName("expOpt");
      let pp = document.getElementsByClassName("selectionOpen"[3]);
      console.log(pp);
      // pp.removeChild();
      document.getElementsByClassName("selectionOpen")[3].style.height = "50px";
    }
  };

  handleHover = e => {
    console.log("hello");
  };

  render() {
    const pStyle = {
      paddingLeft: "20px"
    };
    const spanStyle = {
      paddingLeft: "10%"
    };
    const navStyleOpen = {
      width: "200px",
      textAlign: "initial"
    };
    const navStyleClose = {
      width: "50px"
    };
    const expandStyle = {
      height: "100px"
    };
    const collapseStyle = {
      height: "50px"
    };

    return (
      <div>
        <div
          className="sideNav"
          style={this.props.isOpen ? navStyleOpen : navStyleClose}
        >
          {this.props.isOpen == false &&
            this.state.options.map(x => (
              <p
                key={x.id}
                data-value={x.destination}
                className={x.destination == null ? "burger" : "selectionClose"}
                onClick={x.func}
              >
                <FontAwesomeIcon icon={x.icon} size="lg" />
                <span className="tooltip">{x.destination}</span>
              </p>
            ))}
          {this.props.isOpen == true && (
            <Weather
              time={this.props.time}
              amPm={this.props.amPm}
              h={this.props.h}
              temp={this.props.temp}
              description={this.props.description}
              isOpen={this.props.isOpen}
            />
          )}
          {this.props.isOpen == true &&
            this.state.options.map(x => (
              <div
                key={x.id}
                data-value={x.destination}
                className={x.destination == null ? "burger" : "selectionOpen"}
                style={pStyle}
                onClick={x.func}
              >
                <i>
                  <FontAwesomeIcon icon={x.icon} size="lg" />
                </i>
                <span>{x.destination}</span>
                {x.expand ? (
                  <div className="expandOption" onClick={this.expand}>
                    {this.state.expanded ? (
                      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronRight} size="2x" />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
