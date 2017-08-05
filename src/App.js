import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import queryString from "query-string";
import ReactTooltip from "react-tooltip";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Modal from "./components/Modal";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";

import "./App.css";

const initialCode = {
  coffeescript: `layerA = new Layer
    x: Align.center
    y: Align.center
    backgroundColor: new Color('blue').alpha(0.5)`,
  javascript: `const layerA = new Layer({
    x: Align.center,
    y: Align.center,
    backgroundColor: new Color('blue').alpha(0.5),
  });`
};

class App extends Component {
  constructor(props) {
    super(props);

    const urlParams = queryString.parse(this.props.location.search);

    this.state = {
      code: urlParams.c || initialCode.coffeescript,
      javascript: urlParams.js === "true" ? true : false,
      playing: true,
      settings: false
    };
  }

  handleSyntaxChange() {
    const { javascript } = this.state;
    this.setState({
      javascript: !javascript,
      code: initialCode[javascript ? "coffeescript" : "javascript"]
    });
  }

  toggleSettings() {
    this.setState({ settings: !this.state.settings });
  }

  _updateURI() {
    const { javascript, code } = this.state;
    this.props.history.push({
      pathname: "/",
      search: `?js=${javascript}&c=${encodeURI(code)}`
    });
  }

  _renderModalContent() {
    return (
      <span>
        <FormButton
          buttonLabel={`Switch to ${this.state.javascript
            ? "Coffeescript"
            : "Javascript"}`}
          onClick={this.handleSyntaxChange.bind(this)}
          label="Syntax"
          hint="⚠️ When you switch syntaxes, all your current code will be lost!"
        />
        <FormInput
          label="URL"
          value={window.location.href}
          copy={window.location.href}
          disabled
        />
      </span>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this._updateURI();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.settings}
        toggle={this.toggleSettings.bind(this)}
        title="Settings"
        content={this._renderModalContent()}
      >
        <ReactTooltip
          place="bottom"
          offset={{ bottom: 10 }}
          className="Tooltip"
        />
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
      </Modal>
    );
  }
}

export default App;
