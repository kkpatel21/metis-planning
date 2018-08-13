import React, { Component } from "react";
import { Input, Button, List, Icon, Divider, Header} from "semantic-ui-react";
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
      typing: "",
      newTopic: ""
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
            this.setState({ topic: res.event.ideation, typing: "" });
          }
        }
      );
    } else {
      alert("Please type something!");
    }
  };
  handleKeyPress = (event,topic) => {
    if(event.key === 'Enter') {
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
              this.setState({ topic: res.event.ideation, typing: "" });
            }
          }
        );
      } else {
        alert("Please type something!");
      }
    }
  }
  //deleting topic
  onDelete = (topic, topicI) => {
    this.props.socket.emit(
      "deleteIdeation",
      {
        id: this.props.eventId,
        topic: topic,
        topicI: topicI
      },
      res => {
        if (res.event) {
          this.componentDidMount();
        }
      }
    );
  };
  //deleting comment
  delete = (topicI,commentI) => {
    this.props.socket.emit("deleteComment", {
      id: this.props.eventId,
      topicI:topicI,
      commentI: commentI
    }, res => {
      if(res.event) {
        console.log(res.event)
        this.componentDidMount();
      }
    })
  }

  onEdit = (topic) => {
    this.props.socket.emit("editIdeation", {
      id:this.props.eventId,
      topic:topic
    }, res => {

    })
  }

  onDone = (oldtopic, newTopic, cancel) => {
    this.props.socket.emit("editIdeation", {
      id: this.props.eventId,
      topic: oldtopic,
      newTopic: newTopic
    }, (res) => {
      if(res.event){
        cancel();
        this.componentDidMount();
      }
      if(res.err){
        alert("There was an error: ", res.err)
      }
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.topic.map((oneTopic, topicI) => (
            <div
              className="divScroll"
              style={{
                display: "inline-block",
                width: "calc(35% - 30px)",
                height: "400px",
                padding: "10px",
                margin: "5px",
                overflow: "auto",
                border: "solid 1px grey",
              }}
            >
              <div>
                <Button
                basic color='transparent' content='Grey'
                  size='mini'
                  icon
                  floated="right"
                  type="submit"
                  onClick={() => this.onDelete(oneTopic.topic, topicI)}
                >
                  <Icon name="delete"  />
                </Button>
                <EditIdeationModal oneTopic={oneTopic} socket={this.props.socket} eventId={this.props.eventId} onDone={(a,b,c)=>this.onDone(a,b,c)}/>
                <div>
                <Header 
                floated="left"
                className="topicName"
                style={{ color: "black" }}
                as='h2'>{oneTopic.topic}</Header>
                </div><br />
                {/* <div>
                <Divider />
                </div> */}
                <Input
                  value={this.state.typing}
                  style={{ width: "100%" }}
                  onChange={this.handleChange}
                  placeholder="Write your ideas here!"
                  onKeyPress={(e) => this.handleKeyPress(e, oneTopic)}
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
                  {oneTopic.note.map((note, commentI) => {
                    return (
                      <List.Item>
                        <List.Icon name="bolt" />{" "}
                        <List.Content> {note.comment} </List.Content>
                        <List.Content floated="right">
                          by {note.user}
                          <Icon floated="right" name='trash' onClick={() => this.delete(topicI,commentI)}/>
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
          autoRender={this.componentDidMount()}
        />
      </div>
    );
  }
}
