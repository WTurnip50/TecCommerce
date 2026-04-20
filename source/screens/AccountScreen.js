import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
    const [activeUser, setActiveUser] = useState(null)
    const [userName, setUserName] = useState()
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
        }
    }, [activeUser])

    const logout = async () =>{
        try {
            await AsyncStorage.removeItem('ActiveUser');
            navigation.replace('Login')
        } catch (error) {
            console.log('This should not happen', error)
        } 
    }

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.userContainer}>
                <Image source={require('../resources/account-48px.png')}>
                </Image>
                <Text style={styles.userTitle}>{userName}</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Text style = {styles.buttonText}>Ver mi Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {styles.buttonText}>Ver mis compras</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                    <Text style = {styles.buttonText}>Cerrar la sesion</Text>

                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 35
        },
        userContainer: {
            backgroundColor: '#57a773',
            height: 'auto',
            width: 'auto',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: 45
        },
        userTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            padding: 10,
            color: '#fff'
        },
        image: {
            width: 48,
            height: 48,
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
            margin : 15
        }
    }
)
