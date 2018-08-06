import React, { Component } from "react";
import { Tab, Input, Button } from "semantic-ui-react";
import "./Notepad.css";
const $ = window.$;
export default class Notepad extends React.Component {
  constructor() {
    super();
    this.state = {
      typing: "",
      notes: []
    };
  }
  componentDidMount() {
    console.log("EVENTID =======", this.props.eventId);
    $("#create").click(function() {
      $(this).before("<textarea></textarea>");
    });

    fetch(`/api/getIdeation/${this.props.eventId}`)
      .then(res => res.json())
      .then(json => {
        console.log("This is supposed to be an array of notes>>>>>>>", json);
        this.setState({notes:json})
      });
  }
  handleChange = e => {
    this.setState({
      typing: e.target.value
    });
  };
  handleAdd = () => {
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
      .then(json => {
        console.log(json);
        if (json.status === "success") {
          alert("note added!");
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <Input
            onChange={this.handleChange}
            style={{ width: 500 }}
            placeholder="Write your ideas here!"
          />
          <Button onClick={this.handleAdd} basic color="blue">
            Add
          </Button>
          {/* <div id="create">+</div> */}          
        </div>
        <div>
          {this.state.notes.map((note) => {
              return <p>{note.note} by {note.user}</p>
          })}
        </div>
      </div>
    );
  }
}
