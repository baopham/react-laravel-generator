import { shallowRender, content } from 'test-utils'
import Navigation from 'layouts/Navigation'
import { Navbar, Nav } from 'react-bootstrap/lib'
import { IndexLink, Link } from 'react-router'

describe('(Layout) Navigation', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children: _child
    }

    _component = shallowRender(<Navigation {..._props} />)
  })

  it('Should render as a Navbar', function () {
    expect(_component.type).to.equal(Navbar)
  })

  it('Should render Nav with list of links', function () {
    const nav = content(_component).find(child => child.type === Nav)

    expect(nav).to.exist

    const li = content(nav)

    expect(li.type).to.equal('li')

    const link = content(li)
    expect(link.type).to.equal(Link)
    expect(link.props.to).to.equal('/migration')
  })

  it('Should render Navbar.Brand with link to index', function () {
    const header = content(_component).find(child => child.type === Navbar.Header)

    const brand = content(header)

    const brandLink = content(brand)

    expect(brandLink.type).to.equal(IndexLink)
    expect(brandLink.props.to).to.equal('/')
  })
})
