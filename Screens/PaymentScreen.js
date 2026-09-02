import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function BookingConfirmedScreen({ route, navigation }) {
  const {
    professional,
    selectedDate,
    selectedTime,
    serviceAddress,
  } = route.params;

  const date = new Date(selectedDate);

  return (
    <View style={styles.screen}>

      {/* HEADER */}

      <View style={styles.header}>

        <Pressable
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#54275f"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Booking Status
        </Text>

        <Pressable
          style={styles.helpButton}
          onPress={() => {}}
        >
          <Ionicons
            name="headset-outline"
            size={21}
            color="#54275f"
          />

          <Text style={styles.helpText}>
            Help
          </Text>
        </Pressable>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* SUCCESS ICON */}

        <View style={styles.successIcon}>
          <Ionicons
            name="checkmark"
            size={45}
            color="#fff"
          />
        </View>


        {/* TITLE */}

        <Text style={styles.title}>
          Booking Confirmed!
        </Text>

        <Text style={styles.subtitle}>
          Your request has been accepted
        </Text>

        <Text style={styles.subtitle}>
          and {professional.name} is on the way 🚗
        </Text>


        {/* PROFESSIONAL CARD */}

        <View style={styles.professionalCard}>

          <View style={styles.imageContainer}>

            <Image
              source={professional.image}
              style={styles.professionalImage}
            />

          </View>


          <View style={styles.ratingBadge}>

            <Ionicons
              name="star"
              size={15}
              color="#16834a"
            />

            <Text style={styles.ratingText}>
              {professional.rating}
            </Text>

          </View>


          <Text style={styles.professionalName}>
            {professional.name}
          </Text>

          <View style={styles.professionRow}>

            <Ionicons
              name="flash"
              size={18}
              color="#8b15b9"
            />

            <Text style={styles.profession}>
              {professional.profession}
            </Text>

          </View>


          {/* ON THE WAY */}

          <View style={styles.statusBadge}>

            <Ionicons
              name="car"
              size={17}
              color="#16834a"
            />

            <Text style={styles.statusText}>
              On his way
            </Text>

          </View>

        </View>


        {/* ARRIVAL CARD */}

        <View style={styles.infoCard}>

          <View style={styles.arrivalRow}>

            <View style={styles.infoIcon}>

              <Ionicons
                name="time-outline"
                size={24}
                color="#8b15b9"
              />

            </View>

            <View style={styles.infoText}>

              <Text style={styles.infoLabel}>
                Arriving in
              </Text>

              <Text style={styles.arrivalTime}>
                15 – 20 min
              </Text>

            </View>

          </View>


          {/* MAP PREVIEW */}

          <Pressable
            style={styles.mapPreview}
            onPress={() =>
              navigation.navigate("TrackArtisan", {
                professional: professional,
              })
            }
          >

            <Ionicons
              name="location"
              size={32}
              color="#8b15b9"
            />

            <Text style={styles.mapText}>
              View location
            </Text>

          </Pressable>


          {/* ADDRESS */}

          <View style={styles.addressRow}>

            <Ionicons
              name="location-outline"
              size={22}
              color="#8b15b9"
            />

            <View style={styles.addressInfo}>

              <Text style={styles.infoLabel}>
                Service Address
              </Text>

              <Text style={styles.addressText}>
                {serviceAddress || "57 Marina, UBA House, Lagos Island"}
              </Text>

            </View>

          </View>

        </View>


        {/* TRACK BUTTON */}

        <Pressable
          style={styles.trackButton}
          onPress={() =>
            navigation.navigate("TrackArtisan", {
              professional: professional,
            })
          }
        >

          <Ionicons
            name="navigate-outline"
            size={23}
            color="#fff"
          />

          <Text style={styles.trackButtonText}>
            Track Artisan
          </Text>

        </Pressable>


        {/* CHAT BUTTON */}

        <Pressable
          style={styles.chatButton}
          onPress={() =>
            navigation.navigate("CustomerHome", {
               screen: "Messages",
               params: {
                professional: professional,
               },
            })
          }
        >

          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#54275f"
          />

          <Text style={styles.chatButtonText}>
            Chat with {professional.name}
          </Text>

        </Pressable>


        {/* CANCEL */}

        <Pressable
          style={styles.cancelButton}
          onPress={() => {}}
        >

          <Text style={styles.cancelText}>
            Cancel Request
          </Text>

        </Pressable>


      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#fbf9fc",
  },

  header: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: "#f5eef8",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#54275f",
  },

  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#ead8f0",
  },

  helpText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#54275f",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },

  successIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#8b15b9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#54275f",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },

  professionalCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  imageContainer: {
    borderWidth: 3,
    borderColor: "#8b15b9",
    borderRadius: 70,
    padding: 4,
  },

  professionalImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  ratingBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#e9f5ed",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
  },

  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16834a",
  },

  professionalName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#321b3b",
    marginTop: 12,
  },

  professionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },

  profession: {
    fontSize: 15,
    color: "#777",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#e9f5ed",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 14,
  },

  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16834a",
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
  },

  arrivalRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  infoIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#f3e5f7",
    justifyContent: "center",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 3,
  },

  arrivalTime: {
    fontSize: 18,
    fontWeight: "700",
    color: "#321b3b",
  },

  mapPreview: {
    height: 90,
    backgroundColor: "#f4eef7",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  mapText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  addressInfo: {
    flex: 1,
    marginLeft: 10,
  },

  addressText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },

  trackButton: {
    width: "100%",
    height: 54,
    borderRadius: 15,
    backgroundColor: "#8b15b9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 20,
  },

  trackButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  chatButton: {
    width: "100%",
    height: 52,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9c3df",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 10,
  },

  chatButtonText: {
    color: "#54275f",
    fontSize: 16,
    fontWeight: "600",
  },

  cancelButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },

  cancelText: {
    color: "#e53935",
    fontSize: 15,
    fontWeight: "600",
  },

});