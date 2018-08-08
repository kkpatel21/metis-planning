import React, { Component } from "react";
import { Tab, Input, Button, List, Icon } from "semantic-ui-react";
import Notepad from "./Notepad/Notepad";
import Speaker from "./Speaker/Speaker";
import AddIdeationModal from "../../Modals/AddIdeationModal";

export default class Ideation extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: [],
      typing: ""
    };
  }
  componentDidMount() {
    fetch(`/api/getIdeation/${this.props.eventId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        var topicArr = this.state.topic.concat(json);
        this.setState({ topic: topicArr });
      });
  }
  autoRender = ideationArr => {
    console.log(ideationArr);
    this.setState({ topic: ideationArr });
  };
  handleChange = e => {
    this.setState({
      typing: e.target.value
    });
  };
  handleAdd = () => {
    if (this.state.typing.length !== 0) {
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
            this.setState({ notes: json.ideation });
          }
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert("Please type something!");
    }
  };

  render() {
    return (
      <div>
        {/* <Tab panes={panes} /> */}
        <AddIdeationModal
          eventId={this.props.eventId}
          autoRender={this.autoRender}
        />
        <div>
          {this.state.topic.map(oneTopic => (
            <div style={{ width: 300 }}>
              <div>
                <h1 style={{ color: "black" }}>{oneTopic.topic}</h1>
                <Input
                  onChange={this.handleChange}
                  style={{ width: 250, borderWidth: 1, borderColor: "black" }}
                  placeholder="Write your ideas here!"
                  icon={
                    <Icon
                      name="check"
                      inverted
                      circular
                      link
                      onClick={this.handleAdd}
                    />
                  }
                />
                <br />
              </div>
              <div>
                <List divided relaxed style={{ padding: 10 }}>
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
          ))}
        </div>
      </div>
    );
  }
}
