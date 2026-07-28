import { Text,
         StyleSheet, 
         Pressable,
         View,} from "react-native";

function PrimaryButton({children, onPress, style}){
    return(
        <View style={styles.container}>
   <Pressable 
   onPress={onPress}
   style={[
    styles.button, style]}
   android_ripple={{color: "#230f79", borderless: false}}
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
      },
    
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
    
      container: {
        borderRadius: 15,
        overflow: "hidden",
        
      },
});