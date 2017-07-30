import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import js2coffee from "./lib/js2coffee";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Modal from "./components/Modal";
import Toggle from "./components/Toggle";

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

  handleSyntaxChange(newSyntax) {
    let newCode = this.state.code;
    if (newSyntax === "Coffeescript") {
      newCode = js2coffee.build(this.state.code).code;
    }

    this.setState({
      syntax: newSyntax,
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
              handleSyntaxChange={this.handleSyntaxChange.bind(this)}
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
            on={this.state.syntax === "Javascript"}
            onToggle={() => this.setState({ syntax: "Coffeescript" })}
            label="Use plain ole JavaScript"
            hint="You're going to have to re-write your code in JS. You can convert
            back to Coffeescript at any time, and the code will convert
            automatically."
          />
        </Modal>
      </div>
    );
  }
}

export default App;
