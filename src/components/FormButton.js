import React from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";

import "./FormButton.css";

const FormButton = props =>
  <Flex className="Form" column>
    <Box>
      <label className="FormLabel">
        {props.label}
      </label>
      {props.hint}
    </Box>
    <Box>
      <button className="FormButton" onClick={props.onClick}>
        {props.buttonLabel}
      </button>
    </Box>
  </Flex>;

FormButton.propTypes = {
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
  hint: PropTypes.string
};

export default FormButton;
