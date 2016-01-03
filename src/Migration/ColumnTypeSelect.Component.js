import React from 'react'
import { TYPES as ColumnTypes } from 'Migration/ColumnTypes'

export default class ColumnTypeSelect extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <select value={this.props.value} onChange={this.props.onChange}>
        {Object.keys(ColumnTypes).map(name =>
          <option key={name} value={name}>{name}</option>
        )}
      </select>
    )
  }
}
