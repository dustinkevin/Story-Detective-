/**
 * Sound effects and speech synthesis for Story Detective
 * Robust mobile compatibility for iOS Safari, Android Chrome, Samsung Internet & Desktop
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private isUnlocked: boolean = false;
  // Permanent reference array to prevent WebKit / iOS Safari garbage collection
  private activeUtterances: SpeechSynthesisUtterance[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockAudio();
      };
      window.addEventListener('touchstart', unlock, { passive: true });
      window.addEventListener('touchend', unlock, { passive: true });
      window.addEventListener('click', unlock, { passive: true });
    }
  }

  // Force unlock audio & speech synthesis on user interaction
  public unlockAudio() {
    if (this.isUnlocked) return;
    this.isUnlocked = true;

    try {
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
        // Play silent oscillator to wake up iOS hardware audio session
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        gain.gain.value = 0.001;
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(0);
        osc.stop(this.ctx.currentTime + 0.01);
      }
    } catch {
      // ignore
    }

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
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
    this.unlockAudio();
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
    this.unlockAudio();
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
    this.unlockAudio();
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
    this.unlockAudio();
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
    this.unlockAudio();
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
    this.unlockAudio();
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

  // Reliable Speech Synthesis across mobile and desktop
  speak(text: string, onEnd?: () => void, rate: number = 0.9) {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    // Wake audio session synchronously
    this.unlockAudio();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      // 1. Resume any paused speech engine immediately
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // 2. Cancel previous utterance synchronously
      window.speechSynthesis.cancel();

      // 3. Create fresh utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select English voice if available on system
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const enVoice = voices.find(
            (v) =>
              (v.lang === 'en-US' || v.lang === 'en_US' || v.lang.startsWith('en')) &&
              !v.name.includes('Compact')
          );
          if (enVoice) {
            utterance.voice = enVoice;
          }
        }
      } catch {
        // use default
      }

      // Keep strong reference to prevent iOS WebKit garbage collection
      this.activeUtterances.push(utterance);

      let finished = false;
      const onDone = () => {
        if (finished) return;
        finished = true;
        // Clean up reference
        this.activeUtterances = this.activeUtterances.filter((u) => u !== utterance);
        if (onEnd) onEnd();
      };

      utterance.onend = onDone;
      utterance.onerror = (e) => {
        console.warn('Speech error/interrupted:', e);
        onDone();
      };

      // 4. Speak SYNCHRONOUSLY within this user event
      window.speechSynthesis.speak(utterance);

      // 5. Fallback safety timer in case onend never fires on iOS
      const words = text.trim().split(/\s+/).length;
      const timeoutMs = Math.max(2000, (words / 2.0) * 1000 + 1500);
      setTimeout(() => {
        if (!finished) {
          onDone();
        }
      }, timeoutMs);
    } catch (err) {
      console.warn('SpeechSynthesis exception:', err);
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
    this.activeUtterances = [];
  }
}

export const sounds = new SoundManager();
