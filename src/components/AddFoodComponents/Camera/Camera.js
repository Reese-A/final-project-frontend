import React from 'react';

import './Camera.css';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window_width: 0,
      window_height: 0,
      video: {
        aspectRatio: 0,
        deviceId: '',
        frameRate: 0,
        height: 0,
        width: 0
      },
      video_elem: { width: 0, height: 0 },
      ideal_width: 0,
      ideal_height: 0,
      capabilities: {
        aspectRatio: { max: 0, min: 0 },
        deviceId: '',
        facingMode: [],
        frameRate: { max: 0, min: 1 },
        height: { max: 0, min: 1 },
        width: { max: 0, min: 1 }
      },
      foods: [],
      updated: 0,
      showShutterBtn: false
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  updateDimensions() {
    const viewPort = document.getElementById('view_port');
    this.setState({
      window_width: window.innerWidth,
      window_height: window.innerHeight
    });
  }
  componentDidMount() {
    const viewPort = document.getElementById('view_port');

    this.setState({
      window_width: window.innerWidth,
      window_height: window.innerHeight
    });
    window.addEventListener('resize', this.updateDimensions);

    const supported = 'mediaDevices' in navigator;
    if (supported) {
      const viewPortContainer = document.getElementById('view_port_container');
      const viewPort = document.getElementById('view_port');
      const shutterBtn = document.getElementById('shutter_btn');

      const constraints = {
        video: {
          facingMode: 'environment'
        }
      };

      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        const mediaStreamTracks = stream.getVideoTracks();
        const mediaStreamTrack = mediaStreamTracks[0];

        const capabilities = mediaStreamTrack.getCapabilities();
        const { width, height } = capabilities;
        console.log(capabilities);
        console.log(width, height);
        const ideal_width = width.max >= 1920 ? 1920 : width.max;
        const ideal_height = height.max >= 1080 ? 1080 : height.max;
        mediaStreamTrack
          .applyConstraints({
            width: { ideal: ideal_width },
            height: {
              ideal: ideal_height
            }
          })
          .then(() => {
            console.log(stream.getVideoTracks()[0].getSettings());
            viewPort.srcObject = stream;
            this.setState({
              ideal_width,
              ideal_height,
              window_width: window.innerWidth,
              window_height: window.innerHeight,
              video: stream.getVideoTracks()[0].getSettings(),
              capabilities,
              showShutterBtn: true
            });
          });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const viewPort = document.getElementById('view_port');
    if (viewPort) {
      const stream = viewPort.srcObject;
      if (stream) {
        if (this.state.window_width !== prevState.window_width) {
          const video = stream.getVideoTracks()[0].getSettings();
          this.setState({
            video,
            updated: this.state.updated + 1
          });
        }
      }
    }
  }

  componentWillUnmount() {
    const viewPort = document.getElementById('view_port');
    window.removeEventListener('resize', this.updateDimensions);
    if (viewPort && viewPort.srcObject) {
      viewPort.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  handleClick(event) {
    event.preventDefault();

    const viewPortContainer = document.getElementById('view_port_container');
    const viewPort = document.getElementById('view_port');
    const canvas = document.createElement('canvas');

    const { video } = this.state;

    // if (window.matchMedia('(orientation: portrait)').matches) {
    if (window.innerWidth < window.innerHeight) {
      const scale =
        viewPortContainer.clientHeight / viewPortContainer.clientWidth;

      canvas.width = this.state.ideal_height;
      canvas.height = this.state.ideal_height * scale;

      const offsetY = (this.state.ideal_width - canvas.height) / 2;

      const video_context = canvas.getContext('2d');

      video_context.drawImage(
        viewPort,
        0,
        offsetY,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    } else {
      const scale =
        viewPortContainer.clientWidth / viewPortContainer.clientHeight;
      canvas.width = video.height * scale;
      canvas.height = video.height;

      const offsetX = (video.width - canvas.width) / 2;

      const video_context = canvas.getContext('2d');
      video_context.drawImage(
        viewPort,
        offsetX,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    const data = new FormData();
    const uri = canvas.toDataURL().split('base64,')[1];

    data.append('img_url', uri);

    fetch('/api/images', {
      method: 'POST',
      body: data,
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(this.props);

        this.props.setSlideDownOptions(data.foods);
        this.props.showSlideDown();

        // this.props.toggleSlideDown();

        this.setState({ foods: data.foods }, () => {
          console.log(this.state);
        });
      });

    // const img = new Image();
    // img.src = canvas.toDataURL();
    // viewPortContainer.innerHTML = '';
    // viewPortContainer.appendChild(img);
    // viewPort.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  render() {
    return (
      <div id="camera">
        <div id="view_port_container" onClick={this.props.toggleSlideDown}>
          <video id="view_port" autoPlay playsInline muted />
        </div>

        {this.state.showShutterBtn ? (
          <button id="shutter_btn" onClick={this.handleClick} />
        ) : null}

        {/* <div>
          <span>{this.state.video.width}</span>x
          <span>{this.state.video.height}</span>::
          <span>{this.state.capabilities.width.max}</span>x
          <span>{this.state.capabilities.height.max}</span>::
          <span>{this.state.updated}</span>
        </div> */}
        {/* <input
          id="file_input"
          type="file"
          accept="image/*"
          capture="environment"
        /> */}
      </div>
    );
  }
}

export default Camera;
