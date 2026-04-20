import React, { useState } from "react";
import { ActivityIndicator,FlatList,View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const HomeScreen = ({navigation}) => {
    const [products, setProducts] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    React.useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        const URL = "https://fakestoreapi.com/products"

        fetch(URL).then((res) => {
            if (!res.ok) {
                throw new Error("Something bad is happening, send HELP")
            }
            return res.json()
        }).then((data) => {
            setProducts(data)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            console.log(error.message)
        })
    }
    return (
        <View>{
            isLoading ? (<ActivityIndicator color='red' size='large' />
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <FlatList showsVerticalScrollIndicator={false}
                    data={products}
                    renderItem={({ item }) => (
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { products: item })}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )
        }
        </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create(
    {
        contentContainer: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            marginTop: 20,
        },
        image: {
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginBottom: 10,
        },
        errorStyle: {
            color: 'red',
            fontSize: 18
        }
    }
)