export const TYPES = {
  INTEGER: (id, definition) => new Integer(id, definition),
  BIGINT: (id, definition) => new BigInt(id, definition),
  MEDIUMINT: (id, definition) => new MediumInt(id, definition),
  SMALLINT: (id, definition) => new SmallInt(id, definition),
  TINYINT: (id, definition) => new TinyInt(id, definition),
  VARCHAR: (id, definition) => new Varchar(id, definition),
  BOOLEAN: (id, definition) => new BBoolean(id, definition),
  JSON: (id, definition) => new JJSON(id, definition),
  JSONB: (id, definition) => new JSONB(id, definition),
  DATETIME: (id, definition) => new DateTime(id, definition),
  CHAR: (id, definition) => new Char(id, definition),
  BLOB: (id, definition) => new Blob(id, definition)
}

export class BaseType {
  constructor (id, definition) {
    this.id = id

    this.name = definition.name

    this.unique = this._getDefinitionValue(definition.unique, false)

    this.unsigned = this._getDefinitionValue(definition.unsigned, false)

    this.nullable = this._getDefinitionValue(definition.nullable, false)

    this.incremental = this._getDefinitionValue(definition.incremental, false)

    this.index = this._getDefinitionValue(definition.index, false)
  }

  summary () {
    return {
      id: this.id,
      name: this.name,
      unsigned: this.unsigned,
      nullable: this.nullable,
      incremental: this.incremental,
      index: this.index
    }
  }

  _getBaseLaravelMethods () {
    var methods = []
    this.index && methods.push(`index()`)
    this.unsigned && methods.push(`unsigned()`)
    this.nullable && methods.push(`nullable()`)
    this.unique && methods.push(`unique()`)
    return methods.length ? `->` + methods.join(`->`) : ''
  }

  _getDefinitionValue (param, defaultValue) {
    return param === undefined ? defaultValue : param
  }

  get laravelMethods () {
    throw new TypeError('Must override laravelMethods getter')
  }

  get type () {
    throw new TypeError('Must override type getter')
  }
}

export class NotANumber extends BaseType {
  constructor (id, definition) {
    super(id, definition)

    this.unsigned = undefined

    this.incremental = undefined
  }
}

export class Integer extends BaseType {
  constructor (id, definition) {
    super(id, definition)

    this.length = definition.length || 10
  }

  summary () {
    let _summary = super.summary()

    _summary.length = this.length

    return _summary
  }

  get laravelMethods () {
    if (this.incremental) {
      return `increments('${this.name}')`
    }

    return `integer('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'INTEGER'
  }
}

export class Varchar extends NotANumber {
  static DEFAULT_LENGTH = 255

  constructor (id, definition) {
    super(id, definition)

    this.length = definition.length || Varchar.DEFAULT_LENGTH
  }

  summary () {
    let _summary = super.summary()

    _summary.length = this.length

    return _summary
  }

  get laravelMethods () {
    var method

    if (this.length !== Varchar.DEFAULT_LENGTH) {
      method = `string('${this.name}', ${this.length})`
    } else {
      method = `string('${this.name}')`
    }

    return method + this._getBaseLaravelMethods()
  }

  get type () {
    return 'VARCHAR'
  }
}

export class BBoolean extends NotANumber {
  get laravelMethods () {
    return `boolean('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'BOOLEAN'
  }
}

export class BigInt extends Integer {
  constructor (id, definition) {
    super(id, definition)

    this.length = undefined
  }

  get laravelMethods () {
    if (this.incremental) {
      return `bigIncrements('${this.name}')`
    }

    return `bigInteger('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'BIGINT'
  }
}

export class MediumInt extends Integer {
  constructor (id, definition) {
    super(id, definition)

    this.incremental = undefined

    this.length = undefined
  }

  get laravelMethods () {
    return `mediumInteger('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'MEDIUMINT'
  }
}

export class SmallInt extends Integer {
  constructor (id, definition) {
    super(id, definition)

    this.incremental = undefined

    this.length = undefined
  }

  get laravelMethods () {
    return `smallInteger('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'SMALLINT'
  }
}

export class TinyInt extends Integer {
  constructor (id, definition) {
    super(id, definition)

    this.incremental = undefined

    this.length = undefined
  }

  get laravelMethods () {
    return `tinyInteger('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'TINYINT'
  }
}

export class Blob extends NotANumber {
  get laravelMethods () {
    return `binary('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'BLOB'
  }
}

export class Char extends NotANumber {
  static DEFAULT_LENGTH = 4

  constructor (id, definition) {
    super(id, definition)

    this.length = definition.length || Char.DEFAULT_LENGTH
  }

  get laravelMethods () {
    return `char('${this.name}', ${this.length})` + this._getBaseLaravelMethods()
  }

  summary () {
    let _summary = super.summary()

    _summary.length = this.length

    return _summary
  }

  get type () {
    return 'CHAR'
  }
}

export class DateTime extends NotANumber {
  get laravelMethods () {
    return `dateTime('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'DATETIME'
  }
}

export class JJSON extends NotANumber {
  get laravelMethods () {
    return `json('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'JSON'
  }
}

export class JSONB extends NotANumber {
  get laravelMethods () {
    return `jsonb('${this.name}')` + this._getBaseLaravelMethods()
  }

  get type () {
    return 'JSONB'
  }
}
