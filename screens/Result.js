import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const Result = ({ navigation, route }) => {

    const { score } = route.params

    const ImageBanner = score>40? "https://img.freepik.com/free-vector/team-happy-employees-winning-award-celebrating-success-business-people-enjoying-victory-getting-gold-cup-trophy-vector-illustration-reward-prize-champions-s_74855-8601.jpg?w=826&t=st=1672135675~exp=1672136275~hmac=52638fdfcff3264391a9760878b3caf62625d4d010a90c4b3eb995d7e6fd5de2"
    : "https://img.freepik.com/free-vector/loser-failure-success-winning-businessmen-composition-with-discouraged-man-broken-egg-shellvector-illustration_1284-63222.jpg?w=740&t=st=1672135786~exp=1672136386~hmac=960ad7087e18b2d455291462f7f9c625f38ce784acf2653420fdadabdad01cb9"
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.bannerTitle}>Quizzie</Text>
            </View>
            <Text style={styles.scoreValue}>{score}</Text>
            <View style={styles.heroSectionContainer}>
                <Image
                    source={{
                        uri: ImageBanner
                    }} 
                    resizeMode="contain"
                    style={styles.heroSection}
                    
                />
            </View>
              
            { score < 41 ? (
                <TouchableOpacity style={styles.tryButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Want to Try Again?</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                    <Text style={styles.buttonText}>GO TO HOME</Text>
                </TouchableOpacity>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%'
    },
    heroSectionContainer:{
        justifyContent:"center",
        alignItems: "center"
    },
    heroSection: {
        width: 300,
        height: 300,
        borderColor: 'white'
    },
    titleContainer: {
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    bannerTitle: {
        fontSize: 36,
        fontWeight: "800",
        color: "black"
    },
    scoreValue:{
        marginVertical: 20,
        fontSize: 30,
        fontWeight:'800',
        alignSelf:'center',
        color: "black"
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 30
        
    },
    tryButton: {
        width: '100%',
        backgroundColor: '#f44336',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 30
        
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
});

export default Result;