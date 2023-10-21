import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Create from "./src/screens/create";
import Edit from "./src/screens/edit";
import Home from "./src/screens/home";
import SignIn from "./src/screens/signIn";
import SignUp from "./src/screens/signUp";
import { initializeApp } from "firebase/app";


//firebase start

const firebaseConfig = {
  apiKey: "AIzaSyBw1eLqrdtihEGJVptDgcu7d8BCy41KZZk",
  authDomain: "native-authentication-b44b5.firebaseapp.com",
  projectId: "native-authentication-b44b5",
  storageBucket: "native-authentication-b44b5.appspot.com",
  messagingSenderId: "586876853183",
  appId: "1:586876853183:web:22f254fa16b8d9ccb5df0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase end










const Stack = createNativeStackNavigator();


// const AppTheme = {
//   ...DefaultTheme,
//   colors:{
//     ...DefaultTheme.colors,
//     background:'#fff',
//   }
// }


export default function App() {
  const user = false; // not authenticated
  return (
    <NavigationContainer >
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            {/* options={{headerShown:false}} */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
