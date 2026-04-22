import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
    const [activeUser, setActiveUser] = useState(null)
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        const loadActiveUserData = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('ActiveUser')
                if (savedUser) {
                    setActiveUser(JSON.parse(savedUser))
                    //console.log(activeUser)
                }
            } catch (error) {
                console.log('Error active user not found', error)
            }
        }
        loadActiveUserData()
    }, [])

    useEffect(() => {
        if (activeUser) {
            //console.log("Usuario activo cargado:", activeUser);
            setUserName(activeUser.user)
            setUserEmail(activeUser.email)
        }
    }, [activeUser])

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('ActiveUser');
            navigation.replace('Login')
        } catch (error) {
            console.log('This should not happen', error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.userTitle}>Mi perfil</Text>
            <SafeAreaView style={styles.userContainer}>
                <Image source={require('../resources/userIcon.png')}
                    style={styles.image} />
                <Text style={styles.userTitle}> {userName}</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.optionsContainer}>
                <Text style={styles.texts}> Username :{userName}</Text>
                <Text style={styles.texts}> Email : {userEmail}</Text>
                <TouchableOpacity onPress={logout}>
                    <Text style={styles.texts}> Cerrar sesión</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#57a773',
            marginTop: 35
        },
        userContainer: {
            backgroundColor: '#57a773',
            height: 'auto',
            width: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            marginBottom: 30,
            marginTop: 30
        },
        optionsContainer: {
            flex: 1,
            backgroundColor: '#fff'
        },
        texts: {
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
        },
        userTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            padding: 10,
            color: '#fff'
        },
        image: {
            width: 100,
            height: 100,
            resizeMode: 'stretch'
        },
        buttonContainer: {
            height: 'auto',
            width: 'auto',
            alignContent: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            fontSize: 28,
            fontWeight: 'bold',
            margin: 15
        }
    }
)
