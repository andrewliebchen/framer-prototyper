import React from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import classNames from "classnames";

import "./Toggle.css";

const Toggle = props =>
  <div
    className={classNames({
      ToggleContainer: true,
      isOn: props.on
    })}
    onClick={props.onToggle}
  >
    <Flex align="center">
      <Box className="Toggle">
        <div className="ToggleHandle" />
      </Box>
      <Box>
        {props.label}
      </Box>
    </Flex>
    <small className="ToggleHint">
      {props.hint}
    </small>
  </div>;

Toggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  onToggle: PropTypes.func
};

export default Toggle;
