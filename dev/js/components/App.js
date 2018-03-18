import React, {Component} from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faUndo, faHeart } from '@fortawesome/fontawesome-free-solid'
require('../../scss/style.scss')

class PomodoroClock extends Component {
  constructor (props) {
    super(props)
    this.handleCountdown = this.handleCountdown.bind(this)
    this.state = {
      isTimerRunning: false,
      minutes: 25,
      seconds: 60
    }
  }

  handleCountdown () {
    if (this.state.isTimerRunning) {
      this.setState({
        isTimerRunning: false
      })
      clearInterval(this.timeInterval)
    } else {
      this.timeInterval = setInterval(() => this.increaseInterval(), 1000)
      this.setState({
        isTimerRunning: true
      })
    }
  }

  resetCountdown () {
    clearInterval(this.timeInterval)
    this.setState(prevState => ({
      seconds: 60,
      minutes: 25,
      isTimerRunning: false
    }))
  }

  increaseInterval () {
    let minutes = this.state.minutes
    let seconds = this.state.seconds
    if (minutes !== 0) {
      if (seconds !== 0 && minutes !== 25) {
        seconds = seconds - 1
      } else if (minutes === 25 && seconds === 60) {
        minutes = minutes - 1
        seconds = seconds - 1
      } else {
        minutes = minutes - 1
        seconds = 60
      }

      this.setState({
        minutes: minutes,
        seconds: seconds
      })
    }
  }

  render () {
    return (
      <div>
        <section
          style={{
            backgroundImage: 'linear-gradient(141deg,#04a6d7 0,#209cee 71%,#3287f5 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
          id='app'
          className='hero is-info is-fullheight is-bold'
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              padding: '3rem 1.5rem'
            }}
            className='hero-body'>
            <div className='container has-text-centered'>

              <h2
                style={{
                  fontSize: '0.8rem',
                  color: '#fff',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                  lineHeight: 1.125,
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  fontFamily: 'BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif'
                }}
                className='title is-6'
              >{this.state.isTimerRunning ? 'Never quit, keep going!!' : 'Let the countdown begin!!'}</h2>

              {/* <!--  THE TIMER NUMBERS  --> */}
              <div id='timer'>
                <span id='minutes'>
                  {this.state.minutes.toString().length === 1 ? '0' : ''}
                  {this.state.minutes}
                </span>
                <span id='middle'>:</span>
                <span id='seconds'>
                  {(this.state.seconds.toString().length === 1 || this.state.seconds === 60) ? '0' : ''}
                  {this.state.seconds === 60 ? 0 : this.state.seconds}</span>
              </div>

              {/* <!--  THE BUTTONS  --> */}
              <div
                id='buttons'
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  marginLeft: '4px',
                  justifyContent: 'center'
                }}
              >

                {/* <!--  START BUTTON    --> */}
                <button
                  id='start'
                  style={{
                    height: '2.25rem',
                    lineHeight: '1.5rem',
                    userSelect: 'none',
                    textAlign: 'center',
                    backgroundColor: '#363636',
                    color: '#f5f5f5',
                    borderRadius: '3px',
                    justifyContent: 'center',
                    paddingLeft: '0.75em',
                    paddingRight: '0.75em',
                    cursor: 'pointer',
                    width: '2.25rem'
                  }}
                  onClick={this.handleCountdown}
                  className='button is-dark is-large'
                >
                  <FontAwesomeIcon
                    size='lg'
                    icon={this.state.isTimerRunning ? faPauseCircle : faPlayCircle}
                  />
                </button>

                {/* <!--  RESET BUTTON   --> */}
                { (this.state.isTimerRunning || this.state.minutes !== 25) &&
                <button
                  id='reset'
                  style={{
                    height: '2.25rem',
                    lineHeight: '1.5rem',
                    userSelect: 'none',
                    textAlign: 'center',
                    backgroundColor: '#363636',
                    color: '#f5f5f5',
                    borderRadius: '3px',
                    justifyContent: 'center',
                    paddingLeft: '0.75em',
                    paddingRight: '0.75em',
                    cursor: 'pointer',
                    width: '2.25rem'
                  }}
                  onClick={this.resetCountdown.bind(this)}
                  className='button is-dark is-large'
                >
                  <FontAwesomeIcon icon={faUndo} />
                </button>}
              </div>

            </div>
          </div>
          <footer
            style={{
              position: 'fixed',
              textAlign: 'center',
              bottom: 10,
              width: '100%',
              height: '30px',
              color: '#fff',
              fontFamily: 'Roboto, sans-serif'
            }}>
            <div> Made with <FontAwesomeIcon color='#ff0000' icon={faHeart} /> by Sachin</div>
          </footer>
        </section>
      </div>
    )
  }
}

export default PomodoroClock
