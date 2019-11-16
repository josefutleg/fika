import React, { Component } from "react";

class UpcomingEvents extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="events">
          <p style={{ fontSize: "50px", fontWeight: "bold" }}>Upcoming</p>
          <ul>
            <li>Event 1</li>
            <li>Event 2</li>
            <li>Event 3</li>
            <li>Event 4</li>
            <li>Event 5</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default UpcomingEvents;
