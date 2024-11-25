import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DestinationCard = ({ planet }) => {
    const navigation = useNavigation();
    const id = planet.id;

    const handleNavigation = () => {
        navigation.navigate("Details", { id });
    };

    return (
        <TouchableOpacity onPress={handleNavigation} style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.text}>{planet.name}</Text>
                <Text style={styles.favorites}>{planet.favorites}</Text>
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
        height: 140,
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
    facil: {
        backgroundColor: "green",
        width: 80,
        height: 20,
        borderRadius: 10,
    },
    moderada: {
        backgroundColor: "yellow",
        width: 80,
        height: 20,
        borderRadius: 10
    },
    dificil: {
        backgroundColor: "purple",
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