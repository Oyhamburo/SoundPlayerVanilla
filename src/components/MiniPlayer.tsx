import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
    Dimensions,
    BackHandler,
    PanResponder,
    Platform,
} from 'react-native';
import TrackPlayer, {
    State,
    usePlaybackState,
    useProgress,
} from 'react-native-track-player';

const screenHeight = Dimensions.get('window').height;

const MiniPlayer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('Cargando...');
    const [artist, setArtist] = useState('Desconocido');
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    useEffect(() => {
        const fetchTrack = async () => {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if (currentTrack != null) {
                const track = await TrackPlayer.getTrack(currentTrack);
                setTitle(track.title || 'Sin título');
                setArtist(track.artist || 'Desconocido');
            }
        };
        fetchTrack();
    }, []);

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
    };


    // ✅ Gesto de deslizamiento hacia abajo
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dy > 10; // si arrastra hacia abajo
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    closeModal();
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

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
            <TouchableOpacity onPress={openModal} style={styles.container}>
                <View style={styles.trackInfo}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.artist}>{artist}</Text>
                </View>
                <TouchableOpacity onPress={togglePlayPause}>
                    <Text style={styles.playPause}>
                        {playbackState === State.Playing ? '⏸' : '▶️'}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="none"
                onRequestClose={closeModal}
            >
                <Animated.View
                    style={[
                        styles.modalContent,
                        { transform: [{ translateY: slideAnim }] },
                    ]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.expandedContainer}>
                        <Text style={styles.expandedTitle}>{title}</Text>
                        <Text style={styles.expandedArtist}>{artist}</Text>

                        <TouchableOpacity
                            onPress={togglePlayPause}
                            style={styles.expandedButton}
                        >
                            <Text style={styles.expandedButtonText}>
                                {playbackState === State.Playing ? '⏸ Pausar' : '▶️ Reproducir'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                            <Text style={styles.closeBtnText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Modal>
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
    trackInfo: {
        flexDirection: 'column',
        maxWidth: '80%',
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
    modalContent: {
        position: 'absolute',
        height: screenHeight,
        width: '100%',
        backgroundColor: '#121212',
        bottom: 0,
        zIndex: 20,
    },
    expandedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    expandedTitle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 8,
    },
    expandedArtist: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 24,
    },
    expandedButton: {
        backgroundColor: '#1DB954',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 24,
        marginBottom: 20,
    },
    expandedButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeBtn: {
        padding: 10,
    },
    closeBtnText: {
        color: '#bbb',
        fontSize: 14,
    },
});
