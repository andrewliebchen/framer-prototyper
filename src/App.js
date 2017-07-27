import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';

import Editor from './components/Editor';
import Preview from './components/Preview';

import { initialState } from './data';

import './App.css';

// Ugh, why do I have to do this?
const js2coffee = window.js2coffee;

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
      // Have to add in this extra comment for some reason
      newCode = `# This is coffeescript\n\n${js2coffee.build(this.state.code).code}`;
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
