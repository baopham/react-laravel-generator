import {
  MIGRATION_UPDATE_TABLE_NAME,
  MIGRATION_UPDATE_COLUMN_INPUT,
  MIGRATION_TOGGLE_IS_PIVOT,
  MIGRATION_ADD_COLUMN,
  MIGRATION_REMOVE_COLUMN,
  MIGRATION_UPDATE_PIVOT_TABLE
} from 'Migration/Migration.Redux'
import reducer from 'Migration/Migration.Redux'
import { Integer, Varchar } from 'Migration/ColumnTypes'
import Table from 'Migration/Table'

describe('(Redux) Migration', () => {
  let beforeState, afterState, defaultState

  beforeEach(() => {
    defaultState = {
      tableName: 'users',
      isPivot: false,
      columns: {
        primary: new Integer('primary', {})
      }
    }
  })

  it('Should update column data when MIGRATION_UPDATE_COLUMN_INPUT is created', () => {
    beforeState = defaultState

    const newColumnData = new Varchar('primary', {})

    afterState = { ...defaultState, columns: { primary: newColumnData } }

    expect(reducer(beforeState, {
      type: MIGRATION_UPDATE_COLUMN_INPUT,
      payload: newColumnData
    })).to.deep.equal(afterState)
  })

  it('Should update table name when MIGRATION_UPDATE_TABLE_NAME action is created', () => {
    beforeState = defaultState

    afterState = { ...defaultState, tableName: 'roles' }

    expect(reducer(beforeState, {
      type: MIGRATION_UPDATE_TABLE_NAME,
      payload: 'roles'
    })).to.deep.equal(afterState)
  })

  it('Should toggle "isPivot" when MIGRATION_TOGGLE_IS_PIVOT action is created', () => {
    beforeState = defaultState

    afterState = { ...defaultState, isPivot: true }

    expect(reducer(beforeState, {
      type: MIGRATION_TOGGLE_IS_PIVOT
    })).to.deep.equal(afterState)
  })

  it('Should add column when MIGRATION_ADD_COLUMN action is created', () => {
    beforeState = defaultState

    const newColumn = new Varchar('id2', { name: 'name' })

    afterState = {
      ...defaultState,
      columns: {
        ...beforeState.columns,
        id2: newColumn
      }
    }

    expect(reducer(beforeState, {
      type: MIGRATION_ADD_COLUMN,
      payload: { id2: newColumn }
    })).to.deep.equal(afterState)
  })

  it('Should remove column when MIGRATION_REMOVE_COLUMN action is created', () => {
    beforeState = defaultState

    afterState = { ...defaultState, columns: {} }

    expect(reducer(beforeState, {
      type: MIGRATION_REMOVE_COLUMN,
      payload: 'primary'
    })).to.deep.equal(afterState)
  })

  it('Should update pivot table when MIGRATION_UPDATE_PIVOT_TABLE action is created', () => {
    beforeState = { ...defaultState, isPivot: true }

    let newTable = new Table('one')

    afterState = { ...beforeState, tableOne: newTable }

    expect(reducer(beforeState, {
      type: MIGRATION_UPDATE_PIVOT_TABLE,
      payload: { tableOne: newTable }
    })).to.deep.equal(afterState)

    newTable = new Table('two')

    afterState = { ...beforeState, tableTwo: newTable }

    expect(reducer(beforeState, {
      type: MIGRATION_UPDATE_PIVOT_TABLE,
      payload: { tableTwo: newTable }
    })).to.deep.equal(afterState)
  })
})
