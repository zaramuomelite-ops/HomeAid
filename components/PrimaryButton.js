import { Ionicons } from "@expo/vector-icons";
import { Text,
         StyleSheet, 
         Pressable,
         View,
        ActivityIndicator,} from "react-native";

function PrimaryButton({children, 
                        onPress, 
                        style,
                        textColor = "white",
                        icon,
                        iconPosition = "left",
                        loading = false,
                        disabled = false,}){
    return(
        <View style={styles.container}>
   <Pressable 
   onPress={onPress}
   disabled = {disabled}
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

        {loading ? (
          <>
           < ActivityIndicator
           color = "#fff"
           size="small"
           style = {{marginRight: 10}}
         />

      <Text style={[styles.buttonText, {color: textColor}]}>
        Creating Account...
      </Text>
      </>
        ) : (
          <Text style={[styles.buttonText, {color: textColor}]}>
          {children}
        </Text>
        ) }
    

      

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
        fontSize: 16,
        fontWeight: "bold",
      },
    

      pressed: {
        opacity: 0.85,
      },

      content : {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },

      leftIcon: {
          position: "absolute",
          left: 20,
        
      },

      rightIcon: {
        position: "absolute",
        right: 20,
      },
});