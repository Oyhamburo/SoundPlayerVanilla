import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import ExpandedPlayerModal from './ExpandedPlayerModal';

const MiniPlayer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const playbackState = usePlaybackState();
    const [title, setTitle] = useState('Cargando...');
    const [artist, setArtist] = useState('Desconocido');

    const togglePlayPause = async () => {
        const state = await TrackPlayer.getState();
        if (state === State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.container}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.artist}>{artist}</Text>
                </View>
                <TouchableOpacity onPress={togglePlayPause}>
                    <Text style={styles.playPause}>
                        {playbackState === State.Playing ? '⏸' : '▶️'}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>

            <ExpandedPlayerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </>
    );
};

export default MiniPlayer;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        marginHorizontal: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    artist: {
        color: '#aaa',
        fontSize: 12,
    },
    playPause: {
        fontSize: 22,
        color: '#fff',
    },
});
