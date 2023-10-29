import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser'
import * as RecordRTC from 'recordrtc'

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  content: string = '';
  recording: boolean = false;
  record : any;
  audioBlob: Blob | null = null;
  url: any;
  error: any;
  audioPlayer: HTMLAudioElement | null = null;  @Output() contentEmitter = new EventEmitter();
  @ViewChild('messageForm') messageForm: NgForm | undefined;

  constructor(private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

 
  toggleRecording() {
    
    if (!this.recording) {
      // Implement audio recording logic here
      let mediaConstraints = {
        video: false,
        audio: true,
      };
        navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this),
        this.errorCallback.bind(this));


      // Once recording is done, set audioBlob to the recorded audio (for example: this.audioBlob = recordedAudioBlob;)
    } else {

      // Implement audio stop logic here
    }
    this.recording = !this.recording;
  }

  successCallback(stream) {
    var options = {
      mimetype: 'audio/wav',
      // audioChannels: 1, // Number of audio channels
      // sampleRate: 16000, // Sample rate
    };
    var stereoAudioRecorder = RecordRTC,stereoAudioRecorder;
  
     this.record = new stereoAudioRecorder(stream, options);
  
     this.record.record();
  
    // Handle the recording logic, stop, and other actions as needed
  }


  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
    
  processRecording(blob){
    this.url = URL.createObjectURL(blob);
    console. log( 'blob', blob);
    console. log( 'url' , this.url);
    
  }
  errorCallback(error) {
    this.error='can not play audio in your browser' ;
  }

  senitize(url: string){
    return this.domSanitizer.bypassSecurityTrustHtml(url);
  }

  playAudio() {
    if (this.audioBlob) {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      }
      this.audioPlayer = new Audio(URL.createObjectURL(this.audioBlob));
      this.audioPlayer.play();
    }
  }

  deleteAudio() {
    this.audioBlob = null;
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer = null;
    }
  }

  sendMessage() {
    if (this.content.trim() !== "") {
      this.contentEmitter.emit(this.content);
    }

    this.content = '';
  }
}