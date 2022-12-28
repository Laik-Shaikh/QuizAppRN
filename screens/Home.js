import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Banner from "../components/Banner";

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Banner />
            <View style={styles.heroSectionContainer}>
                <Image
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/my-image-bucket-b421d.appspot.com/o/MyOwnLogo%2FQuiz.jpg?alt=media&token=01aa6b98-9772-4331-8610-5f5b3e02d0e8"
                }} 
                resizeMode="contain"
                style={styles.heroSection}
                
                />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => navigation.navigate("Quiz")}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    heroSectionContainer:{
        justifyContent:"center",
        alignItems: "center",
        flex: 1
    },
    heroSection: {
        width: 330,
        height: 300,
        borderRadius: 16
    },
    container: {
        color: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%'
    },
    button: {
        width: '100%',
        backgroundColor: "#1A759F",
        padding: 16,
        borderRadius: 16,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: "#fff"
    },
});

export default Home;