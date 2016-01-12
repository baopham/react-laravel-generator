import TestUtils from 'react-addons-test-utils'
import Table from 'Migration/Table'
import PivotTableFields from 'Migration/PivotTableFields.Component'

function findInputsForTable (inputs, table) {
  const nameInput = inputs.find(input => input.value === table.name)
  const primaryKeyInput = inputs.find(input => input.value === table.primaryKey)

  return { nameInput: nameInput, primaryKeyInput: primaryKeyInput }
}

describe('(Component) Migration/PivotTableFields', function () {
  let _props, _spies, _rendered

  beforeEach(function () {
    _spies = {}

    _props = {
      tableOne: new Table('one', 'one_id'),
      tableTwo: new Table('two', 'two_id'),
      updateTableOne: (_spies.updateTableOne = sinon.spy()),
      updateTableTwo: (_spies.updateTableTwo = sinon.spy())
    }
  })

  it('Should render inputs for table name and primary key', function () {
    _rendered = TestUtils.renderIntoDocument(<PivotTableFields {..._props} />)

    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')

    expect(inputs).to.have.length(4)

    expect(inputs.find(input => input.value === _props.tableOne.name)).to.exist

    expect(inputs.find(input => input.value === _props.tableTwo.name)).to.exist

    expect(inputs.find(input => input.value === _props.tableOne.primaryKey)).to.exist

    expect(inputs.find(input => input.value === _props.tableTwo.primaryKey)).to.exist
  })

  it('Should call updateTableOne when updating table one name', function () {
    _rendered = TestUtils.renderIntoDocument(<PivotTableFields {..._props} />)

    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')

    const { nameInput } = findInputsForTable(inputs, _props.tableOne)

    const newName = 'foo'
    _spies.updateTableOne.should.have.not.been.called
    TestUtils.Simulate.change(nameInput, { target: { value: newName } })
    _props.tableOne.name = newName
    _spies.updateTableOne.should.have.been.calledWith(_props.tableOne)
  })

  it('Should call updateTableOne when updating table one primary key', function () {
    _rendered = TestUtils.renderIntoDocument(<PivotTableFields {..._props} />)

    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')

    const { primaryKeyInput } = findInputsForTable(inputs, _props.tableOne)

    const newPrimaryKey = 'foo_id'
    _spies.updateTableOne.should.have.not.been.called
    TestUtils.Simulate.change(primaryKeyInput, { target: { value: newPrimaryKey } })
    _props.tableOne.newPrimaryKey = newPrimaryKey
    _spies.updateTableOne.should.have.been.calledWith(_props.tableOne)
  })

  it('Should call updateTableTwo when updating table two name', function () {
    _rendered = TestUtils.renderIntoDocument(<PivotTableFields {..._props} />)

    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')

    const { nameInput } = findInputsForTable(inputs, _props.tableTwo)

    const newName = 'foo'
    _spies.updateTableTwo.should.have.not.been.called
    TestUtils.Simulate.change(nameInput, { target: { value: newName } })
    _props.tableTwo.name = newName
    _spies.updateTableTwo.should.have.been.calledWith(_props.tableTwo)
  })

  it('Should call updateTableTwo when updating table two primary key', function () {
    _rendered = TestUtils.renderIntoDocument(<PivotTableFields {..._props} />)

    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')

    const { primaryKeyInput } = findInputsForTable(inputs, _props.tableTwo)

    const newPrimaryKey = 'foo_id'
    _spies.updateTableTwo.should.have.not.been.called
    TestUtils.Simulate.change(primaryKeyInput, { target: { value: newPrimaryKey } })
    _props.tableTwo.newPrimaryKey = newPrimaryKey
    _spies.updateTableTwo.should.have.been.calledWith(_props.tableTwo)
  })
})
