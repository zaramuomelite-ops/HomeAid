import { Text, TextInput, View, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";



function InputField ({label,
                     placeholder,
                     icon,
                     secureTextEntry,
                     value,
                     onChangeText,
                     error,
                     errorMessage,
                     keyboardType,
                     showCountryCode = false,
}){
  const [hidePassword, setHidePassword] = useState(true)
    return (
        <View style={styles.container}>
            <Text style ={ styles.label}>
                {label}
            </Text>
           
          <View style={styles.inputContainer}>
             
              {secureTextEntry ? ( 
                <Pressable 
                 onPress={() => setHidePassword(!hidePassword)}>
                 <Ionicons
                   name={hidePassword ? "eye-off": "eye"}
                   size={22}
                   color={"#8b15b9"}
                  />
                </Pressable>
              ): (
             <Ionicons
               name={icon}
               size={22}
               color= "#8b15b9"
                />)}

      {showCountryCode && (
          <View style={styles.countryCode}>
            <Text style={styles.countryText}>+234</Text>
          </View>
        )}

            <TextInput
               placeholder={placeholder}
               value = {value}
               onChangeText={onChangeText}
               style={styles.input}
               secureTextEntry={secureTextEntry ? hidePassword : false}
               keyboardType= {keyboardType}
               />
           </View>

            { error && (
              <Text style= {styles.errorText}>{errorMessage}</Text>
            )}

           
        
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
      marginBottom: 20,
    },
  
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color : "#9226a0"
    },
  
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#d7b8f3",
      borderRadius: 15,
      paddingHorizontal: 15,
      height: 60,
      backgroundColor: "white",
      width: 350,
      
    },
  
    input: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: "#8b15b9"
    },

    
    errorText: {
      color: "red",
      marginTop: 5,
      alignSelf: "flex-start",
      fontSize: 12,
    },

    countryCode: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
      borderRightWidth: 1,
      borderRightColor: "#d7b8f3",
      marginRight: 10,
    },
    
    countryText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#8b15b9",
    },
  
  });

export default InputField;