import React, { Component } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import './CalendarView.css'
import AddEventModal from '../Modals/AddEventModal.js'
import io from 'socket.io-client'

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8888')
    this.state = {
      calendarHeading: '',
      now: new Date(),
      currentMonth: new Date().getMonth()+1,
      month: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      daysInMonthCount: new Date(new Date().getFullYear(), 2, 0).getDate(),
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      calendarGrid: [],
      calendarDates: [],
      calendarDatesWk1: [],
      calendarDatesWk2: [],
      calendarDatesWk3: [],
      calendarDatesWk4: [],
      calendarDatesWk5: [],
      calendarDatesWk6: []
    }
  }

  componentDidMount() {
    let currentMonthName = (this.state.monthNames[this.state.month]);
    this.setState({calendarHeading: currentMonthName + " " + this.state.currentYear})

    let calendarGrid = []
    for (var w = 0; w < 6; w++) {
      for (var d = 0; d < 7; d++) {
        calendarGrid.push([w,d])
      }
    }
    this.setState({calendarGrid: calendarGrid})

    let firstDayOfMonth = new Date(this.state.currentYear + "-" + this.state.currentMonth + '-1').getDay()
    let calendarDates = []
    let firstDayOfCalendarBlock = calendarGrid[firstDayOfMonth]
    for (var i = 0; i < calendarGrid.length; i++) {
      calendarDates.push(new Date(+firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24*i)).getDate())
    }
    this.setState({
      calendarDates: calendarDates,
      calendarDatesWk1: calendarDates.slice(0,7),
      calendarDatesWk2: calendarDates.slice(7,14),
      calendarDatesWk3: calendarDates.slice(14,21),
      calendarDatesWk4: calendarDates.slice(21,28),
      calendarDatesWk5: calendarDates.slice(28,35),
      calendarDatesWk6: calendarDates.slice(35,42)
    })
  }

  // showEvent = () => {
  //   this.socket.emit('fetchEvents', (res) => {
  //     if (res.err) {
  //       return alert(res)
  //     } else {
  //       this.setState({
  //         events: res.events
  //       })
  //     }
  //   })
  // }

  prevMonth = () => {
    if(this.state.month === 0) {
      let prevMonthName = this.state.monthNames[11];
      let firstDayOfMonth = new Date(parseInt(this.state.currentYear)-1 + "-" + '12' + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      for (var i = 0; i < this.state.calendarGrid.length; i++) {
        calendarDates.push(new Date(+firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24*i)).getDate())
      }
      this.setState({
        month: 11,
        currentMonth: 12,
        currentYear: this.state.currentYear-1,
        calendarHeading: prevMonthName + " " + (parseInt(this.state.currentYear)-1).toString(),
        calendarDates: calendarDates,
        calendarDatesWk1: calendarDates.slice(0,7),
        calendarDatesWk2: calendarDates.slice(7,14),
        calendarDatesWk3: calendarDates.slice(14,21),
        calendarDatesWk4: calendarDates.slice(21,28),
        calendarDatesWk5: calendarDates.slice(28,35),
        calendarDatesWk6: calendarDates.slice(35,42)
      })
    } else {
      let prevMonthName = this.state.monthNames[this.state.month-1];
      let firstDayOfMonth = new Date(this.state.currentYear + "-" + (parseInt(this.state.currentMonth)-1) + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      for (var i = 0; i < this.state.calendarGrid.length; i++) {
        calendarDates.push(new Date(+firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24*i)).getDate())
      }
      this.setState({
        month: this.state.month-1,
        currentMonth: this.state.currentMonth-1,
        calendarHeading: prevMonthName + " " + this.state.currentYear,
        calendarDates: calendarDates,
        calendarDatesWk1: calendarDates.slice(0,7),
        calendarDatesWk2: calendarDates.slice(7,14),
        calendarDatesWk3: calendarDates.slice(14,21),
        calendarDatesWk4: calendarDates.slice(21,28),
        calendarDatesWk5: calendarDates.slice(28,35),
        calendarDatesWk6: calendarDates.slice(35,42)
      })
    }
  }

  nextMonth = () => {
    if(this.state.month === 11) {
      let nextMonthName = this.state.monthNames[0];
      let firstDayOfMonth = new Date(parseInt(this.state.currentYear)+1 + "-" + '1' + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      for (var i = 0; i < this.state.calendarGrid.length; i++) {
        calendarDates.push(new Date(+firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24*i)).getDate())
      }
      this.setState({
        month: 0,
        currentMonth: 1,
        currentYear: this.state.currentYear+1,
        calendarHeading: nextMonthName + " " + (parseInt(this.state.currentYear)+1).toString(),
        calendarDates: calendarDates,
        calendarDatesWk1: calendarDates.slice(0,7),
        calendarDatesWk2: calendarDates.slice(7,14),
        calendarDatesWk3: calendarDates.slice(14,21),
        calendarDatesWk4: calendarDates.slice(21,28),
        calendarDatesWk5: calendarDates.slice(28,35),
        calendarDatesWk6: calendarDates.slice(35,42)
      })
    } else {
      let nextMonthName = this.state.monthNames[this.state.month+1];
      let firstDayOfMonth = new Date(this.state.currentYear + "-" + (parseInt(this.state.currentMonth)+1) + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      for (var i = 0; i < this.state.calendarGrid.length; i++) {
        calendarDates.push(new Date(+firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24*i)).getDate())
      }
      console.log(new Date(firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24)).getDate(), firstDayOfMonth)
      console.log(this.state.daysInMonthCount)

      this.setState({
        month: this.state.month+1,
        currentMonth: this.state.currentMonth+1,
        calendarHeading: nextMonthName + " " + this.state.currentYear,
        calendarDates: calendarDates,
        calendarDatesWk1: calendarDates.slice(0,7),
        calendarDatesWk2: calendarDates.slice(7,14),
        calendarDatesWk3: calendarDates.slice(14,21),
        calendarDatesWk4: calendarDates.slice(21,28),
        calendarDatesWk5: calendarDates.slice(28,35),
        calendarDatesWk6: calendarDates.slice(35,42)
      })
    }
  }


  render() {
    return(
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={1}>
              <Button icon floated='left' onClick={this.prevMonth}>
                <Icon name='angle left' />
              </Button>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={10}><h1>{this.state.calendarHeading}</h1></Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={1}>
              <Button icon floated='right' onClick={this.nextMonth}>
                <Icon name='angle right' />
              </Button>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.dayNames.map((day) => <Grid.Column width={2}><span className="day-block">{day}</span></Grid.Column>)}<br />
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk1.map((date) => <Grid.Column width={2}><span className='date-block'>{date}</span></Grid.Column>)}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk2.map((date) => <Grid.Column width={2}><span className='date-block'>{date}</span></Grid.Column>)}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk3.map((date) => <Grid.Column width={2}><span className='date-block'>{date}</span></Grid.Column>)}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk4.map((date) => <Grid.Column width={2}><span className='date-block'>{date}</span></Grid.Column>)}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk5.map((date) => <Grid.Column width={2}><span className='date-block'>{date}</span></Grid.Column>)}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk6.map((date) => <Grid.Column width={2}><span className='date-block'>{date}</span></Grid.Column>)}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
};
