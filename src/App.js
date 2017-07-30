import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import js2coffee from "./lib/js2coffee";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Modal from "./components/Modal";
import Toggle from "./components/Toggle";
import Input from "./components/Input";

import { initialState } from "./data";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      settings: false
    };
  }

  handleSyntaxChange() {
    let newCode = this.state.code;
    if (this.state.javascript) {
      // Currently is JS, need to convert to Coffeescript
      newCode = js2coffee.build(this.state.code).code;
    }

    this.setState({
      javascript: !this.state.javascript,
      code: newCode
    });
  }

  toggleSettings() {
    this.setState({ settings: !this.state.settings });
  }

  render() {
    return (
      <div>
        <Flex className="App Underlay">
          <Box auto>
            <Editor
              handleChange={newCode => this.setState({ code: newCode })}
              showSettings={this.toggleSettings.bind(this)}
              togglePlaying={() =>
                this.setState({ playing: !this.state.playing })}
              {...this.state}
            />
          </Box>
          <Box auto>
            <Preview {...this.state} />
          </Box>
        </Flex>

        <Modal
          show={this.state.settings}
          toggle={this.toggleSettings.bind(this)}
          title="Settings"
        >
          <Toggle
            on={this.state.javascript}
            onToggle={this.handleSyntaxChange.bind(this)}
            label="Use plain JavaScript"
            hint="You can convert back to Coffeescript at any time, and the code
            will convert automatically, although right now we can't
            automatically convert Coffeescript to JS."
          />
          <Input label="URL" value="http://example.com" disabled />
        </Modal>
      </div>
    );
  }
}

export default App;
