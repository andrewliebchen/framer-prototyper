import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';

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

  render() {
    return (
      <Flex className="App">
        <Box auto>
          <Editor
            handleChange={(newCode) => this.setState({ code: newCode })}
            handleSyntaxChange={(newSyntax) => this.setState({ syntax: newSyntax })}
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
