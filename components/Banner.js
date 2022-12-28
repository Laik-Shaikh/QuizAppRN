import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const Banner = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bannerTitle}>Quizzie</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    bannerTitle: {
        fontSize: 36,
        fontWeight: "800",
        color: "black"
    }
});

export default Banner;