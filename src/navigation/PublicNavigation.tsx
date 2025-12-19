import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screens/templates/LoginPage";
import HomePage from "../screens/templates/HomePage";
import CategoriesPage from "../screens/templates/CategoriesPage";
import SearchPage from "../screens/templates/SearchPage";
import ProductDetailPage from "../screens/templates/ProductDetailPage";
import React from "react";

const PublicStack = createNativeStackNavigator();

 const PublicNavigation = () => {
    return (
        <PublicStack.Navigator initialRouteName={"Login"}
        screenOptions={{ animation: 'slide_from_right', animationTypeForReplace: "pop"}}>
            <PublicStack.Screen
             name="Login" 
             component={LoginPage} 
             options={{header:()=>null}}
             initialParams={undefined}
             />
            <PublicStack.Screen
             name="Home" 
             component={HomePage} 
             options={{header:()=>null}}
             />
            <PublicStack.Screen
             name="Categories" 
             component={CategoriesPage} 
             options={{header:()=>null}}
             />
            <PublicStack.Screen
             name="Search" 
             component={SearchPage} 
             options={{header:()=>null}}
             />
            <PublicStack.Screen
             name="ProductDetail" 
             component={ProductDetailPage} 
             options={{header:()=>null}}
             />
        </PublicStack.Navigator>
            )
}
export default PublicNavigation;