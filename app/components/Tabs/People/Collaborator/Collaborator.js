import React, { Component } from 'react'
import { List, Icon, Button, Grid, Divider, Message, Checkbox, Input, Table, Header } from 'semantic-ui-react'
import UpdateCollaboratorModal from '../../../Modals/UpdateCollaboratorModal'
import SendEmailModal from '../../../Modals/SendEmailModal'


export default class Collaborator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    }
  }

  componentDidMount() {
    this.props.socket.emit('getOwner', {eventId: this.props.eventId})
    this.props.socket.on('getOwner', (res) => {
      this.setState({
        name: res.name,
        email: res.email
      })
    })
  }

  delete = (index) => {
    this.props.socket.emit('deleteCollaborator', {index: index, eventId: this.props.eventId})
  }

  render() {
    return (
      <div className="collaboratorTable">
        <Header as='h2'>Collaborators</Header>
        <Divider />
          <Table striped basic>
            <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Name</Table.HeaderCell>
               <Table.HeaderCell>Phone</Table.HeaderCell>
               <Table.HeaderCell>Email</Table.HeaderCell>
               <Table.HeaderCell>Role</Table.HeaderCell>
               <Table.HeaderCell>Quick Notes</Table.HeaderCell>
               <Table.HeaderCell><Input icon='search' size='mini' focus placeholder='Search Team...' onChange={(e) => this.props.filteredList(e.target.value)}/></Table.HeaderCell>
             </Table.Row>
           </Table.Header>

           <Table.Body className="tableList">
             <Table.Row>
              <Table.Cell>{this.state.name}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{this.state.email}</Table.Cell>
              <Table.Cell>Owner</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                {/* <UpdateCollaboratorModal socket={this.props.socket} guest={guest} index={i} eventId={this.props.eventId}/> &ensp; */}
                <SendEmailModal socket={this.props.socket} guest={{email: this.state.email}}/> &ensp;
              </Table.Cell>
            </Table.Row>
             {this.props.collaboratorList.map((guest, i) => {
               return (
                <Table.Row>
                 <Table.Cell>{guest.name}</Table.Cell>
                 <Table.Cell>{guest.phone}</Table.Cell>
                 <Table.Cell>{guest.email}</Table.Cell>
                 <Table.Cell>{guest.role}</Table.Cell>
                 <Table.Cell>{guest.notes}</Table.Cell>
                 <Table.Cell>
                   <UpdateCollaboratorModal socket={this.props.socket} guest={guest} index={i} eventId={this.props.eventId}/> &ensp;
                   <SendEmailModal socket={this.props.socket} guest={guest}/> &ensp;
                   <Icon name='trash' onClick={() => this.delete(i)}/>
                 </Table.Cell>
               </Table.Row>);
             })}
           </Table.Body>

         </Table>
       </div>

    )
  }
}
