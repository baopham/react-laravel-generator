import React from 'react'
import { connect } from 'react-redux'
import TableColumns from 'Migration/TableColumns.Component'
import MigrationContent from 'Migration/MigrationContent.Component'
import { actions } from 'Migration/Migration.Redux'
import PivotTableFields from 'Migration/PivotTableFields.Component'

const mapStateToProps = (state) => ({
  migration: state.migration
})

export class MigrationView extends React.Component {
  static propTypes = {
    migration: React.PropTypes.object.isRequired,
    updateColumnInput: React.PropTypes.func.isRequired,
    updateTableName: React.PropTypes.func.isRequired,
    toggleIsPivot: React.PropTypes.func.isRequired,
    addColumn: React.PropTypes.func.isRequired,
    removeColumn: React.PropTypes.func.isRequired,
    updatePivotTable: React.PropTypes.func.isRequired
  }

  updateTableName = (event) => {
    this.props.updateTableName(event.target.value.trim())
  }

  updatePivotTableOne = (table) => {
    this.props.updatePivotTable({ tableOne: table })
  }

  updatePivotTableTwo = (table) => {
    this.props.updatePivotTable({ tableTwo: table })
  }

  render () {
    const { isPivot, tableName, columns } = this.props.migration

    return (
      <div className='container'>
        <h1>Migration Generator</h1>
        <div className='form-group is-pivot'>
          <input type='checkbox' id='is-pivot' checked={isPivot} onClick={this.props.toggleIsPivot}/>
          &nbsp;
          <label htmlFor='is-pivot'>Pivot table?</label>
        </div>

        {!isPivot &&
          <div className='form-group table-name'>
            <label>Table Name</label>
            <input type='text' className='form-control' placeholder='users'
                  value={tableName} onChange={this.updateTableName}/>
          </div>
        }

        {!isPivot &&
          <TableColumns
            columns={columns}
            updateColumnInput={this.props.updateColumnInput}
            addColumn={this.props.addColumn}
            removeColumn={this.props.removeColumn} />
        }

        {isPivot &&
          <PivotTableFields tableOne={this.props.migration.tableOne}
                            tableTwo={this.props.migration.tableTwo}
                            updateTableOne={this.updatePivotTableOne}
                            updateTableTwo={this.updatePivotTableTwo} />
        }

        <MigrationContent migration={this.props.migration} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(MigrationView)
