import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { colors } from "../thems/colors";
import { spacing } from "../thems/spacing";

export default function SignUp() {
  const navigation = useNavigation();
  const genderOption = ["Male", "Female"];

  // state
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("")


// firebase auth instance
const auth = getAuth();



  const signUp = ()=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input placeholder={"Enter Email Address"} onChangeText={(text)=>setEmail(text)}/>
        <Input placeholder={"Enter Password"} secureTextEntry onChangeText={(text)=>setPassword(text)}/>
        <Input placeholder={"Enter Full Name"} onChangeText={(text)=>setName(text)} />
        <Input placeholder={"Enter Age"} onChangeText={(text)=>setAge(text)}/>

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
