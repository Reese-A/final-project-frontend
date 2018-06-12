import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends React.Component {
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
    alert(supported);
    if (supported) {
      const player = document.getElementById('player');
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const captureButton = document.getElementById('capture');

      const constraints = {
        video: true
      };

      captureButton.addEventListener('click', () => {
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        player.srcObject.getVideoTracks().forEach(track => track.stop());
      });

      // Attach the video stream to the video element and autoplay.
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        player.srcObject = stream;
      });
    }
  }

  render() {
    return (
      <main id="main">
        <video id="player" autoPlay muted />
        <button id="capture">Capture</button>
        <canvas id="canvas" width={320} height={240} />

        <input type="file" accept="image/*" capture="environment" />

        {/* MAIN */}
        <Switch>{/* <Route exact path="/" component={Home} /> */}</Switch>
      </main>
    );
  }
}

export default Main;
