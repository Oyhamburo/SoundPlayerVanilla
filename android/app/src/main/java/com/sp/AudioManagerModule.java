package com.sirenas.sirenasapp;

import android.content.Context;

import android.media.AudioManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AudioManagerModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private AudioManager audioManager;

    public AudioManagerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
    }

    @Override
    public String getName() {
        return "AudioManager";
    }

    @ReactMethod
    public void pauseAudio() {
        // Pausa la reproducción de audio
        audioManager.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);
    }
}
