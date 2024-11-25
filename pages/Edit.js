import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

export const url = "http://172.20.10.4:8000/destinations";

const EditScreen = ({ route, navigation, updateDestinationAwait }) => {
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

    useEffect(() => {
        if (destinationa) {
            setName(destinationa.name);
            setDescription(destinationa.description);
            setDifficulty(destinationa.difficulty);
            setFavorites(destinationa.favorites);
        }
    }, [destinationa]);

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

    const handleUpdateDestination = () => {
        if (!name || !description || !difficulty) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const updatedDestination = {
            name,
            description,
            difficulty,
            favorites
        };

        updateDestinationAwait(id, updatedDestination);
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
            <TouchableOpacity style={styles.button} onPress={handleUpdateDestination}>
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
        backgroundColor: "#048ba8",
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