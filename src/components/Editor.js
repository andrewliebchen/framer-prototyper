import React from "react";
import AceEditor from "react-ace";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import { Link } from "react-router-dom";

import Icon from "./Icon";

import "./Editor.css";

import "brace/mode/coffee";
import "brace/mode/jsx";
import "../lib/tomorrow_night_eighties";

const headerHeight = 80;

const Editor = props => (
  <div className="Editor">
    <Flex
      className="EditorHeader"
      align="center"
      style={{ height: headerHeight }}
    >
      <Box className="Control" data-tip="New Frame">
        <Link to="/" target="_blank">
          <Icon name="logo" />
        </Link>
      </Box>
      <Flex align="center" style={{ marginLeft: "auto" }}>
        <Box
          className="Control"
          onClick={props.showSettings}
          data-tip="Settings"
        >
          <span className="ControlLabel">
            {props.javascript ? "Javascript" : "Coffeescript"}
          </span>
          <Icon name="cog" />
        </Box>
        <Box
          className="Control"
          onClick={props.togglePlaying}
          data-tip={props.playing ? "Pause" : "Play"}
        >
          <Icon name={props.playing ? "pause" : "play"} />
        </Box>
      </Flex>
    </Flex>
    <div className="EditorCode">
      <AceEditor
        mode={props.javascript ? "jsx" : "coffee"}
        theme="tomorrow_night_eighties"
        name="editorCode"
        value={props.code}
        onChange={event => props.handleChange(event)}
        width="50vw"
        height={`${window.innerHeight - headerHeight}px`}
        tabSize={2}
        softTabs={false}
        showInvisibles
        highlightActiveLine={false}
        highlightGutterLine={false}
        editorProps={{
          $blockScrolling: true
        }}
        style={{
          fontSize: "16px",
          fontFamily: "SF Mono",
          lineHeight: "28px"
        }}
      />
    </div>
  </div>
);

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  javascript: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
  togglePlaying: PropTypes.func,
  playing: PropTypes.bool,
  showSettings: PropTypes.func
};

export default Editor;
