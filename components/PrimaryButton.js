import { Text,
         StyleSheet, 
         Pressable,
         View,} from "react-native";

function PrimaryButton({children, onPress, style}){
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
    <Text style={styles.buttonText}>{children}</Text>

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
});