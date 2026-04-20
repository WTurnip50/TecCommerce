import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens Stack
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import ProductDetails from "../screens/ProductDetails";

//Screens Tabs
import NavigationTabs from "./NavigationTabs";


const Stack = createNativeStackNavigator()

export default function NavigationStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name ="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name = 'SignIn' component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "ProductDetails" component={ProductDetails} options={{headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={NavigationTabs} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}