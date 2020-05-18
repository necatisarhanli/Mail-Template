import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchAllTemplates,
  useTemplate,
  deleteTemplate,
  editTemplate,
} from '../../../actions'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = { idToDelete: null, big: false }
  }
  render() {
    let { template } = this.props
    return (
      <div
        key={template._id}
        className={`card ${template.default === true ? 'green ' : ' '}${
          template.fav ? 'yellow ' : ' '
        }  ${!template.fav && !template.default ? 'blue ' : ' '}`}
      >
        <div className="content">
          <i
            onClick={() => {
              this.props.editTemplate(template._id, {
                ...template,
                fav: !template.fav,
              })
            }}
            className={`right floated ${
              template.fav ? 'yellow ' : ''
            } star icon  ${template.default ? 'invisible ' : ' '}`}
          ></i>
          <div className="header">{template.templateName}</div>
          <div className="description">{template.subject}</div>
        </div>
        <div className="extra content">
          <div className=" ui icon buttons ">
            <i className="left floated inverted button ">{template.date}</i>
          </div>
          <div className="ui icon buttons right floated">
            <Link
              to={`/templates/use/${template._id}`}
              className="ui icon  button"
              data-variation="mini"
              data-tooltip="Use"
            >
              <i className="clipboard icon"></i>
            </Link>
            <Link
              data-tooltip="Edit"
              to={`/templates/edit/${template._id}`}
              className={`ui icon   ${
                template.default === true ? 'disabled ' : ' '
              } button`}
            >
              <i className="edit icon"></i>
            </Link>
            <div
              data-tooltip={
                this.state.idToDelete === template._id
                  ? 'Are you sure ?'
                  : 'Delete '
              }
              className={`ui ${
                template.default === true ? 'disabled ' : ' '
              } bottom button`}
              onClick={() => {
                if (this.state.idToDelete === template._id) {
                  this.props.deleteTemplate(template._id)
                  this.setState({ idToDelete: null })
                } else {
                  this.setState({ idToDelete: template._id })
                }
              }}
            >
              <i
                className={`${
                  this.state.idToDelete === template._id
                    ? 'orange remove '
                    : 'remove '
                }icon`}
              ></i>
            </div>
          </div>
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
})(Card)
