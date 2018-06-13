import React from 'react';

import './Camera.css';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const fileInput = document.getElementById('file-input');
    // fileInput.addEventListener('change', e =>
    //   doSomethingWithFiles(e.target.files)
    // );
    const supported = 'mediaDevices' in navigator;
    if (supported) {
      const viewPort = document.getElementById('view_port');

      const shutterBtn = document.getElementById('shutter_btn');

      // console.log(canvas.clientWidth);

      const constraints = {
        audio: false,
        video: {
          facingMode: 'environment'
        }
      };

      shutterBtn.onclick = () => {
        // Draw the video frame to the canvas.
        const canvas = document.createElement('canvas');

        canvas.width = viewPort.clientWidth;
        canvas.height = viewPort.clientHeight;

        const context = canvas.getContext('2d');
        context.drawImage(viewPort, 0, 0, canvas.width, canvas.height);
        console.log(context);
        console.log(canvas.toDataURL());
        const camera = document.getElementById('camera');
        const img = new Image();

        img.src = canvas.toDataURL();
        camera.innerHTML = '';

        camera.appendChild(img);

        canvas.toBlob(blob => {
          console.log(blob);
        });
        // viewPort.srcObject.getVideoTracks().forEach(track => track.stop());
      };

      // Attach the video stream to the video element and autoplay.
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        viewPort.srcObject = stream;
        // view_port.play();
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
