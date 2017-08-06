import React, { Component } from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import CopyToClipboard from "react-copy-to-clipboard";

import "./FormInput.css";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  render() {
    return (
      <Flex className="Form" column>
        <Box>
          <label className="FormLabel">
            {this.props.label}
          </label>
        </Box>
        <Box style={{ position: "relative" }}>
          <input
            className="FormInput"
            type={this.props.type}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            value={this.props.value}
            disabled={this.props.disabled}
          />
          {this.props.copy &&
            <div className="FormCopy">
              <CopyToClipboard
                text={this.props.copy}
                onCopy={() => {
                  this.setState({ copied: true });
                  setTimeout(() => this.setState({ copied: false }), 4000);
                }}
              >
                <span>
                  {this.state.copied ? "Copied!" : "Copy"}
                </span>
              </CopyToClipboard>
            </div>}
        </Box>
      </Flex>
    );
  }
}

FormInput.defaultProps = {
  type: "text"
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  copy: PropTypes.string,
  disabled: PropTypes.bool
};

export default FormInput;
