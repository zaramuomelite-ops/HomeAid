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

      <Pressable
        style={styles.bookButton}
        onPress={onPress}
      >
        <Text style={styles.bookText}>
          Book
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

    card: {
      width: "90%",
      backgroundColor: "#fff",
      borderRadius: 18,
      padding: 15,
      marginTop: 15,
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
      borderRadius: 10,
    },
  
    bookText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 12,
    },
  
  });