import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import classnames from 'classnames';

import './Editor.css';

import 'brace/mode/jsx';
import 'brace/theme/monokai';

const headerHeight = 60;
const syntaxes = ['Coffeescript', 'Javascript'];

const Editor = (props) => 
  <div className="Editor">
    <Flex 
      className="EditorHeader"
      align="center"
      style={{ height: headerHeight }}>
      <Box className="Toggle">
        {syntaxes.map((syntax, i) => 
          <button 
            key={i}
            className={classnames({'isActive': props.syntax === syntax})}
            onClick={() => props.handleSyntaxChange(syntax)}>
            {syntax}
          </button>
        )}
      </Box>
      <Box style={{marginLeft: 'auto'}}>
        <button>Share</button>
      </Box>
    </Flex>
    <div className="EditorCode">
      <AceEditor
        mode="jsx"
        theme="monokai"
        name="editorCode"
        value={props.code}
        onChange={(event) => props.handleChange(event)}
        width="50vw"
        height={`${window.innerHeight - headerHeight}px`}
        tabSize={2}
        editorProps={{
          $blockScrolling: true
        }}
        style={{
          fontSize: '16px',
          fontFamily: 'SF Mono',
          lineHeight: '22px',
        }}/>
    </div>
  </div>

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  syntax: PropTypes.oneOf(['Coffeescript', 'Javascript']).isRequired,
  handleChange: PropTypes.func,
  handleSyntaxChange: PropTypes.func,
};

export default Editor;