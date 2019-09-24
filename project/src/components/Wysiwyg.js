import React, { Component } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
class Wysiwyg extends Component {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      value:
        this.props.value === ""
          ? RichTextEditor.createEmptyValue()
          : RichTextEditor.createValueFromString(this.props.value, "html"),
      typing: false,
      typingTimeOut: 0
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === "") {
      // eslint-disable-next  -line react/no-set-state
      this.setState({
        ...this.state,
        value: RichTextEditor.createEmptyValue()
      });
    }
  }

  onChange(value) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    // 0.25sec timeout for sending text value to redux state for performance
    // eslint-disable-next-line react/no-set-state
    this.setState({
      value: value,
      typing: false,
      typingTimeout: setTimeout(() => {
        let isEmpty = !value
          .getEditorState()
          .getCurrentContent()
          .hasText();
        let val = isEmpty ? "" : value.toString("html");
        this.props.onChange(val);
      }, 150)
    });
  }

  render() {
    const { value } = this.state;
    //Pass down i18n object to localise labels
    const { i18n, onBlur } = this.props;
    console.log(i18n);
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: [
        "INLINE_STYLE_BUTTONS",
        "BLOCK_TYPE_BUTTONS",
        "HISTORY_BUTTONS",
        "LINK_BUTTONS",
        "BLOCK_TYPE_DROPDOWN"
      ],
      INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
      ],

      BLOCK_TYPE_BUTTONS: [
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" },
        { label: "Blockquote", style: "blockquote" }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: "Normal", style: "unstyled" },
        { label: "H1", style: "header-one" },
        { label: "H2", style: "header-two" },
        { label: "H3", style: "header-three" }
      ]
    };
    //in next version to allow resizing on the fly
    return (
      <div>
        <RichTextEditor
          editorStyle={{ background: "white", height: "150px" }}
          value={value}
          onChange={this.onChange}
          onBlur={onBlur}
          toolbarConfig={toolbarConfig}
        />
      </div>
    );
  }
}

export default Wysiwyg;
