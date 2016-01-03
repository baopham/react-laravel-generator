export default class Table {
  constructor (name, primaryKey) {
    this.name = name
    this.primaryKey = primaryKey || 'id'
  }
}
