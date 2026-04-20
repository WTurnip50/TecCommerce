import React, { useState } from "react";
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ route }) {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [userList, setUserList] = useState([])
    const navigation = useNavigation()

    React.useEffect(() => {
        const loadUserList = async () => {
            try {
                const savedUsers = await AsyncStorage.getItem('userList')
                if (savedUsers) {
                    setUserList(JSON.parse(savedUsers))
                }
            } catch (error) {
                console.log('There is no active Users, please add one, if there is one, ask for help', error)
            }
        }
        loadUserList()
    }, [])

    const login = async () => {
        if (userList.length === 0) {
            navigation.navigate('SignIn', { userList: userList })
        } else {
            const findUser = userList.find((item) => item.email.trim().toLowerCase() === email.trim().toLowerCase() 
            && item.password === password)
            if (findUser) {
                //Saving user status as active
                try {
                    await AsyncStorage.setItem('ActiveUser', JSON.stringify(findUser))
                    console.log(findUser)
                    navigation.replace('HomeScreen', { userList })
                } catch (error) {
                    
                }
            } else {
                console.log('Error no se pudo iniciar sesion')
            }
        }
    }

    const deleteUsers = async () => {
        try {
            await AsyncStorage.removeItem('userList');
            setUserList([]);
        } catch (error) {
            console.log("Error al vaciar usuarios:", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.Titles}> Tec-Commerce</Text>
            <Text>Please enter your credentials</Text>
            <Text>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText={setEmail}>
            </TextInput>
            <Text>Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Please enter your password"
                secureTextEntry={true}
                onChangeText={setPassword}
            >
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text>If you are a new user please sign in for a new account</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SignIn', { userList: userList })}>
                <Text style={styles.buttonText}>sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={deleteUsers}>
                <Text style={styles.buttonText}>Borrar usuarios</Text>
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