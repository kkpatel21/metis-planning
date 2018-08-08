import React, { Component } from "react";
import { Tab, Input, Button, List, Icon } from "semantic-ui-react";
import "./Notepad.css";
import Map from "./GoogleMap/GoogleMap"
const $ = window.$;
export default class Notepad extends React.Component {
  constructor() {
    super();
    this.state = {
      typing: "",
      notes: [],
      userName: ""
    };
  }
  componentDidMount() {
    $("#create").click(function() {
      $(this).before("<textarea></textarea>");
    });

    fetch(`/api/getIdeation/${this.props.eventId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ notes: json });
      });
  }
  handleChange = e => {
    this.setState({
      typing: e.target.value
    });
  };
  handleAdd = () => {
      if(this.state.typing.length !== 0){
        fetch("/api/addIdeation", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: this.props.eventId,
              typing: this.state.typing
            })
          })
          .then(res => res.json())
          .then(json => {
              if (json.status === "success") {
                this.setState({notes: json.ideation})
              }
            })
            .catch(err => {
              alert(err);
            });
      }
      else{
          alert("Please type something!")
      }

  };

  render() {
    return (
      <div>

        {/* <div><Map /></div> */}
      </div>
    );
  }
}
