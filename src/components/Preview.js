import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactInterval from 'react-interval';
import Frame from 'react-frame-component';

import LinkIcon from './LinkIcon';

import './Preview.css';

const framerContent = (code) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="//builds.framerjs.com/version/latest/framer.js"></script>
      </head>
      <body>
        <script>${code}</script>
      </body>
    </html>
  `;
}

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now(),
      playing: false,
    };
  }

  render() {
    // Maybe use shouldComponentUpdate and interval to prevent flashes
    return (
      <div className="Preview">
        <ReactInterval 
          timeout={2000} 
          enabled={this.state.playing}
          callback={() => this.setState({timer: Date.now()})} />
        <div className="PreviewControls">
          <LinkIcon 
            className="PreviewControl"
            name={this.state.playing ? 'diamond' : 'triangle'}
            onClick={() => this.setState({ playing: !this.state.playing })}
            right />
        </div>
        <Frame 
          key={this.state.timer}
          className="PreviewFrame" 
          initialContent={framerContent(this.props.code)}> 
          <span>hi</span>
        </Frame>
      </div>
    );
  }
} 

Preview.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
};

export default Preview;