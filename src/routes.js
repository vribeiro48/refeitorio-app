import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Home from './Pages/Home';
import AddMenu from './Pages/AddMenu';
import AddDish from './Pages/AddDish';
import ViewMenus from './Pages/ViewMenus';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="AddMenu" component={AddMenu}/>
                <AppStack.Screen name="AddDish" component={AddDish}/>
                <AppStack.Screen name="ViewMenus" component={ViewMenus}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}