import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={22}
        color="#8b15b9"
      />

      <TextInput
        style={styles.input}
        placeholder="Search for a service..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable onPress={onFilterPress}>
        <Ionicons
          name="options-outline"
          size={22}
          color="#8b15b9"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 55,
    elevation: 3,
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
});