import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import migration from 'Migration/Migration.Redux'

export default combineReducers({
  counter,
  migration,
  router
})
