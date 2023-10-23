import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RadioInput({ label, value, setValue, size = "big" }) {
  const isSelected = value === label;
 
  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.Container}>
        <View
          style={[
            styles.outerCircle,
            isSelected && styles.selectedOuterCircle,
            size === "big" && styles.bigOuterCircle,
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && styles.selectedInnerCircle,
              size === "big" && styles.bigInnerCircle,
            ]}
          >
          </View>
        </View>
        <Text style={styles.radioText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
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
    fontWeight:'bold'
  },
  selectedOuterCircle: {
    borderColor:"",
  },
  selectedInnerCircle: {
    backgroundColor:'#F5D949',
    borderColor: '#F5D949',
  },
  bigOuterCircle:{

  },
  bigInnerCircle:{
    
  }
});
