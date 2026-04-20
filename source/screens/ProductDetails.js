import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetails({ route, navigation }) {
    const { products } = route.params
    const [cart,setCart]= useState([])

    const addToCart = async()=>{
        try {
            const data = await AsyncStorage.getItem('cart');
            let cart = data ? JSON.parse(data) : [];
            
            const exist = cart.find(item => item.id === products.id);
            
            if (exist) {
                cart = cart.map(item =>
                    item.id === products.id
                       ? { ...item, qty: item.qty + 1 }
                       : item
                );
            } else {
                cart.push({ ...products, qty: 1 });
            }
            
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
        
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{products.title}</Text>
            <Image source={{ uri: products.image }} style={styles.image} />
            <Text style={styles.fields}>Price: {products.price}</Text>
            <Text style={styles.fields}>Category: {products.category}</Text>
            <Text style={styles.fields}>Rating: {products.rating.rate}</Text>
            <Text style={styles.fields}>Reviews: {products.rating.count}</Text>
            <Text style={styles.fields}>Description: </Text>
            <Text style={styles.description}>{products.description}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Go back to home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={addToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: "#f2f2f2"
        },
        image: {
            height: 200,
            width: 200
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            padding: 10,
            marginBottom: 5,
        },
        fields: {
            fontSize: 16,
            fontWeight: 'bold',
            padding: 10
        },
        description: {
            fontSize: 16,
            padding: 10
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            padding : 15
        },
        button: {
            backgroundColor: '#57a773',
            padding: 10,
            borderRadius: 5,
            marginBottom: 20
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold'
        },
    }

)