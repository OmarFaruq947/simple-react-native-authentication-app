import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import Button from "../components/Button";

export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home...</Text>
      <Button
        title="Edit"
        customStyles={{ alignSelf: "center", marginBottom: 40 }}
        onPress={() => {
          navigation.navigate("Edit");
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
