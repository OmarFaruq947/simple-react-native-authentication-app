import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { app } from "../../App";
import Button from "../components/Button";
import Input from "../components/Input";
import { colors } from "../thems/colors";
import { spacing } from "../thems/spacing";

export default function SignUp() {
  const navigation = useNavigation();
  const genderOption = ["Male", "Female"];
  const [loading, setLoading] = useState(false); // loading function

  const auth = getAuth(app);
  const db = getFirestore(app);

  // state
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  // firebase auth instance

  const signUp = async () => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("result-->", result);
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        age: age,
        uid: result.user.uid,
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: "ERROR 😢",
        description: "your email already exist",
        type: "danger",
      });
      setLoading(false);
    }
  };

  //loading
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItem: "center" }}>
        <ActivityIndicator color={colors.yellow} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder={"Enter Email Address"}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <Input
          placeholder={"Enter Password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Input
          placeholder={"Enter Full Name"}
          onChangeText={(text) => setName(text)}
          autoCapitalize={"words"}
        />
        <Input
          placeholder={"Enter Age"}
          onChangeText={(text) => setAge(text)}
        />

        <Text style={{ marginVertical: 16, fontSize: 16 }}> Select Gender</Text>
        {genderOption.map((option) => {
          const selected = option === gender;
          return (
            <Pressable
              key={option}
              style={styles.radioContainer}
              onPress={() => setGender(option)}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
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
          title="Submit"
          customStyles={{ alignSelf: "center", marginBottom: 40 }}
          onPress={signUp}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>
            Already have an account ? <Text style={styles.signUp}>Sign In</Text>
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
    marginBottom: spacing[2],
  },
  signUp: {
    fontWeight: "bold",
    color: colors.blue,
    textDecorationLine: "underline",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    padding: 7,
  },
  radioText: {
    marginLeft: 10,
  },
  selectedOuterCircle: {
    borderColor: colors.yellow,
  },
  selectedInnerCircle: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
});
