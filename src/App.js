import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import queryString from "query-string";
import ReactTooltip from "react-tooltip";
import cookie from "react-cookies";

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
      modal: false
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
    switch (this.state.modal) {
      case "settings":
        return (
          <div>
            <FormButton
              buttonLabel={`Switch to ${this.state.javascript
                ? "Coffeescript"
                : "Javascript"}`}
              onClick={this.handleSyntaxChange.bind(this)}
              label="Syntax"
              hint={
                <p>
                  <b>Warning!</b> Switching syntaxes can not be undone. All your
                  current code will be lost!
                </p>
              }
            />
            <FormInput
              label="URL"
              value={window.location.href}
              copy={window.location.href}
              disabled
            />
          </div>
        );
      case "welcome":
        return (
          <div>
            <p>
              <span role="img" aria-label="logo">
                🖼 🎉
              </span>{" "}
              (pronounced “Framer Fun”) is a great way to create and share small
              experiments in FramerJS. Want to try out that new idea you had in
              the shower? Try it here!
            </p>
            <p>
              As long as you save the URL, you can always come back to it…No
              user accounts, no saving!
            </p>
            <button
              className="ModalButton"
              onClick={() => this.setState({ modal: false })}
            >
              Get Started
            </button>
          </div>
        );
      default:
        return <div />;
    }
  }

  _setWelcomeCookie() {
    cookie.save("welcomeSeen", "true");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this._updateURI();
    }
  }

  componentWillMount() {
    this.setState({
      modal: cookie.load("welcomeSeen") ? false : "welcome"
    });
  }

  render() {
    return (
      <Modal
        show={this.state.modal ? true : false}
        close={() => {
          if (this.state.modal === "welcome") {
            this._setWelcomeCookie();
          }
          this.setState({ modal: false });
        }}
        title={this.state.modal ? this.state.modal : null}
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
              showSettings={() => this.setState({ modal: "settings" })}
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
