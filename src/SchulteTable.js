import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './SchulteTable.css'

class SchulteTable extends Component {
  static defaultProps = {
    size: 5,
    initialCount: 1,
    keyboard: false,
    annotation: false
  }
  constructor (props) {
    super(props)
    this.square = []

    this.shuffleMatrix = this.shuffleMatrix.bind(this)
    this.initializeMatrix = this.initializeMatrix.bind(this)

    this.initializeMatrix()
    this.shuffleMatrix()

    this.state = {
      square: this.square,
      stopwatch: 0
    }
  }

  initializeMatrix () {
    const { size, initialCount } = this.props

    let count = initialCount
    for (let i = 0; i < size; i++) {
      this.square[i] = []
      for (let e = 0; e < size; e++) {
        this.square[i][e] = count
        count++
      }
    }
  }

  shuffleMatrix () {
    let i = this.square.length
    while (i > 1) {
      i = i - 1
      let e = this.square.length
      while (e > 1) {
        e = e - 1
        let j = Math.floor(Math.random() * this.square.length)
        let p = Math.floor(Math.random() * this.square.length)
        const tmp = this.square[i][e]
        this.square[i][e] = this.square[j][p]
        this.square[j][p] = tmp
      }
    }
    this.setState({square: this.square})
  }

  renderSquare () {
    return this.square.map((line, i) => {
      let lines = line.map((elem, e) => {
        let lineClassNames = 'element'
        if (e === 0) lineClassNames += ' element--first'
        if (i === this.square.length - 1) lineClassNames += ' element--last'
        console.log(i)
        return (
          <div className={lineClassNames} key={e}>{elem}</div>
        )
      })

      return (
        <div key={i} className='line'>{lines}</div>
      )
    })
  }

  renderKeyboard () {
    if (this.props.keyboard) {
      return (
        <div>push space when you ready and space, when you finished</div>
      )
    }
    return (
      <button onClick={this.initializeMatrix()}>Start</button>
    )  
  }

  startStopwatch () {
    this.stopwatchInterval = setInterval(() => {
      this.setState({
        stopwatch: this.state.stopwatch + 100
      })
    }, 100)
  }

  render() {
    return (
      <div className='container'>
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={300}>
          <div>{this.renderSquare()}</div>
        </ReactCSSTransitionGroup>
        <button onClick={this.shuffleMatrix}>shuffle</button>
        {this.renderKeyboard()}
        
      </div>
    )
  }
}

SchulteTable.propTypes = {
  keyboard: PropTypes.bool,
  size: PropTypes.number,
  initialCount: PropTypes.number,
  annotation: PropTypes.bool
}


export default SchulteTable
