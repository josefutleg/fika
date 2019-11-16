import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "./calendar.css";

class CalendarComponent extends Component {
  weekdayshort = moment.weekdaysShort();
  // returns an array of all weekdays starting at sunday with index 0
  state = {
    dateObject: moment(),
    allmonths: moment.months(),
    month: "",
    year: null,
    showMonths: false,
    showYears: false
  };

  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return firstDay;
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };

  currentDay = () => {
    return this.state.dateObject.format("D");
  };

  month = () => {
    let month = this.state.dateObject.format("MMMM");
    return month;
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonths: !this.state.showMonths
    });
  };

  MonthList = props => {
    let months = [];
    let rows = [];
    let cells = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className={
            data == this.state.month ? "month-span-current" : "month-span"
          }
          onClick={e => this.setMonth(data)}
        >
          <span>{data}</span>
        </td>
      );
    });
    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });
    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4" style={{ textAlign: "center" }}>
              Select a Month
            </th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  showMonths = () => {
    if (this.state.showMonths === false) {
      this.setState({ showMonths: true });
    } else this.setState({ showMonths: false });
  };

  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  YearTable = props => {
    let months = [];
    let nexttwelve = moment()
      .set("year", props)
      .add(12, "year")
      .format("Y");
    let twelveyears = this.getDates(props, nexttwelve);
    twelveyears.map(data => {
      months.push(
        <td
          key={data}
          className={
            data == this.state.year ? "year-span-current" : "year-span"
          }
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });
    return (
      <table className="calendar-year">
        <thead>
          <tr>
            <th colSpan="4">Select Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showYears: !this.state.showYears
    });
  };

  showYears = () => {
    if (this.state.showYears === false) {
      this.setState({ showYears: true });
    } else this.setState({ showYears: false });
  };
  // "D" = day
  // "M" = month in number, "MMM" = month in short (Nov), "MMMM" = month in long (November)
  // "Y" = year
  test = () => {
    console.log(this.state.dateObject.format("MMM"));
  };

  handleClick = e => {
    e.persist();
    let value = e.target.innerText;
    let dataValue;
    if (value == "") {
      console.log("empty");
      this.setState({
        showMonths: false,
        showYears: false
      });
    } else {
      this.setState({
        showMonths: false,
        showYears: false
      });
      let currentMonth = this.month();
      let currentYear = this.year();
      dataValue = e.target.attributes.dataday.value;

      console.log(`${currentMonth} ${dataValue} ${currentYear}`);
    }
  };

  handleDecrease = e => {
    this.setState({ dateObject: this.state.dateObject.subtract(1, "month") });
  };
  handleIncrease = e => {
    this.setState({ dateObject: this.state.dateObject.add(1, "month") });
  };
  componentDidMount() {
    let currentMonth = this.month();
    let currentYear = this.year();
    this.setState({ month: currentMonth, year: currentYear });
  }

  render() {
    let weekdayshortname = this.weekdayshort.map(day => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={`empty${i}`} className="calendar-day-empty">
          {""}
        </td>
      );
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      daysInMonth.push(
        <td key={d} className={`calendar-day-${currentDay}`} dataday={d}>
          {d}
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });
    let daysinmonth = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });
    return (
      <React.Fragment>
        {/* <div>
          <button onClick={this.getDates}>test</button>
        </div> */}
        <div className="tail-datetime-calendar">
          <div className="calendar-navi">
            {" "}
            <span
              style={{ float: "left", paddingTop: "22px" }}
              onClick={this.handleDecrease}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </span>
            <span onClick={this.showMonths} className="calendar-header">
              {this.month()}
            </span>{" "}
            <span onClick={this.showYears} className="calendar-header">
              {this.year()}
            </span>
            <span
              style={{ float: "right", paddingTop: "22px" }}
              onClick={this.handleIncrease}
            >
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </span>
          </div>
        </div>
        <div className="calendar-date">
          {this.state.showYears === true && (
            <this.YearTable props={this.year()} />
          )}
          {this.state.showMonths === true && (
            <this.MonthList data={moment.months()} />
          )}
        </div>

        <div className="calendar-date">
          <table
            className="calendar-day"
            onClick={() => {
              this.setState({
                showMonths: false,
                showYears: false
              });
            }}
          >
            <thead>
              <tr>{weekdayshortname}</tr>
            </thead>
            <tbody onClick={this.handleClick}>{daysinmonth}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarComponent;
