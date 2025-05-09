import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,
} from 'react-native';
import ExpandedPlayerModal from './ExpandedPlayerModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePlayerStore } from '../store/usePlayerStore';

const MiniPlayer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingArtwork, setLoadingArtwork] = useState(true);
    const { play, pause, isPlaying, currentTrack } = usePlayerStore();

    const togglePlayPause = async () => {
        if (isPlaying) {
            await pause();
        } else {
            await play();
        }
    };

    const artworkUri = currentTrack?.artwork ?? '';

    return (
        <>
            <Pressable onPress={() => setModalVisible(true)} style={styles.container}>
                {/* Miniatura con loading y fallback */}
                <View style={styles.artworkWrapper}>
                    {(loadingArtwork || !artworkUri) && (
                        <View style={styles.placeholder}>
                            {loadingArtwork ? (
                                <ActivityIndicator size="small" color="#aaa" />
                            ) : (
                                <Icon name="music-note" size={28} color="#aaa" />
                            )}
                        </View>
                    )}

                    {!!artworkUri && (
                        <Image
                            source={{ uri: artworkUri }}
                            style={styles.artwork}
                            onLoadStart={() => setLoadingArtwork(true)}
                            onLoadEnd={() => setLoadingArtwork(false)}
                            onError={() => setLoadingArtwork(false)}
                        />
                    )}
                </View>

                {/* Info */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {currentTrack?.title ?? 'Cargando...'}
                    </Text>
                    <Text style={styles.artist} numberOfLines={1}>
                        {currentTrack?.artist ?? 'Desconocido'}
                    </Text>
                </View>

                {/* Play/Pause */}
                <TouchableOpacity onPress={togglePlayPause}>
                    <Icon
                        name={isPlaying ? 'pause' : 'play-arrow'}
                        size={32}
                        color="#fff"
                    />
                </TouchableOpacity>
            </Pressable>

            <ExpandedPlayerModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
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
        alignItems: 'center',
        zIndex: 10,
    },
    artworkWrapper: {
        width: 44,
        height: 44,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    artwork: {
        width: 44,
        height: 44,
        borderRadius: 6,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    placeholder: {
        width: 44,
        height: 44,
        borderRadius: 6,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
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
});
