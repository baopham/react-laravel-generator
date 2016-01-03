import React from 'react'
import Table from 'Migration/Table'
import styles from './Migration.scss'

export default class PivotTableFields extends React.Component {
  static propTypes = {
    tableOne: React.PropTypes.instanceOf(Table).isRequired,
    tableTwo: React.PropTypes.instanceOf(Table).isRequired,
    updateTableOne: React.PropTypes.func.isRequired,
    updateTableTwo: React.PropTypes.func.isRequired
  }

  updateTableOneName = (event) => {
    this.props.tableOne.name = event.target.value
    this.props.updateTableOne(this.props.tableOne)
  }

  updateTableOnePrimaryKey = (event) => {
    this.props.tableOne.primaryKey = event.target.value
    this.props.updateTableOne(this.props.tableOne)
  }

  updateTableTwoName = (event) => {
    this.props.tableTwo.name = event.target.value
    this.props.updateTableTwo(this.props.tableTwo)
  }

  updateTableTwoPrimaryKey = (event) => {
    this.props.tableTwo.primaryKey = event.target.value
    this.props.updateTableTwo(this.props.tableTwo)
  }

  render () {
    const classNames = ['row', styles['row-pivot-table']].join(' ')

    return (
      <div>
        <div className={classNames}>
          <div className='col-md-6'>
            <input className='form-control' value={this.props.tableOne.name}
                    placeholder='Table One' onChange={this.updateTableOneName} />
          </div>
          <div className='col-md-6'>
            <input className='form-control' value={this.props.tableOne.primaryKey}
                    placeholder='Table One primary key' onChange={this.updateTableOnePrimaryKey} />
          </div>
        </div>
        <div className={classNames}>
          <div className='col-md-6'>
            <input className='form-control' value={this.props.tableTwo.name}
                    placeholder='Table Two' onChange={this.updateTableTwoName} />
          </div>
          <div className='col-md-6'>
            <input className='form-control' value={this.props.tableTwo.primaryKey}
                    placeholder='Table Two primary key' onChange={this.updateTableTwoPrimaryKey} />
          </div>
        </div>
      </div>
    )
  }
}
