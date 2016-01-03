import { shallowRender, content as c } from 'test-utils'
import TableColumn from 'Migration/TableColumn.Component'
import { Integer, Varchar, BBoolean } from 'Migration/ColumnTypes'
import ColumnTypeSelect from 'Migration/ColumnTypeSelect.Component'

describe('(Component) Migration/TableColumn', () => {
  let _component, _children, _props, _spies

  beforeEach(() => {
    _spies = {}

    _props = {
      column: new Integer('foo', { name: 'name', index: true, nullable: true, unsigned: false }),
      updateColumnInput: (_spies.updateColumnInput = sinon.spy()),
      removeColumn: (_spies.removeColumn = sinon.spy())
    }

    _component = shallowRender(<TableColumn {..._props} />)
    _children = _component.props.children
  })

  it('Should render as <tr>', () => {
    expect(_component.type).to.equal('tr')
  })

  it('Should render correct text and select fields', () => {
    expect(c(_children[0]).type).to.equal('input')
    expect(c(_children[0]).props.value).to.equal('name')

    expect(c(_children[1]).type).to.equal(ColumnTypeSelect)
    expect(c(_children[1]).props.value).to.equal('INTEGER')

    expect(c(_children[2]).type).to.equal('input')
    expect(c(_children[2]).props.type).to.equal('number')
  })

  it('Should have the 3rd child component as an array for 5 boolean fields', () => {
    expect(_children[3]).to.be.an('array')

    const booleanFields = _children[3]

    expect(booleanFields).to.have.length(5)
  })

  it('Should render the remove button', () => {
    const button = c(_children[4])
    expect(button.type).to.equal('button')
    expect(button.props.className).to.equal('btn btn-danger')
  })

  it('Should call removeColumn with the id when clicking the remove button', () => {
    const id = 'foo'
    const button = c(_children[4])

    _spies.removeColumn.should.have.not.been.called
    button.props.onClick()
    _spies.removeColumn.should.have.been.calledWith(id)
  })

  it('Should call updateColumnInput when updating a text field', () => {
    const newName = 'bar'
    const nameField = c(_children[0])

    _spies.updateColumnInput.should.have.not.been.called
    nameField.props.onChange({ target: { value: newName } })
    _props.column.name = newName
    _spies.updateColumnInput.should.have.been.calledWith(_props.column)
  })

  it('Should call updateColumnInput when updating column type', () => {
    const id = 'foo'
    const newType = 'BOOLEAN'
    const newColumnData = new BBoolean(id, _props.column.summary())
    const columnTypeSelect = c(_children[1])

    _spies.updateColumnInput.should.have.not.been.called
    columnTypeSelect.props.onChange({ target: { value: newType } })
    _spies.updateColumnInput.should.have.been.calledWith(newColumnData)
  })

  it('Should call updateColumnInput when updating a number field', () => {
    const newValue = 256
    const numberField = c(_children[2])

    _spies.updateColumnInput.should.have.not.been.called
    numberField.props.onChange({ target: { value: newValue } })
    _props.column.length = newValue
    _spies.updateColumnInput.should.have.been.calledWith(_props.column)
  })

  it('Should not show length field if the type is BOOLEAN', () => {
    _props = { ..._props, column: new BBoolean('foo', {}) }
    _component = shallowRender(<TableColumn {..._props} />)
    _children = c(_component)

    const numberField = c(_children[2])

    expect(numberField).to.be.false
  })

  it('Should call updateColumnInput when updating a checkbox', () => {
    const booleanFields = _children[3]
    const uniqueCheckbox = c(booleanFields[0])

    _spies.updateColumnInput.should.have.not.been.called
    uniqueCheckbox.props.onChange()
    _props.column.unique = true
    _spies.updateColumnInput.should.have.been.calledWith(_props.column)
  })

  describe('Boolean fields for INTEGER type...', () => {
    let booleanFields

    beforeEach(() => {
      booleanFields = _children[3]
    })

    it('should render the first checkbox for "Unique" property', () => {
      expect(c(booleanFields[0]).type).to.equal('input')
      expect(c(booleanFields[0]).props.type).to.equal('checkbox')
      expect(c(booleanFields[0]).props.checked).to.be.false
    })

    it('should render the second checkbox for "Index" property', () => {
      expect(c(booleanFields[1]).type).to.equal('input')
      expect(c(booleanFields[1]).props.type).to.equal('checkbox')
      expect(c(booleanFields[1]).props.checked).to.be.true
    })

    it('should render the third checkbox for "Incremental" property', () => {
      expect(c(booleanFields[2]).type).to.equal('input')
      expect(c(booleanFields[2]).props.type).to.equal('checkbox')
      expect(c(booleanFields[2]).props.checked).to.be.false
    })

    it('should render the fourth checkbox for "Nullable" property', () => {
      expect(c(booleanFields[3]).type).to.equal('input')
      expect(c(booleanFields[3]).props.type).to.equal('checkbox')
      expect(c(booleanFields[3]).props.checked).to.be.true
    })

    it('should render the fifth checkbox for "Unsigned" property', () => {
      expect(c(booleanFields[4]).type).to.equal('input')
      expect(c(booleanFields[4]).props.type).to.equal('checkbox')
      expect(c(booleanFields[4]).props.checked).to.be.false
    })
  })

  describe('Boolean fields for VARCHAR type...', () => {
    let booleanFields

    beforeEach(() => {
      _props = {
        column: new Varchar('foo', { name: 'name', index: true, nullable: true, unsigned: false }),
        updateColumnInput: () => {},
        removeColumn: () => {}
      }
      _component = shallowRender(<TableColumn {..._props} />)
      _children = _component.props.children
      booleanFields = _children[3]
    })

    it('should render the first checkbox for "Unique" property', () => {
      expect(c(booleanFields[0]).type).to.equal('input')
      expect(c(booleanFields[0]).props.type).to.equal('checkbox')
      expect(c(booleanFields[0]).props.checked).to.be.false
    })

    it('should render the second checkbox for "Index" property', () => {
      expect(c(booleanFields[1]).type).to.equal('input')
      expect(c(booleanFields[1]).props.type).to.equal('checkbox')
      expect(c(booleanFields[1]).props.checked).to.be.true
    })

    it('should not render the third checkbox for "Incremental" property', () => {
      expect(c(booleanFields[2])).to.be.false
    })

    it('should render the fourth checkbox for "Nullable" property', () => {
      expect(c(booleanFields[3]).type).to.equal('input')
      expect(c(booleanFields[3]).props.type).to.equal('checkbox')
      expect(c(booleanFields[3]).props.checked).to.be.true
    })

    it('should not render the fifth checkbox for "Unsigned" property', () => {
      expect(c(booleanFields[4])).to.be.false
    })
  })
})
