import React, { Component } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import './CalendarView.css'
import AddEventModal from '../Modals/AddEventModal.js'
import io from 'socket.io-client'
import Loading from '../Loading.js'

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8888')
    this.state = {
      events: [],
      displayEvents: [],
      calendarHeading: '',
      now: new Date(),
      currentMonth: new Date().getMonth()+1,
      month: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
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
    this.props.socket.emit('fetchEvents', (res) => {
      this.setState({events: res.filtered})
      let displayEvents = []
      this.state.events.forEach(event => {
        let month = new Date(event.date).getMonth() //this is a number
        let date = new Date(event.date).getDate()
        let index = date + firstDayOfMonth
        if (month === this.state.currentMonth-1) {
          displayEvents.push({
            title: event.title,
            date: date + 1,
            startTime: event.startTime,
            endTime: event.endTime,
            id: event._id
          })
        }
      })
      this.setState({displayEvents: displayEvents})
    })

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
    let daysInMonthCount = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate()
    let daysInPrevMonthCount = new Date(this.state.currentYear, this.state.currentMonth-1, 0).getDate()
    for (var i = 0; i < firstDayOfMonth; i++) {
      calendarDates.push(daysInPrevMonthCount+1-firstDayOfMonth+i)
    }
    for (var i = 1; i < daysInMonthCount+1; i++) {
      calendarDates.push(i)
    }
    for (var i = 1; i < calendarGrid.length-daysInMonthCount-firstDayOfMonth+1; i++) {
      calendarDates.push(i)
    }
    // for (var i = 0; i < calendarGrid.length; i++) {
    //   calendarDates.push(new Date(+firstDayOfMonth-(1000*60*60*24*(firstDayOfMonth-1))+(1000*60*60*24*i)).getDate())
    // }

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

  prevMonth = () => {
    //log events on calendar
    let firstDayOfMonth = new Date(this.state.currentYear + "-" + this.state.currentMonth + '-1').getDay()
    this.props.socket.emit('fetchEvents', (res) => {
      this.setState({events: res.filtered, loading: true})
      let displayEvents = []
      this.state.events.forEach(event => {
        let month = new Date(event.date).getMonth() //this is a number
        let date = new Date(event.date).getDate()
        let index = date + firstDayOfMonth
        if (month === this.state.currentMonth-1) {
          displayEvents.push({
            title: event.title,
            date: date + 1,
            startTime: event.startTime,
            endTime: event.endTime,
            id: event._id
          })
        }
      })
      this.setState({displayEvents: displayEvents, loading: false})
    })

    if(this.state.month === 0) {
      let prevMonthName = this.state.monthNames[11];
      let firstDayOfMonth = new Date(parseInt(this.state.currentYear)-1 + "-" + '12' + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      let daysInMonthCount = new Date(this.state.currentYear-1, this.state.currentMonth-1, 0).getDate()
      let daysInPrevMonthCount = new Date(this.state.currentYear-1, this.state.currentMonth-2, 0).getDate()
      for (var i = 0; i < firstDayOfMonth; i++) {
        calendarDates.push(daysInPrevMonthCount+1-firstDayOfMonth+i)
      }
      for (var i = 1; i < daysInMonthCount+1; i++) {
        calendarDates.push(i)
      }
      for (var i = 1; i < this.state.calendarGrid.length-daysInMonthCount-firstDayOfMonth+1; i++) {
        calendarDates.push(i)
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
        calendarDatesWk6: calendarDates.slice(35,42),
      })
    } else {
      let prevMonthName = this.state.monthNames[this.state.month-1];
      let firstDayOfMonth = new Date(this.state.currentYear + "-" + (parseInt(this.state.currentMonth)-1) + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      let daysInMonthCount = new Date(this.state.currentYear, this.state.currentMonth-1, 0).getDate()
      let daysInPrevMonthCount = new Date(this.state.currentYear, this.state.currentMonth-2, 0).getDate()
      for (var i = 0; i < firstDayOfMonth; i++) {
        calendarDates.push(daysInPrevMonthCount+1-firstDayOfMonth+i)
      }
      for (var i = 1; i < daysInMonthCount+1; i++) {
        calendarDates.push(i)
      }
      for (var i = 1; i < this.state.calendarGrid.length-daysInMonthCount-firstDayOfMonth+1; i++) {
        calendarDates.push(i)
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
    //log events on calendar
    let firstDayOfMonth = new Date(this.state.currentYear + "-" + this.state.currentMonth + '-1').getDay()
    this.props.socket.emit('fetchEvents', (res) => {
      this.setState({events: res.filtered, loading: true})
      let displayEvents = []
      this.state.events.forEach(event => {
        let month = new Date(event.date).getMonth() //this is a number
        let date = new Date(event.date).getDate()
        let index = date + firstDayOfMonth
        if (month === this.state.currentMonth-1) {
          displayEvents.push({
            title: event.title,
            date: date + 1,
            startTime: event.startTime,
            endTime: event.endTime,
            id: event._id
          })
        }
      })
      this.setState({displayEvents: displayEvents, loading: false})
    })

    if(this.state.month === 11) {
      let nextMonthName = this.state.monthNames[0];
      let firstDayOfMonth = new Date(parseInt(this.state.currentYear)+1 + "-" + '1' + '-1').getDay()
      let calendarDates = []
      let firstDayOfCalendarBlock = this.state.calendarGrid[firstDayOfMonth]
      let daysInMonthCount = new Date(this.state.currentYear+1, this.state.currentMonth+1, 0).getDate()
      let daysInPrevMonthCount = new Date(this.state.currentYear+1, this.state.currentMonth, 0).getDate()
      for (var i = 0; i < firstDayOfMonth; i++) {
        calendarDates.push(daysInPrevMonthCount+1-firstDayOfMonth+i)
      }
      for (var i = 1; i < daysInMonthCount+1; i++) {
        calendarDates.push(i)
      }
      for (var i = 1; i < this.state.calendarGrid.length-daysInMonthCount-firstDayOfMonth+1; i++) {
        calendarDates.push(i)
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
      let daysInMonthCount = new Date(this.state.currentYear, this.state.currentMonth+1, 0).getDate()
      let daysInPrevMonthCount = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate()
      for (var i = 0; i < firstDayOfMonth; i++) {
        calendarDates.push(daysInPrevMonthCount+1-firstDayOfMonth+i)
      }
      for (var i = 1; i < daysInMonthCount+1; i++) {
        calendarDates.push(i)
      }
      for (var i = 1; i < this.state.calendarGrid.length-daysInMonthCount-firstDayOfMonth+1; i++) {
        calendarDates.push(i)
      }
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
          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.dayNames.map((day) =>
              <Grid.Column width={2}>
                <span className="day-block">
                  {day}
                </span></Grid.Column>)}
                <br />
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>

          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk1.map((date) => {
              let found = false
              let index = this.state.displayEvents.findIndex(event => {
                return date === event.date
              })
              if(index !== -1) {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  <div className='event-block' onClick={() => this.props.openEvent(this.state.displayEvents[index].id)}>
                     <div>{this.state.displayEvents[index].title}</div>
                    <div>{this.state.displayEvents[index].startTime}-{this.state.displayEvents[index].endTime}</div>
                  </div>
                  </span>
                </Grid.Column>
              } else {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  </span>
                </Grid.Column>
              }
            })}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk2.map((date) => {
              let found = false
              let index = this.state.displayEvents.findIndex(event => {
                return date === event.date
              })
              if(index !== -1) {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  <div className='event-block' onClick={() => this.props.openEvent(this.state.displayEvents[index].id)}>
                    <div>{this.state.displayEvents[index].title}</div>
                    <div>{this.state.displayEvents[index].startTime}-{this.state.displayEvents[index].endTime}</div>
                  </div>
                  </span>
                </Grid.Column>
              } else {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  </span>
                </Grid.Column>
              }
            })}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk3.map((date) => {
              let found = false
              let index = this.state.displayEvents.findIndex(event => {
                return date === event.date
              })
              if(index !== -1) {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  <div className='event-block' onClick={() => this.props.openEvent(this.state.displayEvents[index].id)}>
                    <div>{this.state.displayEvents[index].title}</div>
                    <div>{this.state.displayEvents[index].startTime}-{this.state.displayEvents[index].endTime}</div>
                  </div>
                  </span>
                </Grid.Column>
              } else {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  </span>
                </Grid.Column>
              }
            })}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk4.map((date) => {
              let found = false
              let index = this.state.displayEvents.findIndex(event => {
                return date === event.date
              })
              if(index !== -1) {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  <div className='event-block' onClick={() => this.props.openEvent(this.state.displayEvents[index].id)}>
                    <div>{this.state.displayEvents[index].title}</div>
                    <div>{this.state.displayEvents[index].startTime}-{this.state.displayEvents[index].endTime}</div>
                  </div>
                  </span>
                </Grid.Column>
              } else {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  </span>
                </Grid.Column>
              }
            })}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk5.map((date) => {
              let found = false
              let index = this.state.displayEvents.findIndex(event => {
                return date === event.date
              })
              if(index !== -1) {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  <div className='event-block' onClick={() => this.props.openEvent(this.state.displayEvents[index].id)}>
                    <div>{this.state.displayEvents[index].title}</div>
                    <div>{this.state.displayEvents[index].startTime}-{this.state.displayEvents[index].endTime}</div>
                  </div>
                  </span>
                </Grid.Column>
              } else {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  </span>
                </Grid.Column>
              }
            })}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          {this.state.calendarDatesWk6[0]>=30 ?
          <Grid.Row className='calendar-row'>
            <Grid.Column width={1}></Grid.Column>
            {this.state.calendarDatesWk6.map((date) => {
              let found = false
              let index = this.state.displayEvents.findIndex(event => {
                return date === event.date
              })
              if(index !== -1) {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  <div className='event-block' onClick={() => this.props.openEvent(this.state.displayEvents[index].id)}>
                    <div>{this.state.displayEvents[index].title}</div>
                    <div>{this.state.displayEvents[index].startTime}-{this.state.displayEvents[index].endTime}</div>
                  </div>
                  </span>
                </Grid.Column>
              } else {
                return <Grid.Column width={2}>
                  <span className='date-block'>
                    <span className='date-number'>{date}</span>
                  </span>
                </Grid.Column>
              }
            })}
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
              :
              null
            }
        </Grid>
      </div>
    )
  }
};
