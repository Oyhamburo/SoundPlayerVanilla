import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useTheme } from '../styles/ThemeContext';

const { width } = Dimensions.get('window');
const categories = [
    {
        id: '1',
        title: 'Lo-Fi Beats',
        description: 'Para concentrarte o relajarte',
        color: '#A5D6A7',
    },
    {
        id: '2',
        title: 'Rock Argentino',
        description: 'Clásicos de siempre',
        color: '#EF9A9A',
    },
    {
        id: '3',
        title: 'Meditación',
        description: 'Paz, mente y alma',
        color: '#B39DDB',
    },
    {
        id: '4',
        title: 'Latino Classics',
        description: 'Ritmos que mueven',
        color: '#FFCC80',
    },
    {
        id: '5',
        title: 'Entrenamiento',
        description: 'Energía para moverte',
        color: '#80DEEA',
    },
    {
        id: '6',
        title: 'Jazz & Blues',
        description: 'Instrumental con estilo',
        color: '#FFE082',
    },
    {
        id: '7',
        title: 'Electrónica',
        description: 'Beats modernos y potentes',
        color: '#CE93D8',
    },
    {
        id: '8',
        title: 'Reggae',
        description: 'Vibras positivas',
        color: '#A5D6D8',
    },
    {
        id: '9',
        title: 'Pop Internacional',
        description: 'Hits que no paran',
        color: '#FFAB91',
    },
    {
        id: '10',
        title: 'Acústicos',
        description: 'Versiones íntimas',
        color: '#C5E1A5',
    },
];


const HomeScreen = () => {
    const theme = useTheme();

    return (
        <ScrollView
            contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
        >
            <Text style={[styles.heading, { color: theme.textPrimary }]}>
                Descubrí tu ritmo 🎶
            </Text>

            {categories.map((cat, i) => (
                <TouchableOpacity
                    key={cat.id}
                    style={[
                        styles.card,
                        {
                            backgroundColor: cat.color,
                            width: width * (i % 2 === 0 ? 0.9 : 0.8), // varía el ancho
                            alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                        },
                    ]}
                >
                    <Text style={styles.cardTitle}>{cat.title}</Text>
                    <Text style={styles.cardDesc}>{cat.description}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        gap: 16,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    card: {
        borderRadius: 16,
        padding: 20,
        marginVertical: 6,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    cardDesc: {
        marginTop: 6,
        fontSize: 14,
        color: '#333',
    },
});
