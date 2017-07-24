import React, { Component } from 'react';
import { Provider } from 'rebass';
import { Flex, Box } from 'reflexbox'

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
      <Provider>
        <Flex className="App">
          <Box auto>
            <Editor 
              code={this.state.code}
              handleChange={(newCode) => this.setState({ code: newCode })} />
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
