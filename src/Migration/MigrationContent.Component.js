import React from 'react'
import MigrationGenerator from 'Migration/MigrationGenerator'

export default class MigrationContent extends React.Component {
  static propTypes = {
    migration: React.PropTypes.object.isRequired
  }

  render () {
    const generator = new MigrationGenerator(this.props.migration)

    const content = generator.getContent()

    return (
      <div>
        <pre>{content}</pre>
      </div>
    )
  }
}
