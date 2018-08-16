import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import EditEventModal from '../../Modals/EditEventModal'

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    }
  }

  componentDidMount() {
    this.props.socket.emit('getEventInfo', {eventId: this.props.eventId})
    this.props.socket.on('getEvent', (data) => {
      this.setState({event: data.event})
    })
  }
  render() {
    console.log(this.state.event)
    //THIS IS INFO FOR ALL INVITEES -- CAN SHOW INFO BASED ON THE STATUS
    let attending = 0;
    let pending = 0;
    let notComing = 0;
    let total = 0;
    if (this.state.event.people) {
      total = this.state.event.people.length
      this.state.event.people.forEach((people) => {
        if (people.status === 'Coming') {
          attending++;
        } else if (people.status ==='NotComing') {
          notComing++;
        } else {
          pending++;
        }
      })
    }

    //THIS INFO IS FOR SPECIAL GUESTS -- CAN RENDER IT SAME LIKE THE
    let sAttending = 0;
    let sPending = 0;
    let sNotComing = 0;
    let sTotal = 0;
    if (this.state.event.caterers) {
      sTotal = this.state.event.caterers.length
      this.state.event.caterers.forEach((special) => {
        if (people.status === 'Unable') {
          sNotComing++
        } else if (people.status === 'Able') {
          sAttending++
        } else {
          sPending++
        }
      })
    }

    let collaborators = this.state.event.collaborators
    let collaboratorRender = [];
    if (collaborators) {
      collaborators.forEach((person) => {
        collaboratorRender.push(
          <div>
            {person}
          </div>)
      })
    }

    //How much funds the event has raised.
    let fundraisers = this.state.event.fundraising
    let totalFundsRaised = 0;
    if (fundraisers) {
      fundraisers.forEach((fund) => {
        fund.data.forEach((donation) => {
          console.log(donation)
          totalFundsRaised += parseInt(donation.amount)
        })
      })
    }

    //Need to figure out how we want to display the budget information Consult Perry and Ellie

    return(
      <div>
        <Header as='h1'>{this.state.event.title}</Header>
        <div className='eventInfo'>
          This is just general info about the event itself.
          {this.state.event.date}
          <br />
          {this.state.event.startTime}
          <br />
          {this.state.event.endTime}
          <br />
        </div>
        <br />
        <div className='peopleInfo'>
          There are {total} invited.
          Of those invited, {attending} people are coming, {notComing} are not coming, and {pending} have still not replied.
        </div>
        <br />
        <div className='collaboratorInfo'>
          I couldn't find the code to map through an array of different renders, but if you map through collaboratorRender it has each collaborator, so maybe we can show which collaborators are there.
        </div>
        <div className='funds'>
          Your event has raised ${totalFundsRaised} for the event!
        </div>
        <br />
        <div className='budget'>

        </div>


        This section will be developed at the end.
        <EditEventModal socket={this.props.socket} eventId={this.props.eventId} />
      </div>
    )
  }
}
