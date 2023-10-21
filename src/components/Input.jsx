import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors } from '../thems/colors';
import { spacing } from '../thems/spacing';

export default function Input({placeholder, secureTextEntry, onChangeText}) {
  return (
    <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry ={secureTextEntry}
          onChangeText={onChangeText}
        />
      
  )
}


const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors.grey,
      padding: spacing[2],
      marginBottom: spacing[2],
    },
    
  });