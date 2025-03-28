import { useState, useEffect, useRef, useCallback } from 'react';

// Import audio files directly using require
const AUDIO_FILES = {
  background: require('../../assets/ambient_music.mp3'),
  buy: require('../../assets/buy.mp3'),
  prestige: require('../../assets/prestige.mp3'),
  achievement: require('../../assets/achievement.mp3'),
  notification: require('../../assets/notification.mp3')
};

const useAudio = () => {
  // Audio elements refs
  const bgMusicRef = useRef(null);
  const buySoundRef = useRef(null);
  const prestigeSoundRef = useRef(null);
  const achievementSoundRef = useRef(null);
  const notificationSoundRef = useRef(null);
  
  // State for audio settings
  const [audioSettings, setAudioSettings] = useState(() => {
    const savedSettings = localStorage.getItem('ecoClickerAudioSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (error) {
        console.error('Failed to parse audio settings:', error);
      }
    }
    return {
      masterVolume: 0.7,
      musicVolume: 0.5,
      sfxVolume: 0.8,
      musicEnabled: true,
      sfxEnabled: true,
    };
  });

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements with proper imports
    bgMusicRef.current = new Audio(AUDIO_FILES.background);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = audioSettings.musicEnabled ? (audioSettings.masterVolume * audioSettings.musicVolume) : 0;
    
    buySoundRef.current = new Audio(AUDIO_FILES.buy);
    buySoundRef.current.volume = audioSettings.sfxEnabled ? (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    
    prestigeSoundRef.current = new Audio(AUDIO_FILES.prestige);
    prestigeSoundRef.current.volume = audioSettings.sfxEnabled ? (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    
    achievementSoundRef.current = new Audio(AUDIO_FILES.achievement);
    achievementSoundRef.current.volume = audioSettings.sfxEnabled ? (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    
    notificationSoundRef.current = new Audio(AUDIO_FILES.notification);
    notificationSoundRef.current.volume = audioSettings.sfxEnabled ? (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    
    // Start playing background music if enabled
    if (audioSettings.musicEnabled) {
      bgMusicRef.current.play().catch(error => {
        console.warn('Autoplay prevented. User interaction needed to start audio:', error);
      });
    }
    
    // Cleanup
    return () => {
      if (bgMusicRef.current) bgMusicRef.current.pause();
    };
  }, []);

  // Update volumes when settings change
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = audioSettings.musicEnabled ? 
        (audioSettings.masterVolume * audioSettings.musicVolume) : 0;
    }
    
    if (buySoundRef.current) {
      buySoundRef.current.volume = audioSettings.sfxEnabled ? 
        (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    }
    
    if (prestigeSoundRef.current) {
      prestigeSoundRef.current.volume = audioSettings.sfxEnabled ? 
        (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    }
    
    if (achievementSoundRef.current) {
      achievementSoundRef.current.volume = audioSettings.sfxEnabled ? 
        (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    }
    
    if (notificationSoundRef.current) {
      notificationSoundRef.current.volume = audioSettings.sfxEnabled ? 
        (audioSettings.masterVolume * audioSettings.sfxVolume) : 0;
    }
    
    // Save settings to localStorage
    localStorage.setItem('ecoClickerAudioSettings', JSON.stringify(audioSettings));
  }, [audioSettings]);

  // Function to play a sound
  const playSound = useCallback((soundType) => {
    if (!audioSettings.sfxEnabled) return;
    
    switch (soundType) {
      case 'buy':
        if (buySoundRef.current) {
          buySoundRef.current.currentTime = 0;
          buySoundRef.current.play().catch(e => console.warn('Error playing sound:', e));
        }
        break;
      case 'prestige':
        if (prestigeSoundRef.current) {
          prestigeSoundRef.current.currentTime = 0;
          prestigeSoundRef.current.play().catch(e => console.warn('Error playing sound:', e));
        }
        break;
      case 'achievement':
        if (achievementSoundRef.current) {
          achievementSoundRef.current.currentTime = 0;
          achievementSoundRef.current.play().catch(e => console.warn('Error playing sound:', e));
        }
        break;
      case 'notification':
        if (notificationSoundRef.current) {
          notificationSoundRef.current.currentTime = 0;
          notificationSoundRef.current.play().catch(e => console.warn('Error playing sound:', e));
        }
        break;
      default:
        break;
    }
  }, [audioSettings.sfxEnabled]);

  // Toggle background music
  const toggleMusic = useCallback(() => {
    setAudioSettings(prev => {
      const newSettings = { ...prev, musicEnabled: !prev.musicEnabled };
      
      if (bgMusicRef.current) {
        if (newSettings.musicEnabled) {
          bgMusicRef.current.play().catch(e => console.warn('Error playing music:', e));
        } else {
          bgMusicRef.current.pause();
        }
      }
      
      return newSettings;
    });
  }, []);

  // Toggle sound effects
  const toggleSFX = useCallback(() => {
    setAudioSettings(prev => ({ ...prev, sfxEnabled: !prev.sfxEnabled }));
  }, []);

  // Update music volume
  const updateMusicVolume = useCallback((value) => {
    setAudioSettings(prev => ({ ...prev, musicVolume: value }));
  }, []);

  // Update SFX volume
  const updateSFXVolume = useCallback((value) => {
    setAudioSettings(prev => ({ ...prev, sfxVolume: value }));
  }, []);

  // Update master volume
  const updateMasterVolume = useCallback((value) => {
    setAudioSettings(prev => ({ ...prev, masterVolume: value }));
  }, []);

  return {
    audioSettings,
    playSound,
    toggleMusic,
    toggleSFX,
    updateMusicVolume,
    updateSFXVolume,
    updateMasterVolume,
  };
};

export default useAudio;