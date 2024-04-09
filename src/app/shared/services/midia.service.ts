// sound.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MidiaService {
  private audio: HTMLAudioElement;
  private synth: SpeechSynthesis;

  constructor() {
    this.audio = new Audio();
    this.audio.src = 'assets/sound.mp3';
    this.synth = window.speechSynthesis;
  }

  playSound(): void {
    this.audio.play();
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    this.synth.speak(utterance);
  }
}
