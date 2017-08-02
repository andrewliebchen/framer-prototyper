import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
// import js2coffee from "./lib/js2coffee";
import queryString from "query-string";
import ReactTooltip from "react-tooltip";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Modal from "./components/Modal";
import Toggle from "./components/Toggle";
import Input from "./components/Input";

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
      javascript: urlParams.js ? true : false,
      playing: false,
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
        <Toggle
          on={this.state.javascript}
          onToggle={this.handleSyntaxChange.bind(this)}
          label="Use plain JavaScript"
          hint="⚠️ When you switch syntaxes, all your current code will be lost!"
        />
        <Input label="URL" value="http://framer.fun/" disabled />
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
