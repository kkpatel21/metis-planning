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
    this.props.socket.emit("getIdeation", {id: this.props.eventId}, res => {
      this.setState({topic: res.event.ideation})
      console.log("this is event^^^^^^^^^^^^^^^", res.event.ideation)
    })
  }
  // autoRender = ideationArr => {
  //   console.log(ideationArr);
  //   this.setState({ topic: ideationArr });
  // };

  handleChange = e => {
    this.setState({
      typing: e.target.value
    });
  };

  //adding comment
  handleAdd = topic => {
    if (this.state.typing.length !== 0) {
      console.log('hey')
      this.props.socket.emit(
        "addComment",
        {
          id: this.props.eventId,
          typing: this.state.typing,
          topic: topic
        },
        res => {
          if (res.event) {
            this.setState({topic: res.event.ideation})
            alert("Comment added");
          }
        }
      );
    } else {
      alert("Please type something!");
    }
  };
  //deleting topic
  onDelete = topic => {
    console.log(topic);
    this.props.socket.emit(
      "deleteIdeation",
      {
        id: this.props.eventId,
        topic: topic
      },
      res => {
        if (res.event) {
          alert("Deleted successfully");
          this.componentDidMount();
        }
      }
    );
  };

  render() {
    return (
      <div>
        <AddIdeationModal
          socket={this.props.socket}
          eventId={this.props.eventId}
          // autoRender={this.autoRender}
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
                      onClick={() => this.handleAdd(oneTopic)}
                    />
                  }
                />
                <Button
                  type="submit"
                  onClick={() => this.onDelete(oneTopic.topic)}
                >
                  Delete
                </Button>
                <br />
              </div>
              <div>
                <List divided relaxed style={{ padding: 10 }}>
                  {oneTopic.note.map(note => {
                    return (
                      <List.Item>
                        <List.Icon name="bolt" />{" "}
                        <List.Content> {note} </List.Content>
                        <List.Content floated="right">
                          by {oneTopic.user}
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
