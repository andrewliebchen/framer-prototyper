import React from "react";
import AceEditor from "react-ace";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import Icon from "react-geomicons";

import "./Editor.css";

import "brace/mode/coffee";
import "brace/mode/jsx";
import "brace/theme/monokai";

const headerHeight = 60;
// const syntaxes = ["Coffeescript", "Javascript"];

const Editor = props =>
  <div className="Editor">
    <Flex
      className="EditorHeader"
      align="center"
      style={{ height: headerHeight }}
    >
      <Box>
        <div className="Logo" />
      </Box>
      <Flex align="center" style={{ marginLeft: "auto" }}>
        {/* Maybe not the right mechanism? Should be hard to switch back to JS */}
        {/* <Box className="Toggle">
          {syntaxes.map((syntax, i) =>
            <button
              key={i}
              className={classnames({ isActive: props.syntax === syntax })}
              onClick={() => props.handleSyntaxChange(syntax)}
            >
              {syntax}
            </button>
          )}
        </Box> */}
        <Box className="Control">
          <Icon name="cog" onClick={props.showSettings} size={24} />
        </Box>
        <Box className="Control">
          <Icon
            name={props.playing ? "pause" : "play"}
            onClick={props.togglePlaying}
            size={24}
          />
        </Box>
      </Flex>
    </Flex>
    <div className="EditorCode">
      <AceEditor
        mode={props.syntax === "Coffeescript" ? "coffee" : "jsx"}
        theme="monokai"
        name="editorCode"
        value={props.code}
        onChange={event => props.handleChange(event)}
        width="50vw"
        height={`${window.innerHeight - headerHeight}px`}
        tabSize={2}
        softTabs={false}
        showInvisibles
        editorProps={{
          $blockScrolling: true
        }}
        style={{
          fontSize: "16px",
          fontFamily: "SF Mono",
          lineHeight: "22px"
        }}
      />
    </div>
  </div>;

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  syntax: PropTypes.oneOf(["Coffeescript", "Javascript"]).isRequired,
  handleChange: PropTypes.func,
  handleSyntaxChange: PropTypes.func,
  togglePlaying: PropTypes.func,
  playing: PropTypes.bool,
  showSettings: PropTypes.func
};

export default Editor;
