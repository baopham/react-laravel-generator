import ReactDOM from 'react-dom'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { shallowRender, content } from 'test-utils'
import PageTitle from 'components/PageTitle'

describe('(Component) PageTitle', () => {
  let _rendered, _props

  beforeEach(() => {
    _props = {
      title: 'Page Title'
    }
  })

  afterEach(() => {
    document.title = ''
  })

  it('Should render <h1> with correct text', () => {
    _rendered = TestUtils.renderIntoDocument(<PageTitle {..._props} />)

    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1')

    expect(h1).to.exist
    expect(h1.textContent).to.equal(_props.title)
  })

  it('Should set document.title to correct text', () => {
    TestUtils.renderIntoDocument(<PageTitle {..._props} />)

    expect(document.title).to.equal(_props.title)
  })

  it('Should reset document.title when component unmounts', () => {
    const container = document.createElement('div')

    ReactDOM.render(<PageTitle {..._props} />, container)
    expect(document.title).to.equal(_props.title)
    ReactDOM.unmountComponentAtNode(container)
    expect(document.title).to.equal('')
  })
})
