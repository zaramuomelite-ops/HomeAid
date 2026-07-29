import { Ionicons } from "@expo/vector-icons";
import { Text,
         StyleSheet, 
         Pressable,
         View,} from "react-native";

function PrimaryButton({children, 
                        onPress, 
                        style,
                        icon,
                        iconPosition = "left",}){
    return(
        <View style={styles.container}>
   <Pressable 
   onPress={onPress}
   android_ripple={{color: "#230f79", foreground: true}}
   style={ ({ pressed }) => [
    styles.button, 
    style,
    pressed && styles.pressed,
   ]}
    >

      <View style={styles.content}>

        {icon && iconPosition === "left" && (
            <Ionicons
            name = {icon}
            size = {22}
            style = {styles.leftIcon}
            color = "#8b15b9"
            />
        )}

      <Text style={styles.buttonText}>{children}</Text>

      {icon && iconPosition === "right" && (
            <Ionicons
            name = {icon}
            size = {22}
            style = {styles.rightIcon}
            color = "#8b15b9"
            />
        )}

      </View>
   

   </Pressable>  
   </View>
   )  
}

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#8b15b9",
        paddingVertical: 15,
        width: 320,         
        alignItems: "center",
        borderRadius: 15,
        overflow: "hidden"
      },
    
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
    

      pressed: {
        opacity: 0.85,
      },

      content : {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },

      leftIcon: {
        marginRight: 25,
      },

      rightIcon: {
        marginLeft: 25,
      },
});