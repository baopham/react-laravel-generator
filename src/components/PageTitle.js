import React from 'react'

export default class PageTitle extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  }

  componentWillMount () {
    this.setState({ originalTitle: document.title })
    document.title = this.props.title
  }

  componentWillUnmount () {
    document.title = this.state.originalTitle
  }

  render () {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}
