import React from 'react'
import TableColumn from 'Migration/TableColumn.Component'
import { Varchar } from 'Migration/ColumnTypes'
import uuid from 'uuid'
import styles from './Migration.scss'

export default class TableColumns extends React.Component {
  static propTypes = {
    columns: React.PropTypes.object.isRequired,
    updateColumnInput: React.PropTypes.func.isRequired,
    addColumn: React.PropTypes.func.isRequired,
    removeColumn: React.PropTypes.func.isRequired
  }

  addColumn = (event) => {
    let id = uuid.v1()
    let column = {}
    column[id] = new Varchar(id, {})
    this.props.addColumn(column)
  }

  render () {
    return (
      <div className={styles['table-columns']}>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Length</th>
              <th>Unique</th>
              <th>Index</th>
              <th>Incremental</th>
              <th>Nullable</th>
              <th>Unsigned</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.columns).map(id =>
              <TableColumn
                key={id}
                column={this.props.columns[id]}
                updateColumnInput={this.props.updateColumnInput}
                removeColumn={this.props.removeColumn} />
            )}
          </tbody>
        </table>
        <button onClick={this.addColumn} className='btn btn-primary'>+</button>
      </div>
    )
  }
}
