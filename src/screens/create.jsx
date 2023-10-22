import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import Button from "../components/Button";

export default function Create() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Create....</Text>

      <Button
        title="Home"
        customStyles={{ alignSelf: "center", marginBottom: 40 }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <Button
        title="Edit"
        customStyles={{ alignSelf: "center", marginBottom: 40 }}
        onPress={() => {
          navigation.navigate("Edit");
        }}
      />
    </SafeAreaView>
  );
}
