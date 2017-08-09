import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactInterval from "react-interval";
import Frame from "react-frame-component";
import { WindowResizeListener } from "react-window-resize-listener";
import { Flex, Box } from "reflexbox";
import Transition from "react-transition-group/Transition";

import "./Preview.css";

const framerURI = "//builds.framerjs.com/version/latest/framer.js";
const coffeescriptURI =
  "//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.7.1/coffee-script.min.js";

const duration = 100;

const defaultStyle = {
  transform: "translateY(-100%)",
  transition: `${duration}ms cubic-bezier(0.445,  0.050, 0.550, 0.950)`
};

const transitionStyles = {
  entered: {
    transform: "translateY(0%)"
  }
};

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCount: Date.now()
    };
    this._reRender = this._reRender.bind(this);
  }

  _reRender() {
    this.setState({ renderCount: Date.now() });
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    // Not sure why the double return is necessary but...
    const renderCode = this.props.javascript
      ? this.props.code
      : `\n\n${this.props.code}`;

    return (
      <div className="Preview">
        <ReactInterval
          timeout={1000}
          enabled={this.props.playing}
          callback={this._reRender}
        />
        <WindowResizeListener onResize={windowSize => this._reRender()} />
        <Transition in={!this.props.playing} timeout={duration}>
          {state =>
            <Flex
              className="PreviewBanner"
              align="center"
              justify="center"
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <Box>Reload is paused</Box>
            </Flex>}
        </Transition>
        <Frame
          key={this.state.renderCount}
          className="PreviewFrame"
          initialContent={`
            <!DOCTYPE html>
            <html>
              <head>
                <script src="${framerURI}"></script>
                <script ${!this.props.javascript && 'type="text/coffeescript"'}>
                  ${renderCode}
                </script>
                ${!this.props.javascript &&
                  `<script src="${coffeescriptURI}"></script>`}
              </head>
              <body>
                <div></div>
              </body>
            </html>`}
        />
      </div>
    );
  }
}

Preview.propTypes = {
  code: PropTypes.string,
  playing: PropTypes.bool,
  javascript: PropTypes.bool
};

export default Preview;
