import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState } from 'react-native-track-player';

const track = {
    id: '1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Canción de prueba',
    artist: 'Artista de prueba',
};

const Screen3 = () => {
    const playbackState = usePlaybackState();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const setupPlayer = async () => {
            try {
                await TrackPlayer.setupPlayer();
                await TrackPlayer.add([track]);
                TrackPlayer.updateOptions({
                    alwaysPauseOnInterruption: false,
                    capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
                    compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
                });
                setIsReady(true);
            } catch (err) {
                console.error('Error al inicializar TrackPlayer:', err);
            }
        };

        setupPlayer();

        return () => {
            TrackPlayer.destroy();
        };
    }, []);

    const handlePlayPause = async () => {
        const currentState = await TrackPlayer.getState();

        if (currentState === State.Playing) {
            await TrackPlayer.pause();
        } else if (currentState === State.Paused || currentState === State.Ready) {
            await TrackPlayer.play();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reproductor de Audio</Text>
            <Text style={styles.status}>
                Estado: {playbackState === State.Playing ? 'Reproduciendo' : 'Pausado'}
            </Text>
            <Button
                title={playbackState === State.Playing ? 'Pausar' : 'Reproducir'}
                onPress={handlePlayPause}
                disabled={!isReady}
            />
        </View>
    );
};

export default Screen3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    status: {
        marginBottom: 20,
        fontSize: 16,
    },
});
