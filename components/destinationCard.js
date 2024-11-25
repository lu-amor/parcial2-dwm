import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const url = "http://172.20.10.4:8000/destinations";

const DestinationCard = ({ planet, updatePlanetAwait}) => {
    const navigation = useNavigation();
    const id = planet.id;

    const name = planet.name;
    const description = planet.description;
    const difficulty = planet.difficulty;
    const [favorites, setFavorites] = useState(planet.favorites);

    const handleNavigation = () => {
        navigation.navigate("Details", { id });
    };

    const handleAdd = () => {
        setFavorites(favorites + 1);
        updatePlanet();
    };

    const handleSubtract = async () => {
        setFavorites(favorites - 1);
        updatePlanet();
    };

    const updatePlanet = () => {
        const updatedPlanet = {
            name,
            description,
            difficulty,
            favorites
        };
        updatePlanetAwait(id, updatedPlanet);
    }


    return (
        <TouchableOpacity onPress={handleNavigation} style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.text}>{planet.name}</Text>
                <View style={styles.containerF}>
                    <TouchableOpacity
                    onPress={handleSubtract}>
                    <View style={styles.buttonWrapper}>
                        <Text style={styles.buttonTextF}>-</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{favorites}</Text>
                    <TouchableOpacity
                    onPress={handleAdd}>
                    <View style={styles.buttonWrapper}>
                        <Text style={styles.buttonTextF}>+</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                { planet.difficulty === "Fácil" &&
                    <View style={styles.facil}>
                    </View>
                }
                { planet.difficulty === "Moderada" &&
                    <View style={styles.moderada}>
                    </View>
                }
                { planet.difficulty === "Difícil" &&
                    <View style={styles.dificil}>
                    </View>
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 190,
        width: "80%",
        minWidth: 250,
        margin: 10,
        alignSelf: "center",
        marginBottom: 0,
        paddingBottom: 0,
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,
    },
    containerF: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 15
    },
    buttonWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#048ba8',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: 20,
        fontWeight: 'medium',
        color: '#ffffff',
    },
    buttonTextF: {
        fontSize: 20,
        fontWeight: 'medium',
        color: '#ffffff',
    },
    facil: {
        backgroundColor: "#83e377",
        width: 80,
        height: 20,
        borderRadius: 10,
    },
    moderada: {
        backgroundColor: "#efea5a",
        width: 80,
        height: 20,
        borderRadius: 10
    },
    dificil: {
        backgroundColor: "#54478c",
        width: 80,
        height: 20,
        borderRadius: 10
    },
    container: {
        backgroundColor: "#000000",
        padding: 15,
        margin: 0,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ffffff",
        alignSelf: "center",
    },
    favorites: {
        fontSize: 14,
        marginBottom: 10,
        color: "#ffffff",
        marginLeft: 10,
    },
});

export default DestinationCard;