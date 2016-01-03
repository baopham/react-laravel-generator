import TestUtils from 'react-addons-test-utils'

export function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

export function content (component) {
  return component.props.children
}
