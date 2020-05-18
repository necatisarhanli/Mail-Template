import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { defaultTemplate } from '../../../actions'
const Menu = (props) => {
  return (
    <div className="ui three cards">
      <Link
        to="/templates/use"
        onClick={() => {
          console.log('deneme')
        }}
        className="ui blue  card"
      >
        <div className="content">
          <div className="header">New Mail</div>
        </div>
      </Link>
      <Link
        to="/"
        onClick={() => {
          props.defaultTemplate(!props.isDefault)
        }}
        className="ui green card"
      >
        <div className="content">
          <div className="header">
            {`${props.isDefault ? 'Hide ' : 'Show '}`} Default Templates
          </div>
        </div>
      </Link>
      <Link to="/templates/new" className="ui red  card">
        <div className="content">
          <div className="header">Create New Template</div>
        </div>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isDefault: state.default.isDefault,
  }
}

export default connect(mapStateToProps, { defaultTemplate })(Menu)
