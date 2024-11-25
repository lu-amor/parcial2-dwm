import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

export const url = "http://172.20.10.4:8000/destinations";

const EditScreen = ({ route, navigation, updatePlanetAwait }) => {
    const { id } = route.params;
    const [planeta, setPlaneta] = useState(null);

    useEffect(() => {
        const fetchPlaneta = async () => {
            try {
                const response = await fetch(`${url}/${id}`);
                const data = await response.json();
                setPlaneta(data);
            } catch (error) {
                console.error("Error fetching planet: ", error);
            }
        };

        fetchPlaneta();
    }, [id]);

    useEffect(() => {
        if (planeta) {
            setName(planeta.name);
            setDescription(planeta.description);
            setDifficulty(planeta.difficulty);
            setFavorites(planeta.favorites);
        }
    }, [planeta]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [favorites, setFavorites] = useState("");

    const handleAdd = () => {
        setFavorites(favorites + 1);
    };

    const handleSubtract = () => {
        setFavorites(favorites - 1);
    };

    const handleUpdatePlanet = () => {
        if (!name || !description || !difficulty) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const updatedPlanet = {
            name,
            description,
            difficulty,
            favorites
        };

        updatePlanetAwait(id, updatedPlanet);
        navigation.reset({
            index: 0,
            routes: [{ name: "Agencia de viajes" }],
        });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.headerText}>Editar Destino</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor="#aaa"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Dificultad"
                placeholderTextColor="#aaa"
                value={difficulty}
                onChangeText={setDifficulty}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleUpdatePlanet}>
                <Text style={styles.buttonText}>Actualizar Destino</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#000000",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#222222",
        color: "#ffffff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#f0a6ca",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    containerF: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
    },
    buttonWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#aed9e0',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#5e6472',
        borderWidth: 2,
    },
    countText: {
        fontSize: 20,
        fontWeight: 'medium',
        color: '#ffffff',
    },
    buttonTextF: {
        fontSize: 20,
        fontWeight: 'medium',
        color: '#5e6472',
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EditScreen;