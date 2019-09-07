import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import Weather from "./components/weatherWidget";
import _loadWeather from "./services/weatherService.js";

class App extends Component {
  state = {
    counters: [
      {
        id: 1,
        value: 4
      },
      {
        id: 2,
        value: 0
      },
      {
        id: 3,
        value: 0
      },
      {
        id: 4,
        value: 0
      }
    ],
    weather: ""
  };

  // componentDidMount() {
  //   return _loadWeather().then(resultingJSON =>
  //     this.setState({ weather: resultingJSON })
  //   );
  // }

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleDecrease = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].value !== 0) {
      counters[index].value--;
      this.setState({ counters });
    } else this.handleDelete(counters[index].id);
  };

  render() {
    return (
      <div>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />

        <main className="container">
          <Counters
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrease={this.handleDecrease}
            onReset={this.handleReset}
          />
          <Weather />
        </main>
      </div>
    );
  }
}

export default App;
