import React, { Component } from 'react';
import { Provider } from 'rebass';
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
      syntax: 'coffeescript',
    };
  }

  render() {
    return (
      <Provider>
        <Flex className="App">
          <Box auto>
            <Editor 
              handleChange={(newCode) => this.setState({ code: newCode })}
              handleSyntaxChange={(newSyntax) => this.setState({ syntax: newSyntax })} 
              {...this.state} />
          </Box>
          <Box auto>
            <Preview code={this.state.code} /> 
          </Box>
        </Flex>
      </Provider>
    );
  }
}

export default App;
