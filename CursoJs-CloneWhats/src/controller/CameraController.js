export class CameraController{
    
    constructor(videoEl){
      this._videoEL = videoEl;
     navigator.mediaDevices.getUserMedia({
          video:true
     }).then(stream=>{
            if ('srcObject' in this._videoEL) {
            this._videoEL.srcObject = stream; //new MediaStream();
            } else {
            // Avoid using this in new browsers, as it is going away.
            this._videoEL.src = URL.createObjectURL(stream);  
          }
          this.__stream = stream 
           this._videoEL.play();
     }).catch(err=>{
          console.log(err);
      });
    }

    stop(){
      this.__stream.getTracks().forEach(track=>{
        track.stop();
      });
    }

    takePicture(mimeType = 'image/png')
    {
     let canvas = document.createElement('canvas');
     canvas.setAttribute('height', this._videoEL.videoHeight);
     canvas.setAttribute('width',this._videoEL.videoWidth);

     let context = canvas.getContext('2d');
     context.drawImage(this._videoEL, 0, 0, canvas.width, canvas.height);
     return canvas.toDataURL(mimeType);
    }
}