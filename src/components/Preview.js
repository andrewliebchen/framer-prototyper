import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactInterval from "react-interval";
import Frame from "react-frame-component";

import "./Preview.css";

const framerURI = "//builds.framerjs.com/version/latest/framer.js";
const coffeescriptURI =
  "//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.7.1/coffee-script.min.js";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now()
    };
  }

  render() {
    const isCoffeescript = this.props.syntax === "Coffeescript";

    // Not sure why the double return is necessary but...
    const renderCode = isCoffeescript
      ? `\n\n${this.props.code}`
      : this.props.code;

    // Maybe use shouldComponentUpdate and interval to prevent flashes
    return (
      <div className="Preview">
        <ReactInterval
          timeout={2000}
          enabled={this.props.playing}
          callback={() => this.setState({ timer: Date.now() })}
        />
        <Frame
          key={this.state.timer}
          className="PreviewFrame"
          initialContent={`
            <!DOCTYPE html>
            <html>
              <head>
                <script src="${framerURI}"></script>
              </head>
              <body>
                <script ${isCoffeescript && 'type="text/coffeescript"'}>
                  ${renderCode}
                </script>
                ${isCoffeescript &&
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
  syntax: PropTypes.oneOf(["Coffeescript", "Javascript"])
};

export default Preview;
