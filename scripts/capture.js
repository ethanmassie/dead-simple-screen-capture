const captureOutput = document.getElementById('capture-output');
const startCaptureBtn = document.getElementById('start-capture');
const stopCaptureBtn = document.getElementById('stop-capture');

async function startCapture() {
  stopCapture();
  captureOutput.srcObject = await navigator.mediaDevices
    .getDisplayMedia({
      video: true,
      audio: false,
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

function stopCapture() {
  if (!captureOutput.srcObject) {
    return;
  }

  let tracks = captureOutput.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  captureOutput.srcObject = null;
}

startCaptureBtn.addEventListener('click', startCapture);
stopCaptureBtn.addEventListener('click', stopCapture);
