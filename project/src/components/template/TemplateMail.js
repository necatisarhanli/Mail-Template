import React from "react";
import { Field, reduxForm } from "redux-form"; // field is component , reduxForm is connnect function that we used in redux
import { sendMail } from "../../actions";
import { connect } from "react-redux";
import history from "../../history";
import { Link } from "react-router-dom";
class TemplateMail extends React.Component {
  //buraya meta yı gönderdik
  constructor(props) {
    super(props);
    this.state = { a: null };
  }

  renderError({ error, touched }) {
    //check error
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input = {}, label, meta }) => {
    const classNameError = `field ${meta.error && meta.touched ? "error" : ""}`; // field ı kırmızıya boyamak
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    ); // input objesinin tamamını compenenetin icine esliyoruz example: onChange = fromPorps.input.onChange gibi
  };

  renderInputArea = ({ input, label, meta }) => {
    const classNameError = `field ${meta.error && meta.touched ? "error" : ""}`; // field ı kırmızıya boyamak
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>

        <textarea {...input}></textarea>
        {this.renderError(meta)}
      </div>
    ); // input objesinin tamamını compenenetin icine esliyoruz example: onChange = fromPorps.input.onChange gibi
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    const mail = {
      from: "mailexample09@gmail.com",
      to: formValues.reciver,
      subject: formValues.subject,
      text: formValues.content
    };
    this.props.sendMail(mail);
    history.push("/");
    //this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div className=" ui two column centered grid">
        <div className="column">
          <div className="ui segment">
            <h2 style={{ textAlign: "center" }}>Send Mail</h2>
            <form
              className="ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="reciver"
                component={this.renderInput}
                label="Reciver"
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
              <button className="ui button primary">Submit</button>
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

const formWrapped = reduxForm({
  form: "mailForm",
  validate: validate
})(TemplateMail);

export default connect(
  null, // mapStateToProp
  { sendMail } // action creater
)(formWrapped);
