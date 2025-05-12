import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { usePlaylistStore } from '../../store/usePlaylistStore';

const PlaylistManager = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [trackInput, setTrackInput] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

    const {
        playlists,
        addPlaylist,
        removePlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
    } = usePlaylistStore();

    const handleAddPlaylist = () => {
        if (playlistName.trim()) {
            addPlaylist(playlistName.trim());
            setPlaylistName('');
        }
    };

    const handleAddTrack = () => {
        if (selectedPlaylist && trackInput.trim()) {
            addTrackToPlaylist(selectedPlaylist, trackInput.trim());
            setTrackInput('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Playlist Manager</Text>

            <View style={styles.inputRow}>
                <TextInput
                    placeholder="New Playlist Name"
                    value={playlistName}
                    onChangeText={setPlaylistName}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleAddPlaylist} style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={Object.keys(playlists)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedPlaylist(item)}
                        onLongPress={() => removePlaylist(item)}
                        style={[
                            styles.playlistItem,
                            selectedPlaylist === item && styles.selectedPlaylist,
                        ]}
                    >
                        <Text style={styles.playlistText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            {selectedPlaylist && (
                <View>
                    <Text style={styles.subHeading}>Tracks in {selectedPlaylist}</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="Track Name"
                            value={trackInput}
                            onChangeText={setTrackInput}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={handleAddTrack} style={styles.button}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={playlists[selectedPlaylist] || []}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onLongPress={() => removeTrackFromPlaylist(selectedPlaylist, item)}
                                style={styles.trackItem}
                            >
                                <Text style={styles.trackText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default PlaylistManager;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#121212',
    },
    heading: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subHeading: {
        color: '#aaa',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        borderRadius: 6,
        padding: 8,
        color: '#fff',
    },
    button: {
        backgroundColor: '#1DB954',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    playlistItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#333',
    },
    selectedPlaylist: {
        backgroundColor: '#333',
    },
    playlistText: {
        color: '#fff',
    },
    trackItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#444',
    },
    trackText: {
        color: '#ddd',
    },
});
