import React, { useState } from "react";
import { ActivityIndicator, FlatList, View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const localProducts = [
    {
        id: 101,
        title: "Sudadera Tech Fleece",
        price: 89.99,
        category: "men's clothing",
        description: "Sudadera Tech Fleece con capucha, tejido ligero y cálido, ideal para entrenamientos y uso casual.",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.8, count: 134 }
    },
    {
    id: 102,
    title: "Apple Watch Series 9 GPS 45mm",
    price: 429.99,
    category: "electronics",
    description: "Smartwatch Apple Watch Series 9 con pantalla Always-On Retina, chip S9, monitoreo de salud avanzado y hasta 18 horas de batería.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80",
    vendor: "TecStore Local",
    rating: { rate: 4.9, count: 1204 }
    },
    {
        id: 103,
        title: "Mochila Samsonite Guardit 2.0",
        price: 79.99,
        category: "women's clothing",
        description: "Mochila Samsonite resistente al agua con compartimento acolchado para laptop 15.6\", perfecta para trabajo y viaje.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.6, count: 412 }
    },
    {
        id: 104,
        title: "Sony WH-1000XM5",
        price: 279.99,
        category: "electronics",
        description: "Audífonos Sony con cancelación de ruido líder en la industria, 30 horas de batería y audio Hi-Res.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.9, count: 876 }
    },
    {
        id: 105,
        title: "Collar Pandora Moments",
        price: 59.99,
        category: "jewelery",
        description: "Collar Pandora de plata esterlina 925 con cierre de seguridad, compatible con charms originales.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.5, count: 203 }
    },
    {
        id: 106,
        title: "Playera Polo Ralph Lauren Classic",
        price: 89.99,
        category: "men's clothing",
        description: "Polo Ralph Lauren de piqué de algodón 100%, corte slim fit con logo bordado icónico.",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.6, count: 567 }
    },
    {
        id: 107,
        title: "Logitech MX Master 3S",
        price: 99.99,
        category: "electronics",
        description: "Mouse inalámbrico Logitech con sensor de 8000 DPI, rueda MagSpeed y conexión Bluetooth/USB.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.8, count: 1023 }
    },
    {
        id: 108,
        title: "Aretes Swarovski Crystal",
        price: 49.99,
        category: "jewelery",
        description: "Aretes Swarovski con cristales austriacos genuinos, baño en rodio plateado, hipoalergénicos.",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.4, count: 178 }
    },
    {
        id: 109,
        title: "Vestido Zara Floral Midi",
        price: 49.99,
        category: "women's clothing",
        description: "Vestido midi floral Zara de viscosa, manga corta con escote en V, tallas XS a XL disponibles.",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.7, count: 341 }
    },
    {
        id: 110,
        title: "Lámpara BenQ ScreenBar Halo",
        price: 149.99,
        category: "electronics",
        description: "Lámpara de monitor BenQ con iluminación trasera, sensor automático de luz y control táctil sin deslumbramiento.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
        vendor: "TecStore Local",
        rating: { rate: 4.8, count: 445 }
    }
];

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

            setProducts([...localProducts, ...productsWithExtras])
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            console.log(error.message)
        })
    }
            
    const filteredProducts =
        selectedCategory ? products.filter((p) => p.category === selectedCategory) : products
    
        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Tec-Commerce</Text>
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
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { products: item })}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.title}</Text>
                                <Text style={{ fontSize: 18, textAlign: 'center', color: '#00a650', fontWeight: 'bold', }}> $ {item.price}</Text>
                                {item.vendor === "TecStore Local" && (<Text style={styles.localBadge}>Producto Local</Text>)}
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )
            }
        </View>
    </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
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
    },
    pickerContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 8,
        elevation: 2
    },
    localBadge: {
        textAlign: 'center',
        color: '#190bd4',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 4
    }
})