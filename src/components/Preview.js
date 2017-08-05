import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactInterval from "react-interval";
import Frame from "react-frame-component";
import { WindowResizeListener } from "react-window-resize-listener";

import "./Preview.css";

const framerURI = "//builds.framerjs.com/version/latest/framer.js";
const coffeescriptURI =
  "//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.7.1/coffee-script.min.js";

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
          timeout={2000}
          enabled={this.props.playing}
          callback={this._reRender}
        />
        <WindowResizeListener onResize={windowSize => this._reRender()} />
        <Frame
          key={this.state.renderCount}
          className="PreviewFrame"
          initialContent={`
            <!DOCTYPE html>
            <html>
              <head>
                <script src="${framerURI}"></script>
              </head>
              <body>
                <script ${!this.props.javascript && 'type="text/coffeescript"'}>
                  ${renderCode}
                </script>
                ${!this.props.javascript &&
                  `<script src="${coffeescriptURI}"></script>`}
              </body>
            </html>`}
        >
          <span />
        </Frame>
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
