import React, { Component } from 'react';
import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import classNames from 'classnames';
import { Plus } from 'reline';

import './App.css';

const Editor = (props) => 
  <div 
    className={classNames({
      'Editor': true,
      'isActive': props.editor.active,
    })}
    onClick={props.toggle}>
    <div className="EditorHeader">{props.editor.title}</div>
    {props.editor.active && <div className="EditorCode" />}
  </div>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editors: [
        {
          title: 'code1',
          active: true,
        }, {
          title: 'code2',
          active: false,
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
