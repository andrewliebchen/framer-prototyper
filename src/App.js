import React, { Component } from 'react';
import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import { Plus } from 'reline';

import './App.css';
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
      onClick={props.toggle}>
      {props.editor.title}
    </div>
    <div className="EditorCode">
      <AceEditor
        mode="jsx"
        theme="monokai"
        name={_.camelCase(props.editor.title)}
        defaultValue={props.editor.code}
        onChange={() => console.log('hi')}
        width="40vw"
        height="50vh"
        tabSize={2}
        focus
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editors: [
        {
          title: 'code1',
          active: true,
          code: '<div>Hello world!</div>'
        }, {
          title: 'code2',
          active: false,
          code: '<div>Goodbye world!</div>'
        },
      ],
    };
  }

  handleToggleEditor(title) {
    const index = _.findIndex(this.state.editors, { title: title });
    const editor = this.state.editors[index];
    this.setState(dotProp.set(this.state, `editors.${index}.active`, !editor.active));
  }

  addEditor() {

  }

  render() {
    return (
      <div className="App">
        <div className="Preview"></div>
        <div className="Editors">
          {this.state.editors.map((editor, i) => 
            <Editor 
              editor={editor}
              toggle={this.handleToggleEditor.bind(this, editor.title)}
              key={editor.title} />
          )}
          <Plus
            onClick={this.addEditor.bind(this)} 
            style={{
              position: 'absolute',
              right: '1em',
              bottom: '1em',
            }}/>
        </div>
      </div>
    );
  }
}

export default App;
