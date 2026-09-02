import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning! 🌞";
  }

  if (hour >= 12 && hour < 17) {
    return "Good afternoon! ☀️";
  }

   return "Good evening! 🌆";

}

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MessagesScreen({ route, navigation }) {
  const {
    professional,
    selectedDate,
    selectedTime,
    serviceFee,
    bookingFee,
    totalAmount,
    serviceAddress,
  } = route.params || {};

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, [professional?.name]);

  // Convert the date string we passed through navigation
  const date = selectedDate
    ? new Date(selectedDate)
    : new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = selectedTime
    ? `${selectedTime.time} ${selectedTime.period}`
    : "10:00 AM";

    const sendMessage = () => {
      if (!message.trim()) return;
    
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
    
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
      ]);
    
      setMessage("");
    };

  return (
    <KeyboardAvoidingView
    style={styles.screen}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >

      {/*HEADER*/}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#8b15b9"
          />
        </Pressable>


        <Image
          source={professional?.image}
          style={styles.headerImage}
        />


        <View style={styles.headerInfo}>

          <Text
            style={styles.headerName}
            numberOfLines={1}
          >
            {professional?.name || "Professional"}
          </Text>

          <View style={styles.headerProfessionRow}>

            <Text style={styles.headerProfession}>
              {professional?.profession || "Professional"}
            </Text>

            <Text style={styles.headerDot}>
              •
            </Text>

            <Ionicons
              name="star"
              size={17}
              color="#8b15b9"
            />

            <Text style={styles.headerRating}>
              {professional?.rating || "4.6"}
            </Text>

          </View>


          <View style={styles.onlineRow}>

            <View style={styles.onlineDot} />

            <Text style={styles.onlineText}>
              Online
            </Text>

          </View>

        </View>


        {/* CALL */}

        <Pressable style={styles.headerIconButton}>

          <Ionicons
            name="call"
            size={25}
            color="#8b15b9"
          />

        </Pressable>


        {/* MORE */}

        <Pressable style={styles.headerIconButton}>

          <Ionicons
            name="ellipsis-vertical"
            size={25}
            color="#8b15b9"
          />

        </Pressable>

      </View>


      {/*CHAT AREA*/}

      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps = "handled"
      >


        {/*TODAY*/}

        <Text style={styles.todayText}>
          TODAY
        </Text>

        <Text style={styles.messageTime}>
           {getCurrentTime()}
        </Text>


        {/*ARTISAN MESSAGE*/}

        <View style={styles.messageRow}>

          <Image
            source={professional?.image}
            style={styles.messageAvatar}
          />

          <View style={styles.artisanMessage}>

          <Text>
            {getGreeting()}
              {"\n"}
              Thanks for reaching out.
              {"\n"}
              How may I help you today?
            </Text>

            <Text style={styles.messageTimestamp}>
            {getCurrentTime()}
            </Text>

          </View>

        </View>

        {/* YOUR MESSAGES */}

        {messages.map((item) => (
          <View
            key={item.id}
            style={styles.myMessageRow}
          >
            <View style={styles.myMessage}>

              <Text style={styles.myMessageText}>
                {item.text}
              </Text>

              <Text style={styles.myMessageTimestamp}>
                {item.time}
              </Text>

            </View>
          </View>
        ))}

      </ScrollView>


      {/*MESSAGE INPUT*/}

      <View style={styles.inputContainer}>

        {/* PLUS */}

        <Pressable style={styles.plusButton}>

          <Ionicons
            name="add"
            size={29}
            color="#fff"
          />

        </Pressable>


        {/* INPUT */}

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          style={styles.messageInput}
          multiline
        />


        {/* EMOJI */}

        <Pressable style={styles.emojiButton}>

          <Ionicons
            name="happy-outline"
            size={29}
            color="#8b15b9"
          />

        </Pressable>


        {/* SEND */}

        <Pressable
          style={styles.sendButton}
          onPress={sendMessage}
        >

          <Ionicons
            name="send"
            size={23}
            color="#fff"
          />

        </Pressable>

      </View>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  /*SCREEN*/

  screen: {
    flex: 1,
    backgroundColor: "#f9f7fc",
  },


  /*HEADER*/

  header: {
    height: 125,
    paddingTop: 42,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 3,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },

  headerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#8b15b9",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },

  headerName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#171217",
  },

  headerProfessionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  headerProfession: {
    fontSize: 15,
    color: "#666",
  },

  headerDot: {
    marginHorizontal: 5,
    color: "#888",
    fontSize: 15,
  },

  headerRating: {
    fontSize: 15,
    color: "#555",
    marginLeft: 4,
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#16c766",
    marginRight: 7,
  },

  onlineText: {
    fontSize: 14,
    color: "#555",
  },

  headerIconButton: {
    width: 38,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },


  /*CHAT*/

  chatArea: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 25,
  },

  /* MESSAGES */

  todayText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#777",
    marginTop: 10,
    marginBottom: 16,
  },

  messageTime: {
    textAlign: "center",
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  messageAvatar: {
    width: 47,
    height: 47,
    borderRadius: 24,
    marginRight: 9,
  },

  artisanMessage: {
    maxWidth: "78%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 13,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  messageText: {
    fontSize: 17,
    color: "#1d1820",
    lineHeight: 27,
  },

  messageTimestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 7,
  },


  /*MY MESSAGE*/

  myMessageRow: {
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 15,
  },

  myMessage: {
    maxWidth: "78%",
    backgroundColor: "#8b15b9",
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 13,
  },

  myMessageText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },

  myMessageTimestamp: {
    color: "#eadcf0",
    fontSize: 11,
    marginTop: 6,
    textAlign: "right",
  },


  /* INPUT*/

  inputContainer: {
    minHeight: 75,
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  plusButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#8b15b9",
    justifyContent: "center",
    alignItems: "center",
  },

  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: "#222",
    maxHeight: 55,
    paddingVertical: 8,
  },

  emojiButton: {
    width: 42,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8b15b9",
    justifyContent: "center",
    alignItems: "center",
  },

});