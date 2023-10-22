import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Button from "../components/Button";
import Input from "../components/Input";
import { colors } from "../thems/colors";
import { spacing } from "../thems/spacing";

export default function SignIn() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // loading function

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //signIn

  const signIn = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("sign In -> ", user);
        setLoading(false);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        showMessage({
          message: "ERROR 😢",
          description: "give the correct email & password",
          type: "danger",
          backgroundColor: "#070724",
          color: "#F5D949",
          style: { justifyContent: "center", alignItems: "center" },
        });
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItem: "center" }}>
        <ActivityIndicator color={colors.yellow} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/sign-in.png")}
        style={{ alignSelf: "center", width: 300, height: 300 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Never forget Your notes
      </Text>

      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder={"Enter Email Address"}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <Input
          placeholder={"Enter Password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={false}
        />
      </View>

      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Button
          title="Sign In"
          customStyles={{ alignSelf: "center", marginBottom: 40 }}
          onPress={signIn}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>
            Don't have an account ? <Text style={styles.signIn}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: spacing[2],
    marginBottom: spacing[5],
  },
  signIn: {
    fontWeight: "bold",
    color: colors.blue,
    textDecorationLine: "underline",
  },
});
