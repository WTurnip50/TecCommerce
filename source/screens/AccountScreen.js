import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen() {
    const [activeUser, setActiveUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const saved = await AsyncStorage.getItem('ActiveUser');
            if (saved) {
                const parsed = JSON.parse(saved);
                setActiveUser(parsed);
                setUserName(parsed.user);
                setUserEmail(parsed.email);
                setUserPassword(parsed.password);
            }
        } catch (error) {
            console.log('Error cargando usuario', error);
        }
    };

    const saveChanges = async () => {
        if (!userName.trim() || !userEmail.trim() || !userPassword.trim()) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }
        try {
            const updatedUser = { ...activeUser, user: userName, email: userEmail, password: userPassword };
            await AsyncStorage.setItem('ActiveUser', JSON.stringify(updatedUser));
            const raw = await AsyncStorage.getItem('userList');
            if (raw) {
                const list = JSON.parse(raw);
                const updatedList = list.map((u) => u.email === activeUser.email ? updatedUser : u);
                await AsyncStorage.setItem('userList', JSON.stringify(updatedList));
            }
            setActiveUser(updatedUser);
            setEditMode(false);
            Alert.alert("✅ Éxito","Perfil actualizado correctamente.");
        } catch (error) {
            console.log('Error actualizando usuario', error);
        }
    };

    const deleteAccount = () => {
        Alert.alert("Eliminar cuenta", "¿Estás seguro? Esta acción no se puede deshacer.", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar", style: "destructive",
                onPress: async () => {
                    try {
                        const raw = await AsyncStorage.getItem('userList');
                        if (raw) {
                            const list = JSON.parse(raw);
                            const filtered = list.filter((u) => u.email !== activeUser.email);
                            await AsyncStorage.setItem('userList', JSON.stringify(filtered));
                        }
                        await AsyncStorage.removeItem('ActiveUser');
                        navigation.replace('Login');
                    } catch (error) {
                        console.log('Error eliminando cuenta', error);
                    }
                }
            }
        ]);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('ActiveUser');
        navigation.replace('Login');
    };

    if (editMode) {
        return (
            <SafeAreaView style={styles.editContainer}>
                <Text style={styles.editAppName}>Tec-Commerce</Text>
                <Text style={styles.editSubtitle}>Edita tu perfil</Text>

                <Text style={styles.editLabel}>Nombre</Text>
                <TextInput
                    style={styles.editInput}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder="Tu nombre"
                />

                <Text style={styles.editLabel}>Email</Text>
                <TextInput
                    style={styles.editInput}
                    value={userEmail}
                    onChangeText={setUserEmail}
                    placeholder="Tu email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.editLabel}>Contraseña</Text>
                <TextInput
                    style={styles.editInput}
                    value={userPassword}
                    onChangeText={setUserPassword}
                    placeholder="Tu contraseña"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.editButton} onPress={saveChanges}>
                    <Text style={styles.editButtonText}>Guardar cambios</Text>
                </TouchableOpacity>

                <View style={styles.editDivider} />

                <TouchableOpacity style={[styles.editButton, { backgroundColor: '#aaa' }]} onPress={() => setEditMode(false)}>
                    <Text style={styles.editButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.userTitle}>Mi perfil</Text>
            <SafeAreaView style={styles.userContainer}>
                <Image source={require('../resources/userIcon.png')} style={styles.image} />
                <Text style={styles.userTitle}>{activeUser?.user}</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.optionsContainer}>
                <Text style={styles.texts}> Username: {activeUser?.user}</Text>
                <Text style={styles.texts}> Email: {activeUser?.email}</Text>

                <TouchableOpacity style={styles.actionBtn} onPress={() => setEditMode(true)}>
                    <Text style={styles.actionBtnText}>Editar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={deleteAccount}>
                    <Text style={styles.actionBtnText}>Eliminar cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, styles.logoutBtn]} onPress={logout}>
                    <Text style={styles.actionBtnText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#57a773',
        marginTop: 35
    },
    userContainer: {
        backgroundColor: '#57a773',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 30,
        marginTop: 30
    },
    optionsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    userTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 10,
        color: '#fff'
    },
    texts: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    actionBtn: {
        backgroundColor: '#57a773',
        marginHorizontal: 15,
        marginTop: 25,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    deleteBtn: {
        backgroundColor: '#e74c3c',
    },
    logoutBtn: {
        backgroundColor: '#aaa',
    },
    actionBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

    editContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    editAppName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#57a773',
        marginBottom: 6,
    },
    editSubtitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 30,
    },
    editLabel: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    editInput: {
        width: '100%',
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        fontSize: 15,
    },
    editButton: {
        backgroundColor: '#57a773',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
        marginTop: 8,
        width: '100%',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editDivider: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 20,
    },
});