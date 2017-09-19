import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import queryString from "query-string";
import ReactTooltip from "react-tooltip";
import { Helmet } from "react-helmet";

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

const heapCode = `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
heap.load(3699475241);`;

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
                  <b>Warning!</b> Switching syntaxes will reset your current
                  work. This can not be undone!
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
      default:
        return <div />;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this._updateURI();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.modal ? true : false}
        close={() => this.setState({ modal: false })}
        title={this.state.modal ? this.state.modal : null}
        content={this._renderModalContent()}
      >
        <Helmet>
          <title>🖼🎉 Framer is fun</title>
          <script type="text/javascript">{heapCode}</script>
        </Helmet>
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
