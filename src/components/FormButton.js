import React from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";

import "./FormButton.css";

const FormButton = props =>
  <Flex className="Form">
    <Box style={{ flex: "0 0 6em" }}>
      <label className="FormLabel">
        {props.label}
      </label>
    </Box>
    <Box style={{ flex: "1 1 auto" }}>
      <button className="FormButton" onClick={props.onClick}>
        {props.buttonLabel}
      </button>
      {props.hint &&
        <small>
          {props.hint}
        </small>}
    </Box>
  </Flex>;

FormButton.propTypes = {
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
  hint: PropTypes.string
};

export default FormButton;
