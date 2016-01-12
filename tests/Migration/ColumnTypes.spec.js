import * as ColumnTypes from 'Migration/ColumnTypes'

function parentOf (instance) {
  return Object.getPrototypeOf(instance.constructor)
}

describe('(Class) Migration/ColumnTypes', function () {
  let _column

  [
    { name: 'blob', type: 'BLOB', method: `binary('blob')` },
    { name: 'json', type: 'JSON', method: `json('json')` },
    { name: 'jsonb', type: 'JSONB', method: `jsonb('jsonb')` },
    { name: 'datetime', type: 'DATETIME', method: `dateTime('datetime')` }
  ].forEach(item => {
    describe(`${item.type} column type...`, function () {
      beforeEach(function () {
        _column = ColumnTypes.TYPES[item.type](item.id, { name: item.name })
      })

      it('should be subclass of NotANumber', function () {
        expect(parentOf(_column)).to.equal(ColumnTypes.NotANumber)
      })

      it(`should have type ${item.type}`, function () {
        expect(_column.type).to.equal(item.type)
      })

      it('should have correct Laravel methods', function () {
        expect(_column.laravelMethods).to.equal(item.method)
      })
    })
  })

  it('Should export all available types', function () {
    expect(Object.keys(ColumnTypes.TYPES)).to.have.length(12)
    expect(ColumnTypes.TYPES.INTEGER('id', {})).to.be.an.instanceOf(ColumnTypes.Integer)
    expect(ColumnTypes.TYPES.VARCHAR('id', {})).to.be.an.instanceOf(ColumnTypes.Varchar)
    expect(ColumnTypes.TYPES.BOOLEAN('id', {})).to.be.an.instanceOf(ColumnTypes.BBoolean)
    expect(ColumnTypes.TYPES.BIGINT('id', {})).to.be.an.instanceOf(ColumnTypes.BigInt)
    expect(ColumnTypes.TYPES.MEDIUMINT('id', {})).to.be.an.instanceOf(ColumnTypes.MediumInt)
    expect(ColumnTypes.TYPES.SMALLINT('id', {})).to.be.an.instanceOf(ColumnTypes.SmallInt)
    expect(ColumnTypes.TYPES.TINYINT('id', {})).to.be.an.instanceOf(ColumnTypes.TinyInt)
    expect(ColumnTypes.TYPES.JSON('id', {})).to.be.an.instanceOf(ColumnTypes.JJSON)
    expect(ColumnTypes.TYPES.JSONB('id', {})).to.be.an.instanceOf(ColumnTypes.JSONB)
    expect(ColumnTypes.TYPES.DATETIME('id', {})).to.be.an.instanceOf(ColumnTypes.DateTime)
    expect(ColumnTypes.TYPES.CHAR('id', {})).to.be.an.instanceOf(ColumnTypes.Char)
    expect(ColumnTypes.TYPES.BLOB('id', {})).to.be.an.instanceOf(ColumnTypes.Blob)
  })

  describe('BaseType...', function () {
    it('should throw exception when extending it without implementing laravelMethods getter', function () {
      class StubClass extends ColumnTypes.BaseType {

      }

      const stub = new StubClass('id', {})

      expect(() => stub.laravelMethods).to.throw('Must override laravelMethods getter')
    })

    it('should throw exception when extending it without implementing type getter', function () {
      class StubClass extends ColumnTypes.BaseType {

      }

      const stub = new StubClass('id', {})

      expect(() => stub.type).to.throw('Must override type getter')
    })
  })

  describe('NotANumber...', function () {
    it('should set incremental and unsigned to undefined for subclasses of NotANumber', function () {
      class StubClass extends ColumnTypes.NotANumber {

      }

      const stub = new StubClass('id', {})

      expect(stub.incremental).to.not.exist
      expect(stub.unsigned).to.not.exist
    })

    it('should have correct summary for subclasses of NotANumber', function () {
      class StubClass extends ColumnTypes.NotANumber {
        get type () {
          return 'Stub'
        }
      }

      const stub = new StubClass('id', { name: 'foobar' })

      const expectedSummary = {
        id: 'id',
        name: 'foobar',
        unsigned: undefined,
        nullable: false,
        incremental: undefined,
        index: false
      }

      expect(stub.summary()).to.deep.equal(expectedSummary)
    })

    it('should have correct properties for subclasses of NotANumber', function () {
      class StubClass extends ColumnTypes.NotANumber {
        get type () {
          return 'Stub'
        }
      }

      const stub = new StubClass('id', { name: 'stubcolumn', index: true, unique: true })

      expect(stub.name).to.equal('stubcolumn')
      expect(stub.id).to.equal('id')
      expect(stub.length).to.equal(undefined)
      expect(stub.index).to.be.true
      expect(stub.unsigned).to.equal(undefined)
      expect(stub.unique).to.be.true
      expect(stub.nullable).to.be.false
      expect(stub.incremental).to.equal(undefined)
      expect(stub.type).to.equal('Stub')
    })
  })

  describe('Integer column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.Integer('foo', { name: 'amount', index: true, unsigned: true })
    })

    it('should have correct properties', function () {
      expect(_column.name).to.equal('amount')
      expect(_column.id).to.equal('foo')
      expect(_column.length).to.be.equal(10)
      expect(_column.index).to.be.true
      expect(_column.unsigned).to.be.true
      expect(_column.unique).to.be.false
      expect(_column.nullable).to.be.false
      expect(_column.incremental).to.be.false
      expect(_column.type).to.equal('INTEGER')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`integer('amount')->index()->unsigned()`)
    })

    it('should give correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'amount',
        unsigned: true,
        nullable: false,
        incremental: false,
        index: true,
        length: 10
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })
  })

  describe('Varchar column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.Varchar('foo', { name: 'email', index: true })
    })

    it('should have correct properties', function () {
      expect(_column.name).to.equal('email')
      expect(_column.id).to.equal('foo')
      expect(_column.length).to.be.equal(255)
      expect(_column.index).to.be.true
      expect(_column.unsigned).to.be.equal(undefined)
      expect(_column.unique).to.be.false
      expect(_column.nullable).to.be.false
      expect(_column.incremental).to.be.equal(undefined)
      expect(_column.type).to.equal('VARCHAR')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`string('email')->index()`)

      _column = new ColumnTypes.Varchar('foo', { name: 'email', unique: true, length: 36 })

      expect(_column.laravelMethods).to.equal(`string('email', 36)->unique()`)
    })

    it('should give correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'email',
        unsigned: undefined,
        nullable: false,
        incremental: undefined,
        index: true,
        length: 255
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })
  })

  describe('Char column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.Char('foo', { name: 'username' })
    })

    it('should be subclass of NotANumber', function () {
      expect(parentOf(_column)).to.equal(ColumnTypes.NotANumber)
    })

    it('should have type CHAR', function () {
      expect(_column.type).to.equal('CHAR')
    })

    it('should have correct length', function () {
      expect(_column.length).to.equal(4)
      _column = new ColumnTypes.Char('foo', { name: 'username', length: 5 })
      expect(_column.length).to.equal(5)
    })

    it('should have correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'username',
        unsigned: undefined,
        nullable: false,
        incremental: undefined,
        index: false,
        length: 4
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`char('username', 4)`)
      _column = new ColumnTypes.Char('foo', { name: 'username', length: 5 })
      expect(_column.laravelMethods).to.equal(`char('username', 5)`)
    })
  })

  describe('Boolean column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.BBoolean('foo', { name: 'private', nullable: true })
    })

    it('should be subclass of NotANumber', function () {
      expect(parentOf(_column)).to.equal(ColumnTypes.NotANumber)
    })

    it('should have type BOOLEAN', function () {
      expect(_column.type).to.equal('BOOLEAN')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`boolean('private')->nullable()`)

      _column = new ColumnTypes.BBoolean('foo', { name: 'private' })

      expect(_column.laravelMethods).to.equal(`boolean('private')`)
    })
  })

  describe('BigInt column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.BigInt('foo', { name: 'count' })
    })

    it('should have correct properties', function () {
      expect(_column.name).to.equal('count')
      expect(_column.id).to.equal('foo')
      expect(_column.length).to.be.equal(undefined)
      expect(_column.index).to.be.false
      expect(_column.unsigned).to.be.false
      expect(_column.unique).to.be.false
      expect(_column.nullable).to.be.false
      expect(_column.incremental).to.be.false
      expect(_column.type).to.equal('BIGINT')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`bigInteger('count')`)

      _column = new ColumnTypes.BigInt('foo', { name: 'count', incremental: true })

      expect(_column.laravelMethods).to.equal(`bigIncrements('count')`)
    })

    it('should give correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'count',
        unsigned: false,
        nullable: false,
        incremental: false,
        index: false,
        length: undefined
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })
  })

  describe('MediumInt column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.MediumInt('foo', { name: 'count' })
    })

    it('should have correct properties', function () {
      expect(_column.name).to.equal('count')
      expect(_column.id).to.equal('foo')
      expect(_column.length).to.be.equal(undefined)
      expect(_column.index).to.be.false
      expect(_column.unsigned).to.be.false
      expect(_column.unique).to.be.false
      expect(_column.nullable).to.be.false
      expect(_column.incremental).to.be.equal(undefined)
      expect(_column.type).to.equal('MEDIUMINT')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`mediumInteger('count')`)
    })

    it('should give correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'count',
        unsigned: false,
        nullable: false,
        incremental: undefined,
        index: false,
        length: undefined
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })
  })

  describe('SmallInt column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.SmallInt('foo', { name: 'count' })
    })

    it('should have correct properties', function () {
      expect(_column.name).to.equal('count')
      expect(_column.id).to.equal('foo')
      expect(_column.length).to.be.equal(undefined)
      expect(_column.index).to.be.false
      expect(_column.unsigned).to.be.false
      expect(_column.unique).to.be.false
      expect(_column.nullable).to.be.false
      expect(_column.incremental).to.be.equal(undefined)
      expect(_column.type).to.equal('SMALLINT')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`smallInteger('count')`)
    })

    it('should give correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'count',
        unsigned: false,
        nullable: false,
        incremental: undefined,
        index: false,
        length: undefined
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })
  })

  describe('TinyInt column type...', function () {
    beforeEach(function () {
      _column = new ColumnTypes.TinyInt('foo', { name: 'count' })
    })

    it('should have correct properties', function () {
      expect(_column.name).to.equal('count')
      expect(_column.id).to.equal('foo')
      expect(_column.length).to.be.equal(undefined)
      expect(_column.index).to.be.false
      expect(_column.unsigned).to.be.false
      expect(_column.unique).to.be.false
      expect(_column.nullable).to.be.false
      expect(_column.incremental).to.be.equal(undefined)
      expect(_column.type).to.equal('TINYINT')
    })

    it('should have correct Laravel methods', function () {
      expect(_column.laravelMethods).to.equal(`tinyInteger('count')`)
    })

    it('should give correct summary', function () {
      const expectedSummary = {
        id: 'foo',
        name: 'count',
        unsigned: false,
        nullable: false,
        incremental: undefined,
        index: false,
        length: undefined
      }

      expect(_column.summary()).to.deep.equal(expectedSummary)
    })
  })
})
