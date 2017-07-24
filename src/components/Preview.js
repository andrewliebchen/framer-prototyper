import React, { Component } from 'react';
import _ from 'lodash';
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
      settings: false,
    };
  }

  calculateScale() {
    const windowHeight = window.innerHeight;
    const maxPreviewHeight = windowHeight * 0.7;
    const previewScale = maxPreviewHeight / this.props.size.height;
    
    return previewScale;
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
            name="burger" 
            onClick={this.props.settings}/>
          <LinkIcon 
            className="PreviewControl"
            name={this.state.playing ? 'diamond' : 'triangle'}
            onClick={() => this.setState({ playing: !this.state.playing })}
            right />
        </div>
        <div 
          className="PreviewBrowser"
          style={{ 
            transform: `translate3d(-50%, -50%, 0) scale(${this.calculateScale()})` 
          }}>
          <div className="PreviewBrowserHeader">
            {_.times(3, (i) => <div key={i} className="PreviewBrowserDot" />)}
            <span className="PreviewName">{this.props.name}</span>
          </div>
          <Frame 
            key={this.state.timer}
            className="PreviewFrame" 
            initialContent={framerContent(this.props.code)}
            style={{
              ...this.props.size,
            }}> 
            <span/>
          </Frame>
        </div>
      </div>
    );
  }
} 

Preview.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  settings: PropTypes.func,
  size: PropTypes.object,
};

export default Preview;