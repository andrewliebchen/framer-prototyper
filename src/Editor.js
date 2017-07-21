import React from 'react';
import ContentEditable from 'react-contenteditable';
import AceEditor from 'react-ace';
import classNames from 'classnames';
import _ from 'lodash';
import { Icon } from 'reline';
import PropTypes from 'prop-types';

import './Editor.css';

import 'brace/mode/jsx';
import 'brace/theme/monokai';

const Editor = (props) => 
  <div 
    className={classNames({
      'Editor': true,
      'isActive': props.editor.active,
    })}>
    <div 
      className="EditorHeader"
      onClick={props.handleToggle}>
      <ContentEditable 
        html={props.editor.title}
        className="EditorTitle"
        onChange={(event) => props.handleTitleChange(event)} />
      <Icon 
        name="x" 
        className="EditorAction" 
        size={12} 
        strokeWidth={2}
        onClick={props.handleDelete} />
    </div>
    <div className="EditorCode">
      <AceEditor
        mode="jsx"
        theme="monokai"
        name={_.camelCase(props.editor.title)}
        value={props.editor.code}
        onChange={(event) => props.handleChange(event)}
        width="40vw"
        height="50vh"
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
  editor: PropTypes.object.isRequired,
  handleTitleChange: PropTypes.func,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Editor;