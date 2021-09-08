import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Home from './pages/Home';

import AddCategory from './pages/AddCategory';
import ListCategory from './pages/ListCategory';

import AddDish from './pages/AddDish';
import ListDish from './pages/ListDish';

import AddMenu from './pages/AddMenu';
import ViewMenus from './pages/ViewMenus';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator 
                initialRouteName="Home" 
                screenOptions={{ headerShown: false }}
            >
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