import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../App";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";

const noteColorOption = ["red", "blue", "green"];
export default function Create({ user }) {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid,
      });
      setLoading(false);
      showMessage({
        message: "Note created successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: "ERROR 😢",
        description: "Note create failed 😭",
        type: "danger",
        backgroundColor: "#070724",
        color: "#F5D949",
        style: { justifyContent: "center", alignItems: "center" },
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Image
        source={require("../../assets/writting.png")}
        style={{
          alignSelf: "center",
          width: 150,
          height: 150,
          marginVertical: 20,
        }}
      />

      <Input
        placeholder={"Title"}
        onChangeText={(text) => setTitle(text)}
        autoCapitalize={"words"}
      />
      <Input
        placeholder={"Description"}
        onChangeText={(text) => setDescription(text)}
        autoCapitalize={"words"}
        multiline={true}
      />

      <View style={{ marginBottom: 15, marginTop: 25 }}>
        <Text>Select your vote color</Text>
      </View>

      {noteColorOption.map((option, index) => (
        <RadioInput
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Submit"
          customStyles={{ marginTop: "60", alignSelf: "center", width: "100%" }}
          onPress={onPressCreate}
        />
      )}
    </SafeAreaView>
  );
}
