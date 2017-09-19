import React from "react";
import PropTypes from "prop-types";

const renderIcon = name => {
  switch (name) {
    case "cog":
      return "⚙️";
    case "play":
      return "🏃💨";
    case "pause":
      return "✋";
    case "logo":
      return "🖼🎉️";
    case "copy":
      return "👯";
    default:
      return "";
  }
};

const Icon = props => (
  <div
    className="Icon"
    style={{
      fontSize: props.size,
      lineHeight: 1,
      position: "relative",
      top: 3
    }}
    {...props}
  >
    {renderIcon(props.name)}
  </div>
);

Icon.defaultProps = {
  size: 30
};

Icon.propTypes = {
  name: PropTypes.oneOf(["cog", "pause", "play", "logo", "copy"]),
  size: PropTypes.number,
  onClick: PropTypes.func
};

export default Icon;
