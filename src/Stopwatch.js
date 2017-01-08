import React, { Component, PropTypes } from 'react'

class Stopwatch extends Component {
  constructor () {
    super()
    this.running = false
    this.time = 0
    this.elapsed = 0

    this.tick = this.tick.bind(this)
    this.state = {
      times: [0, 0, 0]
    }
  }

  componentWillMount () {
    if (this.props.start) {
      this.start()
    }
  }

  start () {
    if (!this.running) {
      this.running = true
      this.tick()
    }
  }

  tick (time) {
    this.elapsed = time
    this.calculate(time)
    requestAnimationFrame(this.tick)
  }

  calculate (time) {
    console.log(time)
  }

  render () {
    return (
      <div>that</div>
    )
  }
}

Stopwatch.propTypes = {
  start: PropTypes.bool.isRequired
}

export default Stopwatch