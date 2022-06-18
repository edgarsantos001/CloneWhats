import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {
    constructor(){
    
        super();
        this._mimetype = 'audio/webm';
         this._available = false;

         navigator.mediaDevices.getUserMedia({
          audio:true
     }).then(stream=>{
         this._available = true;
         
         this.__stream = stream; 

         this.trigger('ready', this.__stream)

     }).catch(err=>{
          console.log(err);
      });
    }

     stop(){
      this.__stream.getTracks().forEach(track=>{
        track.stop();
      });
    }
    
    isAvailable(){
        return this._available;
    }

    startRecorder(){
        if(this.isAvailable()){
           this._mediaRecorder = new MediaRecorder(this.__stream,{
               mimeType: this._mimetype
           } );
           
           this._recordedChunks=[];

           this._mediaRecorder.addEventListener('dataavailable', e=>{
               if(e.data.size > 0) this._recordedChunks.push(e.data);

           });

           this._mediaRecorder.addEventListener('stop', e => {
             
             let blob = new Blob(this._recordedChunks, {
                 type: this._mimetype
             })
            let filename = `rec${Date.now()}.webm`
             
            let file = new File([blob], filename, {
                 type:this._mimetype,
                 lastModified: Date.now()
             });
             console.log('file', file);

             let reader = new FileReader();
             reader.onload = e=> {
                  console.log('reader file', file);
                  let audio = new Audio(reader.result);
                  audio.play();
             }
             reader.readAsDataURL(file);
           });
           this._mediaRecorder.start();
           
        }
    }
    
    stopRecorder(){

         if(this.isAvailable()){
             this._mediaRecorder.stop();
             this.stop();
        }
    }

    startTimer(){
     let start = Date.now();
     this._recordMicrophoneInterval = setInterval(()=>{
         this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start));
     },100)
    }
        
    

    stopTimer(){
     this.el.recordMicrophone.hide();
     this.el.btnSendMicrophone.show()
     clearInterval(this._recordMicrophoneInterval);
    }

}