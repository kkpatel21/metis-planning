import React, { Component } from "react";
import { Tab, Input, Button, List, Icon } from "semantic-ui-react";
import "./Notepad.css";
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
        console.log("NOTES OBJECT ____________>>>", json);
        this.setState({ notes: json });
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
    .then(res => res.json())
    .then(json => {
        console.log("is this logging????????????", json);
        if (json.status === "success") {
          this.setState({notes: json.ideation})
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
          <br />
          {/* <div id="create">+</div> */}
        </div>
        <div>
          <List celled style={{ padding: 10 }}>
            {this.state.notes.map(note => {
              return (
                <List.Item>
                  <List.Icon name="bolt" />{" "}
                  <List.Content> {note.note} </List.Content>
                  <List.Content floated="right">
                  by {note.user}
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}
