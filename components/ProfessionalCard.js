import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfessionalCard({
  name,
  profession,
  rating,
  distance,
  image,
  onPress,

}) {
  return (
    <Pressable
     style={styles.ripple}
     onPress={onPress}
     android_ripple={{color: "#a3a2a736", foreground: true}}>
    <View style={styles.card}>

      <Image
        source={image}
        style={styles.image}
      />

      <View style={styles.details}>

        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.profession}>
          {profession}
        </Text>

        <View style={styles.infoRow}>

          <View style={styles.rating}>
            <Ionicons
              name="star"
              size={15}
              color="#f5b800"
            />

            <Text style={styles.infoText}>
              {rating}
            </Text>
          </View>

          <View style={styles.distance}>
            <Ionicons
              name="location-outline"
              size={15}
              color="#777"
            />

            <Text style={styles.infoText}>
              {distance}
            </Text>
          </View>

        </View>

      </View>

    <View
       style={styles.bookButtonWrapper}>
      <Pressable
        style={styles.bookButton}
        onPress={onPress}
        android_ripple={{color: "#230f79"}}
      >
        <Text style={styles.bookText}>
          Book
        </Text>
      </Pressable>
    </View>

    </View>
    </Pressable>
 
  );
}

const styles = StyleSheet.create({

    card: {
      backgroundColor: "#fff",
      padding: 15,
      flexDirection: "row",
      alignItems: "center",
  
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },

    ripple: {
      width: "90%",
      borderRadius: 18,
      overflow: "hidden",
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    
    image: {
      width: 65,
      height: 65,
      borderRadius: 33,
    },
  
    details: {
      flex: 1,
      marginLeft: 12,
    },
  
    name: {
      fontSize: 16,
      fontWeight: "700",
      color: "#333",
    },
  
    profession: {
      fontSize: 13,
      color: "#777",
      marginTop: 3,
    },
  
    infoRow: {
      flexDirection: "row",
      marginTop: 7,
    },
  
    rating: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 12,
    },
  
    distance: {
      flexDirection: "row",
      alignItems: "center",
    },
  
    infoText: {
      fontSize: 12,
      color: "#666",
      marginLeft: 3,
    },
  
    bookButton: {
      backgroundColor: "#8b15b9",
      paddingVertical: 9,
      paddingHorizontal: 14,
    },

    bookButtonWrapper: {
      borderRadius: 10,
      overflow: "hidden",
    },
  
    bookText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 12,
    },
  
  });