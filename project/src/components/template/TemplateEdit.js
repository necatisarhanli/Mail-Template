import React from "react";
import _ from "lodash";
import TemplateForm from "./TemplateForm";
import { connect } from "react-redux";
import { fetchSingleTemplate, editTemplate } from "../../actions";

class TemplateEdit extends React.Component {
  componentWillMount() {
    this.props.fetchSingleTemplate(this.props.match.params.id);
  }

  onSubmit = (fromValues) => {
    this.props.editTemplate(this.props.match.params.id, fromValues);
  };
  render() {
    if (!this.props.template) {
      return <div>Loading..</div>;
    }
    return (
      <div>
        <TemplateForm
          name="Edit A Template"
          onSubmit={this.onSubmit}
          initialValues={_.pick(
            this.props.template,
            "templateName",
            "subject",
            "content"
          )}
        ></TemplateForm>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const idOfTemplate = ownProps.match.params.id;
  return { template: state.templates[idOfTemplate] };
};
export default connect(
  mapStateToProps,
  { fetchSingleTemplate, editTemplate }
)(TemplateEdit);
