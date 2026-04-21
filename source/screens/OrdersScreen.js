import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function OrdersScreen() {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        }, [])
    );

    const loadOrders = async () => {
        try {
            const data = await AsyncStorage.getItem('orders');
            if (data) {
                const parsed = JSON.parse(data);

                setOrders([...parsed].reverse());
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.log("Error loading orders", error);
        }
    };

    if (selectedOrder) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle del Pedido</Text>

                <Text style={styles.info}>Fecha: {selectedOrder.date}</Text>

                <Text style={styles.info}>
                    Total: ${Number(selectedOrder.total).toFixed(2)}
                </Text>

                <FlatList
                    data={selectedOrder.items || []} 
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemCard}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={2}>{item.title}</Text>
                                <Text>Cantidad: {item.qty}</Text>
                                <Text>${item.price}</Text>
                            </View>
                        </View>
                    )}
                />
                <TouchableOpacity onPress={() => setSelectedOrder(null)}>
                    <Text style={styles.back}>⬅ Volver a pedidos</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mis Pedidos</Text>

            {orders.length === 0 ? (
                <Text>No hay pedidos aún</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => setSelectedOrder(item)}
                        >
                            <Text style={styles.date}>{item.date}</Text>

                            <Text>
                                Total: ${Number(item.total).toFixed(2)}
                            </Text>

                            <Text>Productos: {item.totalItems}</Text>
                        </TouchableOpacity>
                    )}
                />
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },

    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2
    },

    date: {
        fontWeight: 'bold',
        marginBottom: 5
    },

    info: {
        fontSize: 16,
        marginBottom: 5
    },

    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10
    },

    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 10
    },

    back: {
        marginTop: 15,
        color: '#3483fa',
        fontWeight: 'bold',
        fontSize: 16
    }
});