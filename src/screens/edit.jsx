import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import Button from "../components/Button";

export default function Edit() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Edit....</Text>
      <Button
        title="Home"
        customStyles={{ alignSelf: "center", marginBottom: 40 }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />

      <Button
        title="Create"
        customStyles={{ alignSelf: "center", marginBottom: 40 }}
        onPress={() => {
          navigation.navigate("Create");
        }}
      />
    </SafeAreaView>
  );
}
