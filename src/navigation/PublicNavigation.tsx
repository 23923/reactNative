import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screens/templates/LoginPage";
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
        </PublicStack.Navigator>
            )
}
export default PublicNavigation;