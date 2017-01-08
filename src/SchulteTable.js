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
