import React, { useState } from "react";
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function LoginScreen({ route }) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.Titles}> Tec-Commerce</Text>
            <Text>Please enter your credentials</Text>
            <Text>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText={setUser}>
            </TextInput>
            <Text>Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Please enter your password"
                secureTextEntry={true}
                onChangeText={setPassword}
            >
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={() => console.log("boton presionado")}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text>If you are a new user please sign in for a new account</Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log("boton presionado")}>
                <Text style={styles.buttonText}>sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        },
        Titles: {
            fontSize: 28,
            fontWeight: 'bold',
            padding: 20
        },
        image: {
            width: 200,
            height: 200,
            margin: 30
        },
        button: {
            backgroundColor: '#57a773',
            padding: 15,
            borderRadius: 10,
            margin: 25
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold'
        },
        text: {
            fontSize: 18
        },
        textInput: {
            width: '80%',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            margin: 15
        },
        divider: {
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginVertical: 15
        }
    }
)