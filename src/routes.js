import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Home from './Pages/Home';

import AddDish from './Pages/AddDish';
import ListDish from './Pages/ListDish';

import AddMenu from './Pages/AddMenu';
import ViewMenus from './Pages/ViewMenus';

import AddCategory from './Pages/AddCategory';
import ListCategory from './Pages/ListCategory';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="ListCategory" component={ListCategory}/>
                <AppStack.Screen name="AddCategory" component={AddCategory}/>
                <AppStack.Screen name="ListDish" component={ListDish}/>
                <AppStack.Screen name="AddDish" component={AddDish}/>
                <AppStack.Screen name="AddMenu" component={AddMenu}/>
                <AppStack.Screen name="ViewMenus" component={ViewMenus}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}