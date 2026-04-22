import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetails({ route, navigation }) {
    const { products } = route.params
    const [cart, setCart] = useState([])

    const addToCart = async () => {
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
            <ScrollView contentContainerStyle={styles.scrollContent }>
                <Text style={styles.title}>{products.title}</Text>
                <Image source={{ uri: products.image }} style={styles.image} />
                <Text style={styles.fields}>Vendor: {products.vendor}</Text>
                <Text style={styles.fields}>Price: ${products.price}</Text>
                <Text style={styles.fields}>Category: {products.category}</Text>
                <Text style={styles.fields}>Rating: {products.rating.rate}/5</Text>
                <Text style={styles.fields}>Reviews: {products.rating.count}</Text>
                <Text style={styles.fields}>Description: </Text>
                <Text style={styles.description}>{products.description}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Go back to home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Addbutton} onPress={addToCart}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        scrollContent: {
            flexGrow: 1, 
            padding: 10,
            alignItems: "center",
            justifyContent: 'center'
        },
        image: {
            height: 200,
            width: 200,
            resizeMode: 'center'
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            padding: 6,
            marginBottom: 3,
        },
        fields: {
            fontSize: 14,
            fontWeight: 'bold',
            padding: 10
        },
        description: {
            fontSize: 14,
            padding: 10,
            justifyContent: 'center'
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            padding: 15
        },
        Addbutton: {
            backgroundColor: '#57a773',
            padding: 10,
            borderRadius: 5,
            margin: 20,
            marginBottom: 30
        },
        Backbutton: {
            backgroundColor: '#bd3939',
            padding: 10,
            borderRadius: 5,
            margin: 20,
            marginBottom: 30
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold'
        },
    }

)