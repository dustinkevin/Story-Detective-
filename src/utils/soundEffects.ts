/**
 * Sound effects and speech synthesis for Story Detective
 * Optimized for desktop and mobile (iOS Safari, Android Chrome/Samsung Internet)
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isUnlocked: boolean = false;

  constructor() {
    // Automatically attach one-time unlock listeners for mobile audio & speech
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockMobileAudio();
      };
      window.addEventListener('touchstart', unlock, { once: true, passive: true });
      window.addEventListener('touchend', unlock, { once: true, passive: true });
      window.addEventListener('click', unlock, { once: true });
    }
  }

  // Mobile Audio & Speech unlocker
  public unlockMobileAudio() {
    if (this.isUnlocked) return;
    this.isUnlocked = true;

    try {
      // 1. Unlock AudioContext
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        if (!this.ctx) {
          this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        // Play silent buffer to unlock iOS hardware audio output
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
      }
    } catch {
      // ignore
    }

    try {
      // 2. Unlock SpeechSynthesis on iOS / Android
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
        // Warm up speech synthesis engine with an empty utterance
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
      }
    } catch {
      // ignore
    }
  }

  private getAudioContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Soft tap click
  playTapSound() {
    this.unlockMobileAudio();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  // Page turn whoosh
  playPageFlipSound() {
    this.unlockMobileAudio();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // ignore
    }
  }

  // Clue discovered magical bell chime
  playClueFoundSound() {
    this.unlockMobileAudio();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  // Question correct celebration chime
  playSuccessSound() {
    this.unlockMobileAudio();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const chords = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.09 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.55);
      });
    } catch {
      // ignore
    }
  }

  // Gentle nudge sound on incorrect answer
  playTryAgainSound() {
    this.unlockMobileAudio();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.linearRampToValueAtTime(261.63, ctx.currentTime + 0.18); // C4
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // ignore
    }
  }

  // Case solved grand fanfare
  playFanfareSound() {
    this.unlockMobileAudio();
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const pattern = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 523.25, d: 0.12, t: 0.14 },
        { f: 523.25, d: 0.12, t: 0.28 },
        { f: 659.25, d: 0.28, t: 0.42 },
        { f: 587.33, d: 0.12, t: 0.72 },
        { f: 659.25, d: 0.14, t: 0.86 },
        { f: 783.99, d: 0.45, t: 1.02 },
      ];
      pattern.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Web Speech API text-to-speech with full mobile support
  speak(text: string, onEnd?: () => void, rate: number = 0.88) {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    this.unlockMobileAudio();

    try {
      // On mobile browsers, if speaking or pending, cancel first with a tiny delay
      // to prevent iOS Safari from swallowing the new utterance
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          this.executeSpeech(text, onEnd, rate);
        }, 50);
      } else {
        this.executeSpeech(text, onEnd, rate);
      }
    } catch {
      if (onEnd) onEnd();
    }
  }

  private executeSpeech(text: string, onEnd?: () => void, rate: number = 0.88) {
    try {
      // Always ensure speech synthesis is not paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance; // Prevent garbage collection on iOS Safari

      utterance.lang = 'en-US';
      utterance.rate = rate; // Comfortable for Grade 5-6 EFL learners
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select high-quality English voice if available on user device
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const englishVoice = voices.find(
            (v) =>
              (v.lang.startsWith('en') || v.lang.startsWith('en-US')) &&
              (v.name.includes('Samantha') ||
                v.name.includes('Karen') ||
                v.name.includes('Google') ||
                v.name.includes('Natural') ||
                v.default)
          );
          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }
      } catch {
        // use system default
      }

      let ended = false;
      const finish = () => {
        if (ended) return;
        ended = true;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      window.speechSynthesis.speak(utterance);

      // Mobile Safari fallback safety timer: if utterance hangs, trigger onEnd
      const wordsCount = text.split(/\s+/).length;
      const expectedDurationMs = Math.max(1500, (wordsCount / 2.2) * 1000 + 2000);
      setTimeout(() => {
        if (!ended) {
          finish();
        }
      }, expectedDurationMs);
    } catch {
      if (onEnd) onEnd();
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.currentUtterance = null;
  }
}

export const sounds = new SoundManager();
