import TestUtils from 'react-addons-test-utils'
import { shallowRender } from 'test-utils'
import ColumnTypeSelect from 'Migration/ColumnTypeSelect.Component'
import { TYPES } from 'Migration/ColumnTypes'

describe('(Component) Migration/ColumnTypeSelect', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}

    _props = {
      value: 'INTEGER',
      onChange: (_spies.onChange = sinon.spy())
    }
  })

  it('Should render as <select> with all available type options', function () {
    _component = shallowRender(<ColumnTypeSelect {..._props} />)

    expect(_component.type).to.equal('select')

    const options = _component.props.children.filter(child => child.type === 'option')

    const types = Object.keys(TYPES)

    expect(options).to.have.length(types.length)

    options.map(option => {
      expect(types).to.include(option.props.value)
      expect(types).to.include(option.props.children)
    })
  })

  it('Should call onChange when an option is selected', function () {
    _rendered = TestUtils.renderIntoDocument(<ColumnTypeSelect {..._props} />)

    const select = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'select')

    _spies.onChange.should.have.not.been.called
    TestUtils.Simulate.change(select)
    _spies.onChange.should.have.been.called
  })

  it('Should select correct default value', function () {
    const defaultValue = 'BOOLEAN'

    _props = { ..._props, value: defaultValue }

    _component = shallowRender(<ColumnTypeSelect {..._props} />)

    expect(_component.props.value).to.equal(_props.value)
  })
})
