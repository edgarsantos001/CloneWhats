class CameraController{
    
    constructor(videoEl){
     
      this._videoEL = videoEl;
     navigator.mediaDevices.getUserMedia({
          video:true
     }).then(stream=>{

            if ('srcObject' in this._videoEL) {
            this._videoEL.srcObject = stream; //new MediaStream();
            } else {
            // Avoid using this in new browsers, as it is going away.
            this._videoEL.src = URL.createObjectURL(mediaStream);
            }
           this._videoEL.play();
    
     }).catch(err=>{
          console.log(err);
      });
 
    }
}