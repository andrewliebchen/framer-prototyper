import React from "react";
import AceEditor from "react-ace";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import classnames from "classnames";
import { Icon } from "reline";

import "./Editor.css";

import "brace/mode/coffee";
import "brace/mode/jsx";
import "brace/theme/monokai";

const headerHeight = 60;
const syntaxes = ["Coffeescript", "Javascript"];

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
        <Box className="Toggle">
          {syntaxes.map((syntax, i) =>
            <button
              key={i}
              className={classnames({ isActive: props.syntax === syntax })}
              onClick={() => props.handleSyntaxChange(syntax)}
            >
              {syntax}
            </button>
          )}
        </Box>
        <Box className="PlayControl">
          <Icon
            name={props.playing ? "diamond" : "triangle"}
            right
            onClick={props.togglePlaying}
            size={20}
            strokeWidth={1}
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
  playing: PropTypes.bool
};

export default Editor;
