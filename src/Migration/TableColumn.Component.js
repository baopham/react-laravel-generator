import React from 'react'
import ColumnTypeSelect from 'Migration/ColumnTypeSelect.Component'
import { BaseType as ColumnType, TYPES } from 'Migration/ColumnTypes'

export default class TableColumn extends React.Component {
  static propTypes = {
    column: React.PropTypes.instanceOf(ColumnType).isRequired,
    updateColumnInput: React.PropTypes.func.isRequired,
    removeColumn: React.PropTypes.func.isRequired
  }

  updateColumnInput = (property, value) => {
    this.props.column[property] = value
    this.props.updateColumnInput(this.props.column)
  }

  updateColumnType = (event) => {
    const newColumnData = TYPES[event.target.value](this.props.column.id, this.props.column.summary())
    this.props.updateColumnInput(newColumnData)
  }

  toggleColumnInput = (property) => {
    this.props.column[property] = !this.props.column[property]
    this.props.updateColumnInput(this.props.column)
  }

  removeColumn = (event) => {
    this.props.removeColumn(this.props.column.id)
  }

  render () {
    const booleanFields = ['unique', 'index', 'incremental', 'nullable', 'unsigned']

    return (
      <tr>
        <td>
          <input value={this.props.column.name} placeholder='Name' onChange={(event) => this.updateColumnInput('name', event.target.value)}/>
        </td>

        <td>
          <ColumnTypeSelect value={this.props.column.type} onChange={this.updateColumnType} />
        </td>

        <td>
          {this.props.column.length !== undefined &&
            <input type='number' value={this.props.column.length} onChange={(event) => this.updateColumnInput('length', event.target.value)}/>
          }
        </td>

        {booleanFields.map(field =>
          <td key={field}>
            {this.props.column[field] !== undefined &&
              <input type='checkbox' checked={this.props.column[field]} onChange={() => this.toggleColumnInput(field)}/>
            }
          </td>
        )}
        <td>
          <button className='btn btn-danger' onClick={this.removeColumn}>&times;</button>
        </td>
      </tr>
    )
  }
}
