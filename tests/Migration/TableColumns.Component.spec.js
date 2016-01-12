import TableColumns from 'Migration/TableColumns.Component'
import TableColumn from 'Migration/TableColumn.Component'
import { shallowRender, content } from 'test-utils'
import * as ColumnTypes from 'Migration/ColumnTypes'

function table (component) {
  return content(component)[0]
}

function button (component) {
  return content(component)[1]
}

function headers (component) {
  const _table = table(component)
  const thead = content(_table).find(child => child.type === 'thead')
  const tr = content(thead)
  return content(tr)
}

describe('(Component) Migration/TableColumns', function () {
  let _component, _props, _spies

  beforeEach(function () {
    _spies = {}

    _props = {
      columns: {
        uuid: ColumnTypes.TYPES.INTEGER('uuid', {}),
        uuid2: ColumnTypes.TYPES.VARCHAR('uuid2', {})
      },
      updateColumnInput: function () {},
      addColumn: (_spies.addColumn = sinon.spy()),
      removeColumn: function () {}
    }

    _component = shallowRender(<TableColumns {..._props} />)
  })

  it('Should render table and an Add button', function () {
    expect(_component.type).to.equal('div')
    expect(_component.props.children).to.have.length(2)

    expect(table(_component).type).to.equal('table')
    expect(button(_component).type).to.equal('button')
    expect(button(_component).props.children).to.equal('+')
  })

  it('Should render TableColumn component', function () {
    const _table = table(_component)

    const tbody = _table.props.children.find(child => child.type === 'tbody')

    const tableColumnRows = tbody.props.children.filter(child => child.type === TableColumn)

    expect(tableColumnRows).to.have.length(2)
  })

  it('Should call addColumn when clicking the Add button', function () {
    _spies.addColumn.should.have.not.been.called
    button(_component).props.onClick()
    _spies.addColumn.should.have.been.called
  })

  it('Should render correct table headers', function () {
    const _headers = headers(_component)
    expect(_headers).to.have.length(8)
    const headerLabels = ['Name', 'Type', 'Length', 'Unique', 'Index', 'Incremental', 'Nullable', 'Unsigned']

    headerLabels.forEach((label, i) => {
      const th = _headers[i]
      expect(content(th)).to.equal(label)
    })
  })
})
