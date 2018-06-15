import React from 'react';

import './Camera.css';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window_width: 0,
      video: {
        aspectRatio: 0,
        deviceId: '',
        frameRate: 0,
        height: 0,
        width: 0
      }
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions() {
    this.setState({ window_width: window.innerWidth });
  }
  componentDidMount() {
    this.setState({ window_width: window.innerWidth });
    window.addEventListener('resize', this.updateDimensions);

    const supported = 'mediaDevices' in navigator;
    if (supported) {
      const viewPortContainer = document.getElementById('view_port_container');
      const viewPort = document.getElementById('view_port');
      const shutterBtn = document.getElementById('shutter_btn');

      const constraints = {
        video: {
          // width: { ideal: 1080 },
          // height: { ideal: 1920 },
          facingMode: 'environment'
        }
      };

      shutterBtn.onclick = () => {
        const canvas = document.createElement('canvas');

        const canvasWidth =
          viewPort.clientWidth > viewPortContainer.clientWidth
            ? viewPortContainer.clientWidth
            : viewPort.clientWidth;

        canvas.width = canvasWidth;
        canvas.height = viewPortContainer.clientHeight;

        const xOffset =
          viewPort.clientWidth > viewPortContainer.clientWidth
            ? -(viewPort.clientWidth - viewPortContainer.clientWidth) / 2
            : 0;

        const context = canvas.getContext('2d');
        context.drawImage(
          viewPort,
          xOffset,
          0,
          viewPort.clientWidth,
          viewPort.clientHeight
        );

        // const container = document.getElementById('view_port_container');

        // const img = new Image();
        // img.src = canvas.toDataURL();

        // container.innerHTML = '';

        // container.appendChild(img);

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
          });

        // viewPort.srcObject.getVideoTracks().forEach(track => track.stop());
      };

      // Attach the video stream to the video element and autoplay.

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          const mediaStreamTracks = stream.getVideoTracks();
          const mediaStreamTrack = mediaStreamTracks[0];

          const capabilities = mediaStreamTrack.getCapabilities();
          const { width, height } = capabilities;
          // this.setState({ width, height });
          // viewPort.srcObject = stream;

          return { width, height };
        })
        .then(data => {
          const { width, height } = data;
          const max = width.max > height.max ? width.max : height.max;
          const min = width.min < height.min ? width.min : height.min;
          const constraints = {
            video: {
              facingMode: 'environment',
              width: { max: window.screen.width },
              height: { ideal: viewPortContainer.clientHeight }
            }
          };

          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            viewPort.srcObject = stream;
            this.setState({
              video: stream.getVideoTracks()[0].getSettings()
            });
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.window_width !== prevState.window_width) {
      const viewPortContainer = document.getElementById('view_port_container');
      const viewPort = document.getElementById('view_port');
      if (!viewPort) return;
      const constraints = {
        video: {
          facingMode: 'environment'
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          const mediaStreamTracks = stream.getVideoTracks();
          const mediaStreamTrack = mediaStreamTracks[0];
          const capabilities = mediaStreamTrack.getCapabilities();
          const { width, height } = capabilities;
          // this.setState({ width, height });
          // viewPort.srcObject = stream;

          return { width, height };
        })
        .then(data => {
          const { width, height } = data;
          const max = width.max > height.max ? width.max : height.max;
          const min = width.min < height.min ? width.min : height.min;
          const constraints = {
            video: {
              facingMode: 'environment',
              width: { max: window.screen.width },
              height: { ideal: viewPortContainer.clientHeight }
            }
          };

          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            viewPort.srcObject = stream;
            this.setState({
              video: stream.getVideoTracks()[0].getSettings()
            });
          });
        });
    }
  }

  componentWillUnmount() {
    const viewPort = document.getElementById('view_port');
    window.removeEventListener('resize', this.updateDimensions);
    if (viewPort.srcObject) {
      viewPort.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  render() {
    return (
      <div id="camera">
        <div id="view_port_container">
          <video id="view_port" autoPlay muted />
        </div>
        <button id="shutter_btn" />
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
