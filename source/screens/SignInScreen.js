import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function SignInScreen({ route }) {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(''); 

    const navigation = useNavigation()
    const { userList } = route.params
    
    const [newUserList, setNewUserList] = useState([])

    React.useEffect(() => {
        if (route.params?.userList) {
            setNewUserList(route.params.userList)
            console.log(userList)
        }
    }, [route.params?.userList])

    const createUser = async () => {
        if (user != null && email != null && password != null) {
            const newUser = { user, email, password }
            const users = [...userList, newUser]
            try {
                await AsyncStorage.setItem('userList', JSON.stringify(users))
                navigation.replace('Login', { userList: users })
            } catch (error) {
                console.error('Error, no se pudo crear la cuenta',error);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>UserName</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your full name"
                onChangeText={setUser}>
            </TextInput>
            <Text style={styles.text}>Email</Text>
            <TextInput
                style={styles.textInput}
                keyboardType='email-address'
                placeholder="Enter your email address"
                onChangeText={setEmail}>
            </TextInput>
            <Text style={styles.text}>Password</Text>
            <TextInput
                style={styles.textInput}
                keyboardType='email-address'
                placeholder="Enter your Password"
                onChangeText={setPassword}>
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={createUser}>
                <Text style={styles.buttonText}>Create account</Text>
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