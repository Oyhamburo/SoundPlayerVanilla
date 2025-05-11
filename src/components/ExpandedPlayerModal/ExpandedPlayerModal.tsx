import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    PanResponder,
    TouchableOpacity,
    BackHandler,
    Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useProgress } from 'react-native-track-player';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORY_COLORS } from '../../styles/colors';
import { styles } from "./styles";
import TrackPlayer from 'react-native-track-player';

const screenHeight = Dimensions.get("window").height;

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
    const translateX = useRef(new Animated.Value(0)).current;
    const [bgColor, setBgColor] = useState(CATEGORY_COLORS[currentTrack?.category] || 'black');

    useEffect(() => {
        const handleBackPress = () => {
            if (visible) {
                onClose();
                return true;
            }
            return false;
        };

        if (visible) {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        }

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [visible, onClose]);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : screenHeight,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 10,
            onPanResponderMove: (_, gestureState) => {
                translateX.setValue(gestureState.dx);
            },
            onPanResponderRelease: async (_, gestureState) => {
                const SWIPE_THRESHOLD = 80;
                if (gestureState.dx < -SWIPE_THRESHOLD) {
                    Animated.timing(translateX, {
                        toValue: -300,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(async () => {
                        await skipToNext();
                        const index = await TrackPlayer.getCurrentTrack();
                        const newTrack = index !== null ? await TrackPlayer.getTrack(index) : null;
                        console.log('New Track:', newTrack?.category);
                        setBgColor(CATEGORY_COLORS[newTrack?.category] || 'black');
                        translateX.setValue(300);
                        Animated.timing(translateX, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();
                    });
                } else if (gestureState.dx > SWIPE_THRESHOLD) {
                    Animated.timing(translateX, {
                        toValue: 300,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(async () => {
                        await skipToPrevious();
                        const index = await TrackPlayer.getCurrentTrack();
                        const newTrack = index !== null ? await TrackPlayer.getTrack(index) : null;

                        console.log('New Track:', newTrack?.category);
                        setBgColor(CATEGORY_COLORS[newTrack?.category] || 'black');
                        translateX.setValue(-300);
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

    if (!isReady || !currentTrack) return null;

    return (
        <Animated.View
            style={[styles.modalContainer, { transform: [{ translateY: slideAnim }], backgroundColor: bgColor }]}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content} {...panResponder.panHandlers}>
                    <TouchableOpacity style={styles.chevron} onPress={onClose}>
                        <Icon name="keyboard-arrow-down" size={30} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.artworkContainer}>
                        <Animated.View style={{ transform: [{ translateX }] }}>
                            <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />
                        </Animated.View>
                    </View>

                    <View style={styles.playerControls}>
                        <View style={styles.trackInfo}>
                            <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
                            <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
                        </View>

                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={progress.duration}
                            value={progress.position}
                            onSlidingComplete={seekTo}
                            minimumTrackTintColor="#1DB954"
                            maximumTrackTintColor="#555"
                            thumbTintColor="#fff"
                        />

                        <View style={styles.timeRow}>
                            <Text style={styles.time}>{formatTime(progress.position)}</Text>
                            <Text style={styles.time}>{formatTime(progress.duration)}</Text>
                        </View>

                        <View style={styles.controls}>
                            <TouchableOpacity onPress={skipToPrevious}>
                                <Icon name="skip-previous" size={40} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={isPlaying ? pause : play}>
                                <Icon name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'} size={64} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={skipToNext}>
                                <Icon name="skip-next" size={40} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Animated.View>
    );
};

export default ExpandedPlayerModal;