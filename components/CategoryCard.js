import {View, Text, Pressable, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function sectionTitle ({
    onPress,
    icon,
    title,
}){
    return (
        <Pressable
        style={styles.card}
        onPress={onPress}>
        
         <View style={styles.iconContainer}>
            <Ionicons
              name={icon}
              size={23}
              color= "#8b15b9"/>
         </View>

         <Text style={styles.title}>
            {title}
         </Text>
         
         </Pressable>
    );
}

const styles = StyleSheet.create ({
    card: {
        width: 95,
        height: 110,
        backgroundColor: "white",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        marginRight: 15,
      },
    
      iconContainer: {
        width: 55,
        height: 55,
        borderRadius: 20,
        backgroundColor: "#f4e7fa",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      },
    
      title: {
        textAlign: "center",
        fontWeight: "600",
        color: "#444",
        fontSize: 13,
      },
});