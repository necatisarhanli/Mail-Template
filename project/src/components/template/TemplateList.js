import React from "react";
import { connect } from "react-redux";
import {
  fetchAllTemplates,
  useTemplate,
  deleteTemplate,
  editTemplate
} from "../../actions";
import { Link } from "react-router-dom";
class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { idToDelete: null, big: false };
  }

  componentDidMount() {
    this.props.fetchAllTemplates();
  }

  renderCard(list) {
    return list.map((template) => {
      console.log(this.props.showDefault);
      if (!this.props.showDefault && template.default) {
        return null;
      }
      return (
        <div
          key={template._id}
          className={`card ${template.default === true ? "green " : " "}${
            template.fav ? "yellow " : " "
          }  ${!template.fav && !template.default ? "blue " : " "}`}
        >
          <div className="content">
            <i
              onClick={() => {
                this.props.editTemplate(template._id, {
                  ...template,
                  fav: !template.fav
                });
              }}
              className={`right floated ${
                template.fav ? "yellow " : ""
              } star icon  ${template.default ? "invisible " : " "}`}
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
                  template.default === true ? "disabled " : " "
                } button`}
              >
                <i className="edit icon"></i>
              </Link>
              <div
                data-tooltip={
                  this.state.idToDelete === template._id
                    ? "Are you sure ?"
                    : "Delete "
                }
                className={`ui ${
                  template.default === true ? "disabled " : " "
                } bottom button`}
                onClick={() => {
                  if (this.state.idToDelete === template._id) {
                    this.props.deleteTemplate(template._id);
                    this.setState({ idToDelete: null });
                  } else {
                    this.setState({ idToDelete: template._id });
                  }
                }}
              >
                <i
                  className={`${
                    this.state.idToDelete === template._id
                      ? "orange remove "
                      : "remove "
                  }icon`}
                ></i>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    if (
      this.props.templates.length === 0 ||
      (this.props.templates.length === 3 && !this.props.showDefault)
    ) {
      this.props.templates.sort((a, b) => {
        return a.fav || b.fav;
      });
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
                By clicking " Show Default Templates " you can see templates we
                created for you.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="ui four cards">
          {this.renderCard(
            // sorting done here by comparing if the template fav'd or not
            this.props.templates.sort((a, b) => {
              if (a.fav === true) return -1;
              else if (b.fav === true) return 1;
              else return 0;
            })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state = {}) => {
  return {
    templates: Object.values(state.templates),
    mail: state.mail,
    showDefault: state.default.isDefault
  };
};

export default connect(
  mapStateToProps,
  { fetchAllTemplates, useTemplate, deleteTemplate, editTemplate }
)(TemplateList);
