import { createAction, handleActions } from 'redux-actions'
import { Integer } from './ColumnTypes'
import Table from './Table'
import uuid from 'uuid'

// ------------------------------------
// Constants
// ------------------------------------
export const MIGRATION_UPDATE_COLUMN_INPUT = 'MIGRATION_UPDATE_COLUMN_INPUT'

export const MIGRATION_UPDATE_TABLE_NAME = 'MIGRATION_UPDATE_TABLE_NAME'

export const MIGRATION_TOGGLE_IS_PIVOT = 'MIGRATION_TOGGLE_IS_PIVOT'

export const MIGRATION_ADD_COLUMN = 'MIGRATION_ADD_COLUMN'

export const MIGRATION_REMOVE_COLUMN = 'MIGRATION_REMOVE_COLUMN'

export const MIGRATION_UPDATE_PIVOT_TABLE = 'MIGRATION_UPDATE_PIVOT_TABLE'

// ------------------------------------
// Actions
// ------------------------------------
export const updateColumnInput = createAction(MIGRATION_UPDATE_COLUMN_INPUT)

export const updateTableName = createAction(MIGRATION_UPDATE_TABLE_NAME)

export const toggleIsPivot = createAction(MIGRATION_TOGGLE_IS_PIVOT)

export const addColumn = createAction(MIGRATION_ADD_COLUMN)

export const removeColumn = createAction(MIGRATION_REMOVE_COLUMN)

export const updatePivotTable = createAction(MIGRATION_UPDATE_PIVOT_TABLE)

export const actions = {
  updateColumnInput,
  updateTableName,
  toggleIsPivot,
  addColumn,
  removeColumn,
  updatePivotTable
}

// ------------------------------------
// Reducer
// ------------------------------------
const id = uuid.v1()
const columns = {}
columns[id] = new Integer(id, { incremental: true, name: 'id' })

const defaultState = {
  tableName: 'users',
  isPivot: false,
  tableOne: new Table('tableOne'),
  tableTwo: new Table('tableTwo'),
  columns: columns
}

export default handleActions({
  [MIGRATION_UPDATE_COLUMN_INPUT]: (state, { payload }) => {
    let column = {}
    column[payload.id] = payload

    return {
      ...state,
      columns: { ...state.columns, ...column }
    }
  },

  [MIGRATION_UPDATE_TABLE_NAME]: (state, { payload }) => {
    return {
      ...state,
      tableName: payload
    }
  },

  [MIGRATION_TOGGLE_IS_PIVOT]: (state, { payload }) => {
    return {
      ...state,
      isPivot: !state.isPivot
    }
  },

  [MIGRATION_ADD_COLUMN]: (state, { payload }) => {
    return {
      ...state,
      columns: { ...state.columns, ...payload }
    }
  },

  [MIGRATION_REMOVE_COLUMN]: (state, { payload }) => {
    let columns = { ...state.columns }
    delete columns[payload]

    return {
      ...state,
      columns: columns
    }
  },

  [MIGRATION_UPDATE_PIVOT_TABLE]: (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }
}, defaultState)
