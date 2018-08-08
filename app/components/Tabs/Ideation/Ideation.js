import React, { Component } from 'react';
import { Tab, Input, Button, List, Icon } from 'semantic-ui-react';
import Notepad from "./Notepad/Notepad";
import Speaker from "./Speaker/Speaker";
import AddIdeationModal from "../../Modals/AddIdeationModal";


export default class Ideation extends React.Component {
  constructor() {
    super();
    this.state={
      topic: []
    }
  }
  componentDidMount(){
    fetch(`/api/getIdeation/${this.props.eventId}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      var topicArr = this.state.topic.concat(json)
      this.setState({ topic: topicArr });
    });
  }
  autoRender = (ideationArr) => {
    console.log(ideationArr)
    this.setState({topic:ideationArr})
  }



  render() {
    // const panes = [
    //   { menuItem: 'Venue', render: () => <Tab.Pane><div style ={{}} ><Notepad eventId={this.props.eventId}/></div></Tab.Pane> },
    //   { menuItem: 'Caterer', render: () => <Tab.Pane>Caterer</Tab.Pane> },
    //   { menuItem: 'Speaker', render: () => <Tab.Pane><Speaker eventId={this.props.eventId} /></Tab.Pane> },
    //   { menuItem: "Activities", render: () => <Tab.Pane> Activities brainstorming </Tab.Pane> },
    // ]
    return (
      <div>
      {/* <Tab panes={panes} /> */}
      <AddIdeationModal eventId={this.props.eventId} autoRender={this.autoRender}/>
      <div>{this.state.topic.map((oneTopic) => 
              <div style={{width:300}}>
              <div>
              <h1 style={{color:"black"}}>{oneTopic.topic}</h1>
                <Input
                  onChange={this.handleChange}
                  style={{ width: 250, borderWidth: 1, borderColor: "black" }}
                  placeholder="Write your ideas here!"
                  icon={<Icon name='check' inverted circular link onClick={this.handleAdd} />}
                />
                <br />
              </div>
              {/* <div>
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
              </div> */}
            </div>
    )}</div>
      </div>
    )
  }
}
