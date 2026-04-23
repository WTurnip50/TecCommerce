import React, { useState } from "react";
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function LoginScreen({ route }) {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [userList, setUserList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(''); 

    const navigation = useNavigation();

    React.useEffect(() => {
        const loadUserList = async () => {
            try {
                const savedUsers = await AsyncStorage.getItem('userList');
                if (savedUsers) setUserList(JSON.parse(savedUsers));
            } catch (error) {
                console.log('Error cargando usuarios', error);
            }
        };
        loadUserList();
    }, []);

    useFocusEffect(
    useCallback(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                BackHandler.exitApp();
                return true;
            }
        );

        return () => subscription.remove();
    }, [])
);
    const login = async () => {
        setErrorMsg('');

        if (!email.trim() || !password.trim()) {
            setErrorMsg('Por favor ingresa tu email y contraseña.');
            return;
        }

        if (userList.length === 0) {
        setErrorMsg('No existen usuarios registrados.');
        return;
    }

        const findUser = userList.find(
            (item) => item.email.trim().toLowerCase() === email.trim().toLowerCase()
                   && item.password === password
        );

        if (findUser) {
            try {
                await AsyncStorage.setItem('ActiveUser', JSON.stringify(findUser));
                navigation.navigate('HomeScreen', { userList }); 
            } catch (error) {
                console.log('Error guardando sesión', error);
            }
        } else {
            setErrorMsg('Email o contraseña incorrectos. Intenta de nuevo.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.Titles}>Tec-Commerce</Text>
            <Text>Please enter your credentials</Text>

            <Text>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(v) => { setEmail(v); setErrorMsg(''); }}
            />

            <Text>Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Please enter your password"
                secureTextEntry={true}
                onChangeText={(v) => { setPassword(v); setErrorMsg(''); }}
            />

            {errorMsg !== '' && (
                <Text style={styles.errorText}>{errorMsg}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text>If you are a new user please sign in for a new account</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SignIn', { userList })}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});