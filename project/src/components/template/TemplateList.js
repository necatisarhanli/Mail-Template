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
    this.state = { idToDelete: null };
  }

  componentDidMount() {
    this.props.fetchAllTemplates();
  }

  renderCard() {
    return this.props.templates.map((template) => {
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
          <Link
            to={`/templates/use/${template._id}`}
            className="ui bottom attached button"
          >
            <i className="add icon"></i>
            Use Template
          </Link>
          <Link
            to={`/templates/edit/${template._id}`}
            className={`ui bottom attached  ${
              template.default === true ? "disabled " : " "
            } button`}
          >
            <i className="edit icon"></i>
            Edit Template
          </Link>
          <div
            style={{ fontWeight: "700" }}
            className={`ui ${
              this.state.idToDelete === template._id ? "basic  " : ""
            } ${
              template.default === true ? "disabled " : " "
            } bottom attached button`}
            onClick={() => {
              if (this.state.idToDelete === template._id) {
                this.props.deleteTemplate(template._id);
                this.setState({ idToDelete: null });
              } else {
                this.setState({ idToDelete: template._id });
              }
            }}
          >
            <i className="remove icon"></i>
            {this.state.idToDelete === template._id
              ? "Click Again to Delete"
              : "Delete Template"}
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
      return (
        <div>
          <div className="ui icon message">
            <i className="notched circle loading icon"></i>
            <div className="content">
              <div className="header">Just one second</div>
              <p>
                Create your first Template by clicking "Create New Template"
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="ui four cards">{this.renderCard()}</div>
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
