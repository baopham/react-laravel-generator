import { connect } from 'react-redux'

export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Laravel Generator written with React Redux</h1>
      </div>
    )
  }
}

export default connect()(HomeView)
