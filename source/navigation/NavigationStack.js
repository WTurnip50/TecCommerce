import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens Stack
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import ProductDetails from "../screens/ProductDetails";

//Screens Tabs
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";


//Navigators
const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

function TabsNavigation(){
    return(
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={HomeScreen}/>
            <Tabs.Screen name="Account" component={AccountScreen} options={{headerShown: false}}/>
        </Tabs.Navigator>
    )
}

export default function NavigationStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name ="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name = 'SignIn' component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "ProductDetails" component={ProductDetails} options={{headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={TabsNavigation} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}