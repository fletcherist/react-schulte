import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './SchulteTable.css'

class SchulteTable extends Component {
  static defaultProps = {
    size: 5,
    initialCount: 1,
    keyboard: false
  }
  constructor (props) {
    super(props)
    this.square = []

    const { size, initialCount } = props

    let count = initialCount
    for (let i = 0; i < size; i++) {
      this.square[i] = []
      for (let e = 0; e < size; e++) {
        this.square[i][e] = count
        count++
      }
    }
    this.shuffle()
  }

  shuffle () {
    let i = this.square.length
    while (i > 1) {
      i = i - 1
      let j = Math.floor(Math.random() * this.square.length)
      const tmp = this.square[0][i]
      this.square[0][i] = this.square[0][j]
      this.square[0][j] = tmp
    }
  }

  renderSquare () {
    return this.square.map((line, i) => {
      let lines = line.map((elem, e) => {
        let lineClassNames = 'element'
        if (e === 0) lineClassNames += ' element--first'
        if (i === this.square.length - 1) lineClassNames += ' element--last'
        console.log(i)
        return (
          <div
            className={lineClassNames}
            key={e}>
            {elem}
          </div>
        )
      })

      return (
        <div key={i} className='line'>{lines}</div>
      )
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
      </div>
    )
  }
}

SchulteTable.propTypes = {
  keyboard: PropTypes.bool,
  size: PropTypes.number,
  initialCount: PropTypes.number
}


export default SchulteTable
