import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { React, useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import Create from "./src/screens/create";
import Edit from "./src/screens/edit";
import Home from "./src/screens/home";
import SignIn from "./src/screens/signIn";
import SignUp from "./src/screens/signUp";
import { colors } from "./src/thems/colors";

//firebase start

const firebaseConfig = {
  apiKey: "AIzaSyBw1eLqrdtihEGJVptDgcu7d8BCy41KZZk",
  authDomain: "native-authentication-b44b5.firebaseapp.com",
  projectId: "native-authentication-b44b5",
  storageBucket: "native-authentication-b44b5.appspot.com",
  messagingSenderId: "586876853183",
  appId: "1:586876853183:web:22f254fa16b8d9ccb5df0a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//firebase end

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false); // loading function
  const [user, setUser] = useState(null); // not authenticated

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscription;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItem: "center" }}>
        <ActivityIndicator color={colors.yellow} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            {/* options={{headerShown:false}} */}
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
