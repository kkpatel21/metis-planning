import React, { Component } from "react";
import { Tab, Input, Button, List, Icon } from "semantic-ui-react";
const $ = window.$;
export default class Speaker extends React.Component {
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
        <div style={{width:300}}>
          <div>
            <Input
              onChange={this.handleChange}
              style={{ width: 250, borderWidth: 1, borderColor: "black" }}
              placeholder="Write your ideas here!"
              icon={<Icon name='check' inverted circular link onClick={this.handleAdd} />}
            />
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
      </div>
    );
  }
}
