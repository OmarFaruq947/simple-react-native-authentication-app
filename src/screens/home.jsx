import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { db } from "../../App";
import { colors } from "../thems/colors";

export default function Home({ user }) {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  //Nots listener or data read start
  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({...doc.data(), id:doc.id});
      });
      setNotes(list);
    });
    return notesListenerSubscription;
  }, []);
  // console.log("NOTES--->", notes);
  //Nots listener or data read start

  const renderItem = ({ item }) => {
    const { title, description, color } = item;

    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 16,
          padding: 15,
        }}
        onPress={() => {
          navigation.navigate("Edit", { item });
        }}
      >
        {/* delete pregnable */}
        <Pressable
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 2,
            zIndex: 5,
          }}
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id)) ;
          }}
        >
          <MaterialCommunityIcons
            name="delete-circle"
            size={30}
            color="white"
          />
        </Pressable>

        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          {title}
        </Text>
        <Text style={{ color: "white", fontSize: 11 }}>{description}</Text>
      </Pressable>
    );
  };

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.yellow,
        }}
      >
        <Text style={{ fontSize: 16 }}>Add Your important Notes</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Create");
          }}
        >
          <AntDesign name="pluscircleo" size={30} color={colors.yellow} />
        </Pressable>
      </View>

      <View>
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
