import React from 'react'
import { connect } from 'react-redux'
import {
  fetchAllTemplates,
  useTemplate,
  deleteTemplate,
  editTemplate,
} from '../../actions'
import { Link } from 'react-router-dom'
import Card from '../common/Card'
class TemplateList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllTemplates()
  }

  renderCard(list) {
    return list.map((template) => {
      console.log(this.props.showDefault)
      if (!this.props.showDefault && template.default) {
        return null
      }
      return <Card template={template} />
    })
  }
  render() {
    if (
      this.props.templates.length === 0 ||
      (this.props.templates.length === 3 && !this.props.showDefault)
    ) {
      this.props.templates.sort((a, b) => {
        return a.fav || b.fav
      })
      return (
        <div>
          <div className="ui icon message">
            <i className="notched circle loading icon"></i>
            <div className="content">
              <div className="header">Just one second</div>
              <p>
                Create your first Template by clicking " Create New Template ".
              </p>
              <p>
                {this.props.showDefault === false
                  ? "By clicking 'Show Default Templates ' you can see templates we created for you."
                  : 'Sorry there is no default template at the moment'}
              </p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="ui four cards">
          {this.renderCard(
            // sorting done here by comparing if the template fav'd or not
            this.props.templates.sort((a, b) => {
              if (a.fav === true) return -1
              else if (b.fav === true) return 1
              else return 0
            })
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state = {}) => {
  return {
    templates: Object.values(state.templates),
    mail: state.mail,
    showDefault: state.default.isDefault,
  }
}

export default connect(mapStateToProps, {
  fetchAllTemplates,
  useTemplate,
  deleteTemplate,
  editTemplate,
})(TemplateList)
