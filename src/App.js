import React, { Component } from 'react';
import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import { Plus, Icon } from 'reline';
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
      {props.editor.title}
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
          right />
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
          code: 'const layerA = new Layer({x: Align.center});',
        }, {
          title: 'code2',
          active: false,
          code: '<div>Goodbye world!</div>',
        },
      ],
    };
  }

  handleToggleEditor(title) {
    const index = _.findIndex(this.state.editors, { title: title });
    const editor = this.state.editors[index];
    this.setState(dotProp.set(
      this.state, 
      `editors.${index}.active`, 
      !editor.active
    ));
  }

  handleEditorChange(title, value) {
    const index = _.findIndex(this.state.editors, { title: title });
    this.setState(dotProp.set(
      this.state, 
      `editors.${index}.code`, 
      value
    ));
  }

  addEditor() {

  }

  render() {
    return (
      <div className="App">
        <Preview code={this.state.editors[0].code} /> 
        <div className="Editors">
          {this.state.editors.map((editor, i) => 
            <Editor 
              editor={editor}
              toggle={this.handleToggleEditor.bind(this, editor.title)}
              handleChange={this.handleEditorChange.bind(this, editor.title)}
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
