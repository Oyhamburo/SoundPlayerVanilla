import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    PanResponder,
    TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../styles/ThemeContext';
import { usePlayerStore } from '../store/usePlayerStore';
import { useProgress } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenHeight = Dimensions.get('window').height;

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

interface Props {
    visible: boolean;
    onClose: () => void;
}

const ExpandedPlayerModal: React.FC<Props> = ({ visible, onClose }) => {
    const theme = useTheme();
    const {
        isReady,
        isPlaying,
        currentTrack,
        play,
        pause,
        skipToNext,
        skipToPrevious,
        seekTo,
    } = usePlayerStore();
    const progress = useProgress();
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    useEffect(() => {
        if (visible) {
            // setup();
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // Pan gesture: solo activa cierre si el gesto empieza en la zona superior
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dy > 10;
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    Animated.timing(slideAnim, {
                        toValue: screenHeight,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => onClose());
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if (!isReady || !currentTrack) {
        return null;
    }

    return (
        <Animated.View
            style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.content}>
                {/* Minimizar - flecha */}
                <TouchableOpacity style={styles.chevron} onPress={onClose}>
                    <Icon name="chevron-down" size={30} color="#fff" />
                </TouchableOpacity>

                {/* Zona deslizable */}
                <View {...panResponder.panHandlers}>
                    <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />
                    <Text style={[styles.title, { color: theme.textPrimary }]}>
                        {currentTrack.title}
                    </Text>
                    <Text style={[styles.artist, { color: theme.textSecondary }]}>
                        {currentTrack.artist}
                    </Text>
                </View>

                {/* Tiempos */}
                <View style={styles.timeRow}>
                    <Text style={{ color: theme.textSecondary }}>{formatTime(progress.position)}</Text>
                    <Text style={{ color: theme.textSecondary }}>{formatTime(progress.duration)}</Text>
                </View>

                {/* Slider */}
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    value={progress.position}
                    onSlidingComplete={seekTo}
                    minimumTrackTintColor={theme.primary}
                    maximumTrackTintColor="#ccc"
                    thumbTintColor={theme.primary}
                />

                {/* Controles */}
                <View style={styles.controls}>
                    <TouchableOpacity onPress={skipToPrevious}>
                        <Text style={styles.controlText}>⏮</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={isPlaying ? pause : play}>
                        <Text style={styles.controlText}>{isPlaying ? '⏸' : '▶️'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipToNext}>
                        <Text style={styles.controlText}>⏭</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

export default ExpandedPlayerModal;

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        height: screenHeight,
        width: '100%',
        backgroundColor: '#121212',
        zIndex: 100,
    },
    content: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    chevron: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    artwork: {
        width: 240,
        height: 240,
        borderRadius: 16,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 16,
        marginBottom: 16,
    },
    timeRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -10,
        marginBottom: 4,
    },
    slider: {
        width: '100%',
        height: 40,
        marginVertical: 16,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 12,
    },
    controlText: {
        fontSize: 32,
        color: '#fff',
    },
});
