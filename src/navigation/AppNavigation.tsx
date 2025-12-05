import React, { useEffect } from 'react';
import PublicNavigation from './PublicNavigation';
import BootSplash from "react-native-bootsplash";
 export default function AppNavigation (){
  useEffect(() => {
   console.log("AppNavigation mounted - hiding splash screen");
           BootSplash.hide({ fade: true });


  }, [])
    return ( <PublicNavigation /> );
 }