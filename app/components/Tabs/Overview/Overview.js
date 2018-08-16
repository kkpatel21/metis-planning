import React, { Component } from 'react'
import { Header, Progress } from 'semantic-ui-react'
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

    //Collaborators
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

    //budget
    let allocated = 0;
    let totalBudget = 0;
    let percent = 0;
    let budget = this.state.event.budget
    if (budget) {
      totalBudget = this.state.event.budget.total
      this.state.event.budget.budgetItems.forEach((item) => {
        allocated += parseInt(item.amount)
      })
      percent = parseInt(allocated/totalBudget*100)
    }



    //How much funds the event has raised.
    let fundraisers = this.state.event.fundraising;
    let numCampaigns = 0;
    let totalFundsRaised = 0;
    if (fundraisers) {
      fundraisers.forEach((fund) => {
        fund.data.forEach((donation) => {
          totalFundsRaised += parseInt(donation.amount)
        })
      })
    }

    //Need to figure out how we want to display the budget information Consult Perry and Ellie

    return(
      <div>
        <div className='collaboratorInfo'>
          I couldn't find the code to map through an array of different renders, but if you map through collaboratorRender it has each collaborator, so maybe we can show which collaborators are there.
        </div>
        <span className='overview-header'>
          <Header as='h1'>{this.state.event.title}</Header>
          <EditEventModal socket={this.props.socket} eventId={this.props.eventId} />
        </span>
        <div className='eventInfo'>
          {this.state.event.date}
          <br />
          {this.state.event.startTime}
          <br />
          {this.state.event.endTime}
          <br />
        </div>
        <br />
        <div className='peopleInfo'>
          <h3>People</h3>
          <div>
            Invited: {total}
          </div>
          <div>
            Attending: {attending}
          </div>
          <div>
            Pending: {pending}
          </div>
          <div>
            Not Coming: {notComing}
          </div>
        </div>
        <div className='budget'>
          <h3>Budget</h3>
          {percent > 100 ?
            <Progress className='pbar' percent={percent} progress error />
            :
            <Progress className='pbar' percent={percent} progress inverted color='blue'/>
          }
          <div>
            Allocated: ${allocated}
          </div>
          <div>
            Total Budget: ${totalBudget}
          </div>
        </div>
        <div className='funds'>
          Your event has raised ${totalFundsRaised} for the event!
        </div>
      </div>
    )
  }
}
