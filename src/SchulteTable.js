import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Stopwatch from './Stopwatch'
import './SchulteTable.css'

const COLOURS =  [
  [['#3acfd5', '#3a4ed5'], ['#a5e3e6', '#dbdfff']],
  [['#3acfd5', '#3a4ed5'], ['black', 'blue']]
]

class SchulteTable extends Component {
  static defaultProps = {
    size: 5,
    initialCount: 1,
    keyboard: true,
    annotation: false
  }
  constructor (props) {
    super(props)
    this.square = []

    this.shuffleMatrix = this.shuffleMatrix.bind(this)
    this.initializeMatrix = this.initializeMatrix.bind(this)

    this.initializeMatrix()
  }

  componentWillMount () {
    this.setState({
      square: this.square,
      stopwatchRunning: false
    })
  }

  componentDidMount () {
    if (this.props.keyboard) {
      window.addEventListener('keydown', e => {
        // 32 — Spacebar
        if (e.keyCode === 32) {
          this.toggleStopwatch()
        }
      })
    }
  }

  componentWillUpdate () {
    console.log(this.state)
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
    const randomPallette = Math.floor(Math.random() * COLOURS.length)
    const coloursBright = COLOURS[randomPallette][0]
    const coloursPale = COLOURS[randomPallette][1]
    return this.square.map((line, i) => {
      let lines = line.map((elem, e) => {
        let lineClassNames = 'element'
        let lineStyles = {}
        if (e === 0) lineClassNames += ' element--first'
        else if (i === this.square.length - 1) lineClassNames += ' element--last'
        else if (i === Math.floor(this.square.length / 2) &&
            e === Math.floor(this.square[i].length / 2)) {
          lineClassNames += ' element--center'
          lineStyles = Object.assign(lineStyles, {
            borderImage: `linear-gradient(to bottom, ${coloursBright[0]} 0%, ${coloursBright[1]} 100%)`,
            borderImageSlice: 1
          })
        } else {
          
          lineStyles = {
            borderLeft: `1px solid ${coloursPale[0]}`,
            borderBottom: `1px solid ${coloursPale[1]}`,
          }
        }

        
        return (
          <div className={lineClassNames}
              key={e}
              style={lineStyles}>
              {elem}
          </div>
        )
      })

      return (
        <div key={i} className='line'>{lines}</div>
      )
    })
  }

  renderKeyboard () {
    const { keyboard } = this.props
    const { stopwatchRunning } = this.state
    if (keyboard) {
      return (
        <div>push space when you ready and space, when you finished</div>
      )
    }

    let startWord = !stopwatchRunning ? 'Start' : 'Stop'
    return (
      <button onClick={this.shuffleMatrix}>{startWord}</button>
    )  
  }

  toggleStopwatch () {
    this.setState({
      stopwatchRunning: !this.state.stopwatchRunning
    })
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
        <Stopwatch start={this.state.stopwatchRunning}/>
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
