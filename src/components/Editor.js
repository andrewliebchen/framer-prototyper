import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

import './Editor.css';

import 'brace/mode/jsx';
import 'brace/theme/monokai';

const Editor = (props) => 
  <div className="Editor">
    <div className="EditorCode">
      <AceEditor
        mode="jsx"
        theme="monokai"
        name="editorCode"
        value={props.code}
        onChange={(event) => props.handleChange(event)}
        width="50vw"
        height="100vh"
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
  handleChange: PropTypes.func,
};

export default Editor;