import React from "react";
import { connect } from "react-redux";
import { createTemplate } from "../../actions";

import TemplateForm from "./TemplateForm";
class TemplateCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createTemplate(formValues);
    console.log(formValues);
  };
  render() {
    return (
      <div>
        <TemplateForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}
export default connect(
  null, // mapStateToProp
  { createTemplate } // action creater
)(TemplateCreate);
