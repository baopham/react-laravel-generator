import CoreLayout from 'layouts/CoreLayout'
import Navigation from 'layouts/Navigation'
import { shallowRender, content } from 'test-utils'

describe('(Layout) Core', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children: _child
    }

    _component = shallowRender(<CoreLayout {..._props} />)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })

  it('Should render Navigation', function () {
    const viewContent = content(_component)

    const navigation = content(viewContent).find(child => child.type === Navigation)

    expect(navigation).to.exist
  })
})
