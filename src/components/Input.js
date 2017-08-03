import React, { Component } from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import CopyToClipboard from "react-copy-to-clipboard";

import "./Input.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  render() {
    return (
      <Flex className="Input" align="center">
        <Box style={{ flex: "0 0 6em" }}>
          <label className="InputLabel">
            {this.props.label}
          </label>
        </Box>
        <Box style={{ flex: "1 1 auto" }}>
          <input
            className="InputField"
            type={this.props.type}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            value={this.props.value}
            disabled={this.props.disabled}
          />
          {this.props.copy &&
            <div className="InputCopy">
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

Input.defaultProps = {
  type: "text"
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  copy: PropTypes.string,
  disabled: PropTypes.bool
};

export default Input;
