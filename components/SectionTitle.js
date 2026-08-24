import { Ionicons } from "@expo/vector-icons"
import {View, Text, Pressable, StyleSheet} from "react-native"


export default function sectionTitle ({
    onPress,
    title,
    showSeeAll= true,
}){
    return (
        <View style= {styles.container}>
            <Text style={styles.title}>{title}</Text>


        {showSeeAll && ( 
            <Pressable onPress={onPress}
                       style = {styles.seeAllContainer}>
                <Text style={styles.seeAll} >See all 

                <Ionicons
                   name="caret-forward"
                   size={16}
                   color = "#8b15b9"/>
                </Text>

            </Pressable>
            )}
        </View>
    )
} 

const styles = StyleSheet.create ({
    container: {
        marginTop: 25,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    
      title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#54275f",
      },

      seeAll: {
        flexDirection: "row",
        alignItems: "center",
      },
    
      seeAll: {
        color: "#8b15b9",
        fontWeight: "600",
        marginLeft: 150,
      },
})

