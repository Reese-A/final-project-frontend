import React from 'react';

import './Camera.css';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth }, () => {
      console.log(this.state);
    });
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    const supported = 'mediaDevices' in navigator;
    if (supported) {
      const viewPortContainer = document.getElementById('view_port_container');
      const viewPort = document.getElementById('view_port');
      const shutterBtn = document.getElementById('shutter_btn');

      // console.log(canvas.clientWidth);

      const constraints = {
        video: {
          // width: { ideal: 1080 },
          // height: { ideal: 1920 },
          facingMode: 'environment'
        }
      };
      console.log(window.innerWidth);
      console.log(constraints);

      shutterBtn.onclick = () => {
        const canvas = document.createElement('canvas');

        canvas.width = viewPortContainer.clientWidth;
        canvas.height = viewPortContainer.clientHeight;

        const context = canvas.getContext('2d');
        context.drawImage(
          viewPort,
          0,
          0,
          viewPort.clientWidth,
          viewPort.clientHeight
        );
        console.log(canvas.toDataURL());
        const img = new Image();
        // const data = {
        //   test: 'test',
        //   img_url: canvas.toDataURL()
        // };

        const data = new FormData();
        data.append('img_url', canvas.toDataURL());

        fetch('/api/test', {
          method: 'POST',
          body: data,
          // headers: { 'content-type': 'application/json' },
          credentials: 'same-origin'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          });

        img.src = canvas.toDataURL();
        viewPortContainer.innerHTML = '';

        viewPortContainer.appendChild(img);

        canvas.toBlob(blob => {
          console.log(blob);
        });
        viewPort.srcObject.getVideoTracks().forEach(track => track.stop());
      };

      // Attach the video stream to the video element and autoplay.

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          const mediaStreamTracks = stream.getVideoTracks();
          const mediaStreamTrack = mediaStreamTracks[0];
          console.log(mediaStreamTracks);
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
          console.log(window);
          const constraints = {
            video: {
              facingMode: 'environment',
              width: { max: window.screen.width },
              height: { ideal: viewPortContainer.clientHeight }
            }
          };
          console.log(data);
          console.log(constraints);
          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            console.log(stream);
            viewPort.srcObject = stream;
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
    if (this.state.width !== prevState.width) {
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
          console.log(mediaStreamTracks);
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
          console.log(window);
          const constraints = {
            video: {
              facingMode: 'environment',
              width: { max: window.screen.width },
              height: { ideal: viewPortContainer.clientHeight }
            }
          };
          console.log(data);
          console.log(constraints);
          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            console.log(stream);
            viewPort.srcObject = stream;
          });
        });
    }
  }

  render() {
    return (
      <div id="camera">
        <div id="view_port_container">
          <video id="view_port" autoPlay muted />
        </div>
        <button id="shutter_btn" />
        <input type="file" accept="image/*" capture="environment" />
      </div>
    );
  }
}

export default Camera;
