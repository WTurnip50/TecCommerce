import React, { useState } from "react";
import { ActivityIndicator, FlatList, View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState("")

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
            const productsWithExtras = data.map((item) => ({
                ...item,
                vendor: "TecStore"
            }))
            setProducts(productsWithExtras)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            console.log(error.message)
        })
    }
    const filteredProducts =
        selectedCategory ? products.filter((p) => p.category === selectedCategory) : products
    return (
        <View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Todos" value="" />
                    <Picker.Item label="Men's clothing" value="men's clothing" />
                    <Picker.Item label="Women's clothing" value="women's clothing" />
                    <Picker.Item label="Jewelery" value="jewelery" />
                    <Picker.Item label="Electronics" value="electronics" />
                </Picker>
            </View>
            {isLoading ? (<ActivityIndicator color='red' size='large' />
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <FlatList showsVerticalScrollIndicator={false}
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { products: item })}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.title}</Text>
                                <Text style={{ fontSize: 18, textAlign: 'center', color: '#00a650', fontWeight: 'bold', }}> $ {item.price}</Text>
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
            resizeMode: 'center'
        },
        errorStyle: {
            color: 'red',
            fontSize: 18
        }
    }
)