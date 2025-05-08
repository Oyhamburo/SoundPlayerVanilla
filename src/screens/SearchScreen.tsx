import React from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import { mockPlaylist } from '../utils/mockPlaylist';

const SearchScreen = () => {
    const theme = useTheme();

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Image source={{ uri: item.artwork }} style={styles.artwork} />
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>{item.artist}</Text>
            <TouchableOpacity style={[styles.cardButton, { backgroundColor: theme.primary }]}>
                <Text style={{ color: '#fff' }}>Ver más</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={mockPlaylist}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
            style={{ backgroundColor: theme.background }}
        />
    );
};


export default SearchScreen;

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    artwork: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    cardDesc: {
        marginTop: 4,
        fontSize: 14,
    },
    cardButton: {
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
});
