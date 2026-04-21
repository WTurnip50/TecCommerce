import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function CartScreen() {

    const [cart, setCart] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            loadCart();
        }, [])
    );

    const loadCart = async () => {
        try {
            const data = await AsyncStorage.getItem('cart');
            if (data) {
                setCart(JSON.parse(data));
            } else {
                setCart([]);
            }
        } catch (error) {
            console.log("Error loading cart", error);
        }
    };

    const saveCart = async (updatedCart) => {
        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const increaseQty = (id) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
        saveCart(updated);
    };

    const decreaseQty = (id) => {
        const updated = cart
            .map(item =>
                item.id === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter(item => item.qty > 0);

        saveCart(updated);
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        saveCart(updated);
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
    };

    const handleBuy = async () => {
        if (cart.length === 0) return;

        try {
            const newOrder = {
                id: Date.now(),
                items: cart,
                total: getTotal(),
                totalItems: cart.reduce((sum, item) => sum + item.qty, 0),
                date: new Date().toLocaleString()
            };

            const existingOrders = await AsyncStorage.getItem('orders');
            const orders = existingOrders ? JSON.parse(existingOrders) : [];
            orders.push(newOrder);

            await AsyncStorage.setItem('orders', JSON.stringify(orders));

            await AsyncStorage.removeItem('cart');
            setCart([]);

            navigation.navigate('Orders'); 

        } catch (error) {
            console.log("Error saving order", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Carrito</Text>

            {cart.length === 0 ? (
                <Text style={styles.empty}>El carrito está vacío</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (

                            <View style={styles.card}>

                                <Image 
                                    source={{ uri: item.image }} 
                                    style={styles.image}
                                />

                                <View style={styles.info}>
                                    <Text style={styles.name} numberOfLines={2}>
                                        {item.title}
                                    </Text>

                                    <Text style={styles.price}>
                                        ${item.price}
                                    </Text>

                                    <View style={styles.qtyRow}>
                                        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                                            <Text style={styles.qtyBtn}>-</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.qtyText}>
                                            {item.qty}
                                        </Text>

                                        <TouchableOpacity onPress={() => increaseQty(item.id)}>
                                            <Text style={styles.qtyBtn}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                                        <Text style={styles.delete}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                    <Text style={styles.total}>
                        Total: ${getTotal()}
                    </Text>

                    <TouchableOpacity 
                        style={styles.buyButton} 
                        onPress={handleBuy}
                    >
                        <Text style={styles.buyText}>
                            Comprar
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },

    empty: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2
    },

    image: {
        width: 90,
        height: 90,
        marginRight: 10,
        borderRadius: 10
    },

    info: {
        flex: 1,
        justifyContent: 'space-between'
    },

    name: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    price: {
        fontSize: 16,
        color: '#00a650',
        fontWeight: 'bold'
    },

    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },

    qtyBtn: {
        fontSize: 18,
        marginHorizontal: 10,
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        borderRadius: 5
    },

    qtyText: {
        fontSize: 16
    },

    delete: {
        color: 'red',
        marginTop: 5
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },

    buyButton: {
        backgroundColor: '#3483fa',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    },

    buyText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});