import { MigrationView } from 'Migration/Migration.View'
import { shallowRender, content } from 'test-utils'
import * as ColumnTypes from 'Migration/ColumnTypes'
import TableColumns from 'Migration/TableColumns.Component'
import MigrationContent from 'Migration/MigrationContent.Component'
import PivotTableFields from 'Migration/PivotTableFields.Component'
import Table from 'Migration/Table'

describe('(View) Migration', () => {
  let _component, _props, _spies, pivotTableFields

  beforeEach(() => {
    _spies = {}

    _props = {
      migration: {
        tableName: 'users',
        isPivot: false,
        tableOne: new Table('foo'),
        tableTwo: new Table('bar'),
        columns: {
          uuid: ColumnTypes.TYPES.INTEGER('uuid', { name: 'id', incremental: true })
        }
      },
      updateColumnInput: () => {},
      updateTableName: (_spies.updateTableName = sinon.spy()),
      toggleIsPivot: () => {},
      addColumn: () => {},
      removeColumn: () => {},
      updatePivotTable: (_spies.updatePivotTable = sinon.spy())
    }

    _component = shallowRender(<MigrationView {..._props} />)
  })

  it('Should render as <div>', () => {
    expect(_component.type).to.equal('div')
  })

  it('Should render an <h1> with "Migration Generator" text', () => {
    const h1 = content(_component).find(child => child.type === 'h1')

    expect(h1).to.exist
    expect(content(h1)).to.match(/Migration Generator/)
  })

  it('Should render "Pivot table?" checkbox', () => {
    const div = content(_component).find(child => child.props.className && child.props.className.includes('is-pivot'))

    expect(div).to.exist

    const input = content(div).find(child => child.type === 'input')
    expect(input.type).to.equal('input')
    expect(input.props.type).to.equal('checkbox')
    expect(input.props.checked).to.be.false

    const label = content(div).find(child => child.type === 'label')
    expect(label.type).to.equal('label')
    expect(content(label)).to.match(/Pivot table?/)
  })

  it('Should render TableColumns component', () => {
    const tableColumns = content(_component).find(child => child.type === TableColumns)

    expect(tableColumns).to.exist
    expect(tableColumns.props.columns).to.deep.equal(_props.migration.columns)
    expect(tableColumns.props.updateColumnInput).to.deep.equal(_props.updateColumnInput)
    expect(tableColumns.props.addColumn).to.deep.equal(_props.addColumn)
    expect(tableColumns.props.removeColumn).to.deep.equal(_props.removeColumn)
  })

  it('Should render MigrationContent component', () => {
    const migrationContent = content(_component).find(child => child.type === MigrationContent)
    expect(migrationContent).to.exist
    expect(migrationContent.props.migration).to.deep.equal(_props.migration)
  })

  it('Should render PivotTableFields component when isPivot is checked', () => {
    let pivotTableFields = content(_component).find(child => child.type === PivotTableFields)

    expect(pivotTableFields).to.not.exist

    _props.migration.isPivot = true

    _component = shallowRender(<MigrationView {..._props} />)

    pivotTableFields = content(_component).find(child => child.type === PivotTableFields)

    expect(pivotTableFields).to.exist
  })

  it('Should call updatePivotTable when PivotTableFields trigger its updateTableOne prop', () => {
    _props.migration.isPivot = true

    _component = shallowRender(<MigrationView {..._props} />)

    pivotTableFields = content(_component).find(child => child.type === PivotTableFields)

    const newTable = new Table('one')

    _spies.updatePivotTable.should.have.not.been.called
    pivotTableFields.props.updateTableOne(newTable)
    _spies.updatePivotTable.should.have.been.calledWith({ tableOne: newTable })
  })

  it('Should call updatePivotTable when PivotTableFields trigger its updateTableTwo prop', () => {
    _props.migration.isPivot = true

    _component = shallowRender(<MigrationView {..._props} />)

    pivotTableFields = content(_component).find(child => child.type === PivotTableFields)

    const newTable = new Table('two')

    _spies.updatePivotTable.should.have.not.been.called
    pivotTableFields.props.updateTableTwo(newTable)
    _spies.updatePivotTable.should.have.been.calledWith({ tableTwo: newTable })
  })

  it('Should call updateTableName when updating table name input', () => {
    _spies.updateTableName.should.have.not.been.called
    const tableNameDiv = content(_component).find(child => child.props.className && child.props.className.includes('table-name'))
    const tableNameInput = content(tableNameDiv).find(child => child.type === 'input')
    tableNameInput.props.onChange({ target: { value: 'new name' } })
    _spies.updateTableName.should.have.been.called
  })
})
