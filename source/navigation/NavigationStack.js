import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
const Stack = createNativeStackNavigator()

export default function NavigationStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name ="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name = 'SignIn' component={SignInScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}