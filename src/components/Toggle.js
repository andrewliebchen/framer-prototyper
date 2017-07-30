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
    <Flex>
      <Box style={{ flex: "0 0 6em" }}>
        <div className="Toggle">
          <div className="ToggleHandle" />
        </div>
      </Box>
      <Box>
        <div className="ToggleLabel">
          {props.label}
        </div>
        <small className="ToggleHint">
          {props.hint}
        </small>
      </Box>
    </Flex>
  </div>;

Toggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  onToggle: PropTypes.func
};

export default Toggle;
