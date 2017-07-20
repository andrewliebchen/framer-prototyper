import React, { Component } from 'react';
import dotProp from 'dot-prop-immutable';
import { push } from '@immutable-array/push';
import { splice } from '@immutable-array/splice';
import _ from 'lodash';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import { Icon } from 'reline';
import Frame from 'react-frame-component';
import ReactInterval from 'react-interval';

import './App.css';
import 'brace/mode/jsx';
import 'brace/theme/monokai';

const framerContent = (code) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="//builds.framerjs.com/version/latest/framer.js"></script>
      </head>
      <body>
        <script>${code}</script>
      </body>
    </html>
  `;
}

const Editor = (props) => 
  <div 
    className={classNames({
      'Editor': true,
      'isActive': props.editor.active,
    })}>
    <div 
      className="EditorHeader"
      onClick={props.toggle}>
      <span className="EditorTitle">{props.editor.title}</span>
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

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now(),
      playing: false,
    };
  }

  render() {
    // Maybe use shouldComponentUpdate and interval to prevent flashes
    return (
      <div className="Preview">
        <Icon 
          className="PreviewControl"
          name={this.state.playing ? 'diamond' : 'triangle'}
          onClick={() => this.setState({playing: !this.state.playing})}
          right
          strokeWidth={2} />
        <ReactInterval 
          timeout={2000} 
          enabled={this.state.playing}
          callback={() => this.setState({timer: Date.now()})} />
        <Frame key={this.state.timer}
          className="PreviewFrame" 
          initialContent={framerContent(this.props.code)}> 
          <span/>
        </Frame>
      </div>
    );
  }
} 
  
  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editors: [
        {
          title: 'code1',
          active: true,
          code: `const layerA = new Layer({
            x: Align.center,
            y: Align.center,
            backgroundColor: new Color('blue').alpha(0.5),
          });`,
        }, {
          title: 'code2',
          active: false,
          code: 'console.log("Howdy!")',
        },
      ],
    };
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

  editorIndex(title) {
    return _.findIndex(this.state.editors, { title: title });
  }

  addEditor() {
    this.setState({
      editors: push(this.state.editors, {
        title: 'New',
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
        <Preview code={this.prototypeCode()} /> 
        <div className="Editors">
          {this.state.editors.map((editor, i) => 
            <Editor 
              editor={editor}
              toggle={this.handleToggleEditor.bind(this, editor.title)}
              handleChange={this.handleEditorChange.bind(this, editor.title)}
              handleDelete={this.handleEditorDelete.bind(this, editor.title)}
              key={editor.title} />
          )}
          <Icon
            name="plus"
            onClick={this.addEditor.bind(this)} 
            strokeWidth={2}
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
