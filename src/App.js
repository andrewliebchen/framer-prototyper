import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';
import js2coffee from './lib/js2coffee';

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

  handleSyntaxChange(newSyntax) {
    let newCode = this.state.code;
    if ( newSyntax === 'Coffeescript' ) {
      newCode = js2coffee.build(this.state.code).code;
    }

    this.setState({
      syntax: newSyntax,
      code: newCode,
    });
  }

  render() {
    return (
      <Flex className="App">
        <Box auto>
          <Editor
            handleChange={(newCode) => this.setState({ code: newCode })}
            handleSyntaxChange={this.handleSyntaxChange.bind(this)}
            togglePlaying={() => this.setState({ playing: !this.state.playing })}
            {...this.state} />
        </Box>
        <Box auto>
          <Preview {...this.state} />
        </Box>
      </Flex>
    );
  }
}

export default App;
