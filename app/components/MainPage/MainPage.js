import React, { Component } from "react";
import {
  Grid,
  Header,
  Button,
  Checkbox,
  Form,
  Divider,
  Segment
} from "semantic-ui-react";
import Login from "../Login/Login.js";
import SignUp from "../SignUp/SignUp.js";
import "./MainPage.css";
import UserDash from "../UserDash/UserDash.js";
import NavBar from "../NavBar/NavBar.js";


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  }

  toggleLogged = () => {
    this.setState({
      logged: !this.state.logged
    });
  };

  render() {
    let renderLog;

    if (!this.state.logged) {
      renderLog = (
        <div className="main-page">
          <h1 className="header"> Welcome to Metis </h1>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={8}>
                <div className="Login">
                  <h2 className="loginHeader"> Log In </h2>
                  <Divider />
                  <Login toggleLogged={this.toggleLogged} />
                </div>
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="SignUp">
                  <h2 className="signupHeader"> Sign Up </h2>
                  <Divider />
                  <SignUp />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    } else {
      renderLog = (
        <div>
          <NavBar toggleLogged={this.toggleLogged} />
          <UserDash />
        </div>
      );
    }

    return <div className="entire-page">{renderLog}</div>;
  }
}

export default MainPage;
