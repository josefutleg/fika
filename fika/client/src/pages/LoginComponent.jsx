import React, { Component } from "react";
import "../App.css";
import { _login, _signUp } from "../services/AuthService";
class Login extends Component {
  state = { login: true };

  changeForm = () => {
    this.setState({ login: !this.state.login });
  };

  login = event => {
    event.preventDefault();

    let inputs = event.target.children;
    let username = inputs[0].value;
    let password = inputs[2].value;
    return _login(username, password).then(res => {
      let userObj;
      if (res.token) {
        console.log(res);
        //   userObj.userId = res.userId
        // this.setState({ userId: res.userId });
        // this.setState({ username: res.username });
        // this.setState({ score: res.score });
        // this.setState({ currentGame: res.currentGame });
        // this.setState({ input: res.input });
        // this.setState({ vote: res.vote });
        // this.setState({ logged_in: true }, function() {
        //   localStorage.setItem("token", res.token);
        //   // alert(this.state.response);
        // });
      } else {
        alert("invalid username/password");
      }
    });
  };

  signUp = event => {
    event.preventDefault();

    let inputs = event.target.children;
    let username = inputs[0].value;
    let password = inputs[2].value;
    let passwordConf = inputs[4].value;

    if (password === passwordConf) {
      return _signUp(username, password).then(res => {
        console.log(res);
        alert(res.message);
      });
    } else {
      alert("your password and password confirmation have to match!");
    }
  };
  getToken = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <React.Fragment>
        {this.state.login === true && (
          <div className="login">
            <form onSubmit={this.login}>
              <input type="text" name="name" placeholder="username" />
              <br />
              <input type="password" name="password" placeholder="password" />
              <br />
              <button>
                <span>log in</span>
              </button>
              <button onClick={this.changeForm}>
                <span>new user?</span>
              </button>
            </form>
          </div>
        )}
        {this.state.login === false && (
          <div className="signup">
            <form onSubmit={this.signUp}>
              <input type="text" name="name" placeholder="new username" />
              <br />
              <input
                type="password"
                name="password"
                placeholder="new password"
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="confirm password"
              />
              <br />
              <button>
                <span>sign up</span>
              </button>
              <button onClick={this.changeForm}>
                <span>back</span>
              </button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Login;
