import React, { Component } from 'react'

class Stopwatch extends Component {
  constructor () {
    super()
    this.times = [0, 0, 0]
    this.time = 0
    this.elapsed = 0

    this.tick = this.tick.bind(this)
    this.running = false
  }

  start () {
    this.time = performance.now()
  }

  tick () {

    requestAnimationFrame(this.tick)
  }

  constructor ()
  render () {
    return (
      <div>that</div>
    )
  }
}

export default Stopwatch