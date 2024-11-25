import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Dropdown } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddScreen = ({ createDestinationAwait, getDestinationsAwait }) => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            createDestinationAwait,
            getDestinationsAwait,
        });
    }, []);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const handleCreateDestination = () => {
        if (!name || !description || !difficulty) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        if (difficulty !== "Fácil" && difficulty != "Moderada" && difficulty != "Difícil") {
            alert("La dificultad ingresada no es válida, verifique ortografía");
            return;
        }
        const favorites = 0;
        console.log(difficulty);

        const newDestination = {
            name,
            description,
            difficulty,
            favorites
        };

        createDestinationAwait(newDestination);
        navigation.reset({
            index: 0,
            routes: [{ name: "Agencia de viajes" }],
        });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.headerText}>Nuevo Destino</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del destino"
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
            <TouchableOpacity style={styles.button} onPress={handleCreateDestination}>
                <Text style={styles.buttonText}>Crear Destino</Text>
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
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
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
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#555555",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    cancelButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddScreen;