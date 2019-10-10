import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import Wysiwyg from "../Wysiwyg";
class TemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preview: true };
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error mini message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const classNameError = "field "; // field ı kırmızıya boyamak
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderInputArea = ({ input, label, meta }) => {
    const classNameError = "field"; // field ı kırmızıya boyamak
    ///
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>
        <div
          onClick={() => {
            this.setState({ preview: !this.state.preview });
            this.forceUpdate();
          }}
          className="ui button white"
          style={{ margin: "10px", float: "left" }}
        >
          preview
        </div>
        <Wysiwyg {...input} i18n={{}} helper={input}></Wysiwyg>
        {this.renderError(meta)}
      </div>
    );
  };

  renderInputAreaHtml = ({ input, label, meta }) => {
    const classNameError = "field"; // field ı kırmızıya boyamak
    ///
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>
        <div
          onClick={() => {
            this.setState({ preview: !this.state.preview });
            this.forceUpdate();
          }}
          className="ui button white"
          style={{ margin: "10px", float: "left" }}
        >
          original
        </div>
        <textarea className="disable" {...input}></textarea>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div className=" ui two column centered grid">
        <div className="column">
          <div className="ui piled raised  segment">
            <h2 style={{ textAlign: "center" }}>{this.props.name}</h2>
            <form
              className="ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="templateName"
                component={this.renderInput}
                label="Template Name"
              />
              <Field
                name="subject"
                component={this.renderInput}
                label="Subject"
              />

              <Field
                name="content"
                component={
                  this.state.preview
                    ? this.renderInputArea
                    : this.renderInputAreaHtml
                }
                label="Content"
              />

              <button
                className="ui google plus button"
                style={{ marginTop: "10px" }}
              >
                Submit
              </button>

              <Link to="/" className="ui button grey">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.subject) {
    errors.subject = " You must enter a subject";
  }
  if (formValues.subject) {
    if (formValues.subject.length > 20) {
      errors.subject = "subject name can't be longer than 20";
    }
  }
  if (!formValues.templateName) {
    errors.templateName = "You must enter a Template name";
  }

  if (formValues.templateName) {
    if (formValues.templateName.length > 20) {
      errors.templateName = " Template name can't be longer than 20 ";
    }
  }
  if (!formValues.content) {
    errors.content = " You must enter a message";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate
})(TemplateForm);
