import React from "react";
import { Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";

const Tabs = createBottomTabNavigator();

export default function NavigationTabs() {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') {
                        return <AntDesign name="home" size={size} color={color} />;
                    } else if (route.name === 'Cart') {
                        return <AntDesign name="shopping-cart" size={size} color={color} />;
                    } else if (route.name === 'Account') {
                        return <Entypo name="menu" size={size} color={color} />;
                    }
                },
                   
                tabBarActiveTintColor: '#3483fa',
                tabBarInactiveTintColor: 'gray',
            })}>

            <Tabs.Screen name="Home" component={HomeScreen}/>
            <Tabs.Screen name="Cart" component={CartScreen}/>
            <Tabs.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
        </Tabs.Navigator>
    );
}
