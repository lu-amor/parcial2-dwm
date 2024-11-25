import React, {useEffect, useState} from "react";
import DestinationCard from "../components/destinationCard";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, Text, StyleSheet, View, ScrollView, Platform } from "react-native";

const HomeScreen = ({planets}) => {
    const [sortedPlanets, setSortedPlanets] = useState(planets);
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("Add");
    };

    useEffect(() => {
        const sorted = [...planets].sort((a, b) => b.favorites - a.favorites);
        setSortedPlanets(sorted);
    }, [planets]);


    return (
        <>
            <View style={{backgroundColor: "#000000", paddingVertical: 15, gap: 10, paddingHorizontal: 20, alignContent: "center"}}>
            {Platform.OS === 'ios' ? (
                <TouchableOpacity style={{backgroundColor: "#84a98c", width: "45%", marginLeft: 'auto', marginRight: 30, alignContent: "center", borderRadius: 15, alignSelf: "flex-end"}} onPress={handleNavigation}>
                    <Text style={[styles.button, {textAlign: "center", color: "#ffffff"}]}>Crear Destino</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={{backgroundColor: "#4361ee", width: "45%", marginRight: 'auto', marginLeft: 25, alignContent: "center", borderRadius: 15, alignSelf: "flex-start"}} onPress={handleNavigation}>
                    <Text style={[styles.button, {textAlign: "center", color: "#000000"}]}>Agregar Destino</Text>
                </TouchableOpacity>
            )}
            </View>
            <ScrollView style={{ alignContent: "center", backgroundColor: "#000000", paddingBottom: 50}}>
                {sortedPlanets.map((destination) => (
                    <DestinationCard key={destination.id.toString()} planet={destination} />
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        color: "#ffffff",
        alignSelf: "center",
        justifyContent: "center",
        width: 150,
        maxWidth: 150,
    },
});

export default HomeScreen;
