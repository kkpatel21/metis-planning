import React, { Component } from "react";
import { Input, Button, List, Icon, Divider, Grid } from "semantic-ui-react";
import Notepad from "./Notepad/Notepad";
import Speaker from "./Speaker/Speaker";
import AddIdeationModal from "../../Modals/AddIdeationModal";
import "./Ideation.css";
import EditIdeationModal from "../../Modals/EditIdeationModal";

export default class Ideation extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: [],
      typing: ""
    };
  }

  //rendering existing topics
  componentDidMount() {
    this.props.socket.emit("getIdeation", { id: this.props.eventId }, res => {
      this.setState({ topic: res.event.ideation });
    });
  }

  handleChange = e => {
    this.setState({
      typing: e.target.value
    });
  };

  //adding comment
  handleAdd = topic => {
    if (this.state.typing.length !== 0) {
      this.props.socket.emit(
        "addComment",
        {
          id: this.props.eventId,
          typing: this.state.typing,
          topic: topic
        },
        res => {
          if (res.event) {
            console.log("THIS IS A WHOLE EVENT -------->", res.event);
            console.log("IDEATION -------->", res.event.ideation);
            this.setState({ topic: res.event.ideation, typing: "" });
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
    this.props.socket.emit(
      "deleteIdeation",
      {
        id: this.props.eventId,
        topic: topic
      },
      res => {
        if (res.event) {
          this.componentDidMount();
        }
      }
    );
  };

  onEdit = (topic) => {
    console.log("topic being edited is ---------->", topic)
    this.props.socket.emit("editIdeation", {
      id:this.props.eventId,
      topic:topic
    }, res => {

    })
  }

  render() {
    return (
      <div>
        <div>
          {this.state.topic.map(oneTopic => (
            <div
              className="divScroll"
              style={{
                display: "inline-block",
                width: "calc(35% - 30px)",
                height: "200px",
                padding: "10px",
                margin: "5px",
                overflow: "auto",
                border: "solid 1px grey",
              }}
            >
              <div>
                <Button
                  icon
                  circular
                  floated="right"
                  type="submit"
                  onClick={() => this.onDelete(oneTopic.topic)}
                >
                  <Icon name="delete" />
                </Button>
                <EditIdeationModal socket={this.props.socket} eventId={this.props.eventId} />
                <div>
                  <h1
                    floated="left"
                    className="topicName"
                    style={{ color: "black" }}
                  >
                    {oneTopic.topic}
                  </h1>
                </div>
                <Divider />
                <Input
                  style={{ width: "100%" }}
                  onChange={this.handleChange}
                  // style={{ width: 250, borderWidth: 1, borderColor: "black" }}
                  placeholder="Write your ideas here!"
                  icon={
                    <Icon
                      name="edit"
                      inverted
                      circular
                      link
                      onClick={() => this.handleAdd(oneTopic)}
                    />
                  }
                />
                <br />
              </div>
              <div>
                <List style={{ paddingTop: 10 }}>
                  {oneTopic.note.map(note => {
                    return (
                      <List.Item>
                        <List.Icon name="bolt" />{" "}
                        <List.Content> {note} </List.Content>
                        <List.Content floated="right">
                          by {oneTopic.user}
                        </List.Content>
                        <Divider />
                      </List.Item>
                    );
                  })}
                </List>
              </div>
              <div />
            </div>
          ))}
        </div>

        <AddIdeationModal
          socket={this.props.socket}
          eventId={this.props.eventId}
          // autoRender={this.autoRender}
        />
      </div>
    );
  }
}
