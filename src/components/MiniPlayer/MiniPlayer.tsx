import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    PanResponder,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePlayerStore } from '../../store/usePlayerStore';
import ExpandedPlayerModal from '../ExpandedPlayerModal/ExpandedPlayerModal';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { styles } from './styles';
import { CATEGORY_COLORS } from '../../styles/colors';
const SWIPE_THRESHOLD = 60;

const MiniPlayer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingArtwork, setLoadingArtwork] = useState(true);

    const {
        play,
        pause,
        skipToNext,
        skipToPrevious,
        isPlaying,
        currentTrack,
        backgroundColor
    } = usePlayerStore();

    const progress = useProgress();
    const progressWidth = useRef(new Animated.Value(0)).current;

    const percentage =
        progress.duration > 0 ? (progress.position / progress.duration) * 100 : 0;

    Animated.timing(progressWidth, {
        toValue: percentage,
        duration: 300,
        useNativeDriver: false,
    }).start();

    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) =>
                Math.abs(gesture.dx) > 10 && Math.abs(gesture.dy) < 10,
            onPanResponderMove: (_, gesture) => {
                translateX.setValue(gesture.dx);
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    Animated.timing(translateX, {
                        toValue: 300,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(async () => {
                        await skipToPrevious();
                        const index = await TrackPlayer.getCurrentTrack();
                        const newTrack = index !== null ? await TrackPlayer.getTrack(index) : null;
                        setBgColor(CATEGORY_COLORS[newTrack?.category] || 'black');
                        translateX.setValue(-300);
                        Animated.timing(translateX, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    });
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    Animated.timing(translateX, {
                        toValue: -300,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(async () => {
                        await skipToNext();
                        translateX.setValue(300);
                        Animated.timing(translateX, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    });
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const togglePlayPause = async () => {
        if (isPlaying) {
            await pause();
        } else {
            await play();
        }
    };

    const artworkUri = currentTrack?.artwork ?? '';

    const opacity = translateX.interpolate({
        inputRange: [-150, 0, 150],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
    });

    return (
        <>
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                {/* Miniatura */}
                <View style={styles.artworkWrapper}>
                    {(loadingArtwork || !artworkUri) && (
                        <View style={styles.placeholder}>
                            {loadingArtwork ? (
                                <ActivityIndicator size="small" color="#aaa" />
                            ) : (
                                <Icon name="music-note" size={24} color="#aaa" />
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

                {/* Texto deslizable dentro de una máscara */}
                <View style={styles.textWrapper} {...panResponder.panHandlers}>
                    <Animated.View
                        style={[
                            styles.textContainer,
                            {
                                transform: [{ translateX }],
                                opacity,
                            },
                        ]}
                    >

                        <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
                            <Text style={styles.title} numberOfLines={1}>
                                {currentTrack?.title ?? 'Cargando...'}
                            </Text>
                            <Text style={styles.artist} numberOfLines={1}>
                                {currentTrack?.artist ?? 'Desconocido'}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/* Play/Pause */}
                <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
                    <Icon
                        name={isPlaying ? 'pause' : 'play-arrow'}
                        size={32}
                        color="#fff"
                    />
                </TouchableOpacity>

                {/* Línea de progreso */}
                <View style={styles.progressBarBackground}>
                    <Animated.View
                        style={[
                            styles.progressBarFill,
                            {
                                width: progressWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%'],
                                })
                            },
                        ]}
                    />
                </View>
            </View>

            <ExpandedPlayerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </>
    );
};

export default MiniPlayer;
