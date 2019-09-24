import React from "react";
import { Field, reduxForm } from "redux-form"; // field is component , reduxForm is connnect function that we used in redux
import { sendMail } from "../../actions";
import { connect } from "react-redux";
import history from "../../history";
import { Link } from "react-router-dom";
import Wysiwyg from "../Wysiwyg";
class TemplateMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preview: true };
  }

  renderError({ error, touched }) {
    //check error
    if (touched && error) {
      return (
        <div className="ui error message mini">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input = {}, label, meta, placeholder }) => {
    const classNameError = "field"; // field ı kırmızıya boyamak
    return (
      <div className={classNameError}>
        <label className="ui label">{label}</label>
        <input placeholder={placeholder} {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    ); // input objesinin tamamını compenenetin icine esliyoruz example: onChange = fromPorps.input.onChange gibi
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
            console.log(this.state.preview);
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
            console.log(this.state.preview);
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
    console.log(formValues);
    const mail = {
      from: "mailexample09@gmail.com",
      to: formValues.reciver,
      subject: formValues.subject,
      html: formValues.content
    };
    this.props.sendMail(mail);
    history.push("/");
    //this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div className=" ui two column centered grid">
        <div className="column">
          <div className="ui piled raised   segment">
            <h2 style={{ textAlign: "center" }}>Send Mail</h2>
            <form
              className="ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="reciver"
                component={this.renderInput}
                label="Reciver"
                placeholder="to : example@xxxx.com"
              />
              <Field
                name="subject"
                component={this.renderInput}
                label="Subject"
                placeholder="Title"
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
              <button className="ui button facebook">Submit</button>
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

function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.reciver) {
    errors.reciver = " You must enter a reciver";
  }
  if (formValues.reciver) {
    if (!validateEmail(formValues.reciver)) {
      errors.reciver = " You must enter valid reciver";
    }
  }
  if (!formValues.subject) {
    errors.subject = " You must enter a subject";
  }
  if (formValues.subject) {
    if (formValues.subject.length > 30) {
      errors.subject = "subject name can't be longer than 30";
    }
  }

  if (!formValues.content) {
    errors.content = " You must enter a message";
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
