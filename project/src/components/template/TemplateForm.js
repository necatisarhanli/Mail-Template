import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
class TemplateForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const classNameError = `field ${meta.error && meta.touched ? "error" : ""}`; // field ı kırmızıya boyamak
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderInputArea = ({ input, label, meta }) => {
    const classNameError = `field ${meta.error && meta.touched ? "error" : ""}`; // field ı kırmızıya boyamak
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>

        <textarea {...input}></textarea>
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
            <h2 style={{ textAlign: "center" }}>Create a Template</h2>
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
                component={this.renderInputArea}
                label="Content"
              />

              <button
                className="ui button primary"
                style={{ marginTop: "10px" }}
              >
                Submit
              </button>
              <Link to="/" className="ui button red">
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
  if (!formValues.title) {
    errors.title = " You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate
})(TemplateForm);
