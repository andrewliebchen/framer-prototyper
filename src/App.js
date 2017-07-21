import React, { Component } from 'react';
import dotProp from 'dot-prop-immutable';
import { push } from '@immutable-array/push';
import { splice } from '@immutable-array/splice';
import _ from 'lodash';
import { Icon } from 'reline';

import Editor from './components/Editor';
import Preview from './components/Preview';

import { initialState } from './data';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  editorIndex(title) {
    return _.findIndex(this.state.editors, { title: title });
  }

  handleToggleEditor(title) {
    this.setState(dotProp.toggle(
      this.state, 
      `editors.${this.editorIndex(title)}.active`
    ));
  }

  handleEditorChange(title, value) {
    this.setState(dotProp.set(
      this.state, 
      `editors.${this.editorIndex(title)}.code`, 
      value
    ));
  }

  handleEditorDelete(title, event) {
    event.stopPropagation();
    this.setState({
      editors: splice(
        this.state.editors, 
        this.editorIndex(title),
        1
      )
    });
  }

  handleTitleChange(title, event) {
    // This doesn't work so well
    event.stopPropagation();
    this.setState(dotProp.set(
      this.state, 
      `editors.${this.editorIndex(title)}.title`,
      event.target.value
    ));
  } 

  addEditor() {
    this.setState({
      editors: push(this.state.editors, {
        title: Date.now(),
        active: true,
        code: '',
      })
    });
  }

  prototypeCode() {
    let code = this.state.editors.map((editor) => {
      return editor.code;
    }).join('\n');

    return code;
  }

  render() {
    return (
      <div className="App">
        <Preview 
          code={this.prototypeCode()}
          name={this.state.name} /> 
        <div className="Editors">
          {this.state.editors.map((editor, i) => 
            <Editor 
              editor={editor}
              handleToggle={this.handleToggleEditor.bind(this, editor.title)}
              handleChange={this.handleEditorChange.bind(this, editor.title)}
              handleDelete={this.handleEditorDelete.bind(this, editor.title)}
              handleTitleChange={this.handleTitleChange.bind(this, editor.title)}
              canDelete={this.state.editors.length > 1}
              key={editor.title} />
          )}
          <Icon
            className="EditorsAdd"
            name="plus"
            onClick={this.addEditor.bind(this)} 
            strokeWidth={2} />
        </div>
      </div>
    );
  }
}

export default App;
