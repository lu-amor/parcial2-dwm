import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";

export const url = "http://172.20.10.4:8000/destinations";

const DetailsScreen = ({ route, navigation, deleteDestinationAwait }) => {
    const { id } = route.params;
    const [destinationa, setDestinationa] = useState(null);

    useEffect(() => {
        const fetchDestinationa = async () => {
            try {
                const response = await fetch(`${url}/${id}`);
                const data = await response.json();
                setDestinationa(data);
            } catch (error) {
                console.error("Error fetching destination: ", error);
            }
        };

        fetchDestinationa();
    }, [id]);

    const handleDelete = async () => {
        await deleteDestinationAwait(id)
        navigation.reset({
            index: 0,
            routes: [{ name: "Agencia de viajes" }],
        });
    };

    const handleNavigation = () => {
        navigation.navigate("Edit", { id });
    };

    if (!destinationa) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando destinationa...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contenedor}>
                    <Image source={{ uri: destinationa.image }} style={styles.image} />
                    <Text style={styles.name}>{destinationa.name}</Text>
                    <Text style={styles.description}>{destinationa.description}</Text>
                    <Text style={styles.description}>{destinationa.difficulty}</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        alignItems: "center",
        color: "#000000",
    },
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    contenedor: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        backgroundColor: "#000000",
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 18,
        color: "#cccccc",
        textAlign: "center",
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        paddingVertical: 15,
        gap: 10,
        marginBottom: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#048ba8",
        width: "45%",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    loadingText: {
        fontSize: 18,
        color: "#ffffff",
    },
});

export default DetailsScreen;