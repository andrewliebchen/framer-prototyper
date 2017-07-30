import React from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";

import "./Input.css";

const Input = props =>
  <Flex className="Input" align="center">
    <Box style={{ flex: "0 0 6em" }}>
      <label className="InputLabel">
        {props.label}
      </label>
    </Box>
    <Box style={{ flex: "1 1 auto" }}>
      <input className="InputField" {...props} />
    </Box>
  </Flex>;

Input.defaultProps = {
  type: "text"
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
};

export default Input;
