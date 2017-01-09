import React, { Component, PropTypes } from 'react'

class Stopwatch extends Component {
  constructor () {
    super()
    this.running = false
    this.time = 0
    this.elapsed = 0

    this.tick = this.tick.bind(this)
    this.state = {
      times: [0, 0, 0],
      time: 0
    }
  }

  componentWillMount () {
    if (this.props.start) {
      this.start()
    }
  }

  componentWillReceiveProps () {
    console.log(this.props)
    if (this.props.start) {
      this.start()
    } else {
      this.stop()
    }
  }

  start () {
    if (!this.running) {
      this.running = true
      this.tick()
    }
  }

  stop () {
    cancelAnimationFrame(this.frame)
    this.frame = null
  }

  tick (time) {
    this.elapsed = time
    this.calculate(time)
    this.frame = requestAnimationFrame(this.tick)
  }

  calculate (time) {
    // if (time / )
    this.setState({
      time: Math.floor(time)
    })
  }

  render () {
    return (
      <div>{this.state.time.toString()}</div>
    )
  }
}

Stopwatch.propTypes = {
  start: PropTypes.bool.isRequired
}

export default Stopwatch