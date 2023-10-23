import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
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
export default function Edit({ route, user }) {
  const noteItem = route.params.item;
  const navigation = useNavigation();

  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressEdit = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id),{
        title:title,
        description:description,
        color:noteColor
      });
      setLoading(false);
      showMessage({
        message: "Note Edit successfully 👌",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log("Update Error---->",error);
      // showMessage({
      //   message: "ERROR 😢",
      //   description: "Note Edit failed 😭",
      //   type: "danger",
      //   backgroundColor: "#070724",
      //   color: "#F5D949",
      //   style: { justifyContent: "center", alignItems: "center" },
      // });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Image
        source={require("../../assets/update.png")}
        style={{
          alignSelf: "center",
          width: 250,
          height: 150,
          marginVertical: 20,
        }}
      />

      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
        
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
          title="Update"
          customStyles={{ marginTop: "60", alignSelf: "center", width: "100%" }}
          onPress={onPressEdit}
        />
      )}
    </SafeAreaView>
  );
}
