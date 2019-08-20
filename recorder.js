const recordBtn = document.querySelector(".record-btn");
const player = document.querySelector(".audio-player");

// 判断是否使用音频视频
if (navigator.mediaDevices.getUserMedia) {
  var chunks = [];
  const constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(
    stream => {
      console.log("授权成功！");

      const mediaRecorder = new MediaRecorder(stream);
      //  录音开始
      recordBtn.onclick = () => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          recordBtn.textContent = "开始录音";
          console.log("录音结束");
        } else {
          mediaRecorder.start();
          console.log("录音中...");
          recordBtn.textContent = "结束录音";
        }
        console.log("录音器状态：", mediaRecorder.state);
      };

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };
      //  获取录音
      mediaRecorder.onstop = e => {
        var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        console.log(blob)
        chunks = [];
        var audioURL = window.URL.createObjectURL(blob);
        console.log(audioURL)
        player.src = audioURL;
      };
    },
    () => {
      console.error("授权失败！");
    }
  );
} else {
  console.error("浏览器不支持 getUserMedia");
}