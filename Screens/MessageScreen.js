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
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useState,
  useCallback,
  useRef,
} from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


/*
HELPERS
*/

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
  return new Date().toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}


/*
EMOJIS
*/

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🥳",
  "🤩",
  "🥹",
  "😭",
  "😂",
  "🤣",
  "😢",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😤",
  "😡",
  "🤬",
  "😱",
  "😳",
  "🤗",
  "🤔",
  "🫡",
  "👍",
  "👎",
  "👏",
  "🙌",
  "🙏",
  "🤝",
  "❤️",
  "🩷",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "💯",
  "🔥",
  "✨",
  "⭐",
  "🎉",
  "✅",
  "❌",
  "💪",
  "👌",
  "✌️",
  "👋",
  "💐",
  "🌸",
  "🌹",
  "☀️",
  "🌙",
  "🏠",
  "🔧",
  "🛠️",
  "📍",
  "📞",
  "📷",
];


/*
MESSAGE SCREEN
*/

export default function MessagesScreen({
  route,
  navigation,
}) {

  const {
    userType,
    professional,
    customer,
  } = route.params || {};

  const isArtisan =
    userType === "artisan";


  /*
  CHAT PARTNER
  */

  const chatPartner = isArtisan
    ? customer
    : professional;


  /*
  STATE
  */

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [showAttachmentMenu, setShowAttachmentMenu] =
    useState(false);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const [selectedAttachment, setSelectedAttachment] =
    useState(null);

  const [artisanAvailable, setArtisanAvailable] =
    useState(
      professional?.isAvailable === true
    );

  const [loadingProfile, setLoadingProfile] =
    useState(false);

  const scrollViewRef =
    useRef(null);


  /*
  LOAD ARTISAN AVAILABILITY
  */

  const loadArtisanStatus =
    useCallback(async () => {

      if (!isArtisan) {

        try {

          setLoadingProfile(true);

          const savedArtisan =
            await AsyncStorage.getItem(
              "artisanData"
            );

          if (savedArtisan) {

            const parsed =
              JSON.parse(savedArtisan);

            setArtisanAvailable(
              parsed.isAvailable === true
            );

          } else {

            setArtisanAvailable(
              professional?.isAvailable === true
            );

          }

        } catch (error) {

          console.log(
            "Error loading artisan status:",
            error
          );

          setArtisanAvailable(
            professional?.isAvailable === true
          );

        } finally {

          setLoadingProfile(false);

        }

      } else {

        /*
          When the artisan is using Messages,
          their own availability is not needed
          to determine the customer's status.
        */

        setLoadingProfile(false);

      }

    }, [
      isArtisan,
      professional?.isAvailable,
    ]);


  useFocusEffect(
    useCallback(() => {

      loadArtisanStatus();

    }, [loadArtisanStatus])
  );


  /*
  SCROLL TO BOTTOM
  */

  const scrollToBottom =
    useCallback(() => {

      setTimeout(() => {

        scrollViewRef.current?.scrollToEnd({
          animated: true,
        });

      }, 100);

    }, []);


  /*
  SEND MESSAGE
  */

  const sendMessage = () => {

    const trimmedMessage =
      message.trim();

    /*
      Don't send an empty message unless
      there is an attachment.
    */

    if (
      !trimmedMessage &&
      !selectedAttachment
    ) {
      return;
    }


    const newMessage = {

      id:
        Date.now().toString(),

      text:
        trimmedMessage,

      sender:
        "me",

      time:
        getCurrentTime(),

      attachment:
        selectedAttachment
          ? selectedAttachment
          : null,

    };


    setMessages(
      (previousMessages) => [
        ...previousMessages,
        newMessage,
      ]
    );


    setMessage("");

    setSelectedAttachment(null);

    setShowEmojiPicker(false);

    scrollToBottom();

  };


  /*
  OPEN GALLERY
  */

  const openGallery =
    async () => {

      try {

        setShowAttachmentMenu(false);


        /*
          Ask the operating system for
          photo library permission.

          This produces the real phone
          permission dialog.
        */

        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();


        if (
          !permission.granted
        ) {

          Alert.alert(
            "Photo Access Required",
            "HomeAid Connect needs access to your photos so you can send images in your messages.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Settings",
                onPress:
                  ImagePicker
                    .getMediaLibraryPermissionsAsync,
              },
            ]
          );

          return;

        }


        const result =
          await ImagePicker.launchImageLibraryAsync({

            mediaTypes:
              ["images", "videos"],

            allowsEditing:
              false,

            quality:
              0.8,

            allowsMultipleSelection:
              false,

          });


        if (
          result.canceled
        ) {
          return;
        }


        const asset =
          result.assets?.[0];


        if (!asset) {
          return;
        }


        setSelectedAttachment({

          type:
            asset.type === "video"
              ? "video"
              : "image",

          uri:
            asset.uri,

          name:
            asset.fileName ||
            (
              asset.type === "video"
                ? "Video"
                : "Photo"
            ),

          mimeType:
            asset.mimeType ||
            (
              asset.type === "video"
                ? "video/mp4"
                : "image/jpeg"
            ),

        });

      } catch (error) {

        console.log(
          "Gallery error:",
          error
        );

        Alert.alert(
          "Unable to open gallery",
          "Something went wrong while trying to access your photos."
        );

      }

    };


  /*
  OPEN FILE PICKER
  */

  const openFilePicker =
    async () => {

      try {

        setShowAttachmentMenu(false);


        /*
          The system document picker handles
          access to files.

          Unlike the photo gallery, modern
          Android/iOS document pickers normally
          do not require broad storage permission.
          The operating system gives the app
          access to the file the user selects.
        */

        const result =
          await DocumentPicker.getDocumentAsync({

            type: "*/*",

            copyToCacheDirectory:
              true,

            multiple:
              false,

          });


        if (
          result.canceled
        ) {
          return;
        }


        const file =
          result.assets?.[0];


        if (!file) {
          return;
        }


        setSelectedAttachment({

          type:
            "file",

          uri:
            file.uri,

          name:
            file.name ||
            "Document",

          mimeType:
            file.mimeType ||
            "application/octet-stream",

          size:
            file.size,

        });

      } catch (error) {

        console.log(
          "File picker error:",
          error
        );

        Alert.alert(
          "Unable to open files",
          "Something went wrong while trying to access your files."
        );

      }

    };


  /*
  ADD EMOJI
  */

  const addEmoji =
    (emoji) => {

      setMessage(
        (previousMessage) =>
          previousMessage + emoji
      );

    };


  /*
  REMOVE ATTACHMENT
  */

  const removeAttachment =
    () => {

      setSelectedAttachment(null);

    };


  /*
  CHAT PARTNER INFORMATION
  */

  const partnerName =
    chatPartner?.name ||
    chatPartner?.userName ||
    (
      isArtisan
        ? "Customer"
        : "Professional"
    );


  const partnerProfession =
    isArtisan
      ? "Customer"
      : (
          chatPartner?.profession ||
          "Professional"
        );


  const partnerImage =
    chatPartner?.image ||
    chatPartner?.profileImage ||
    null;


  /*
  ONLINE STATUS
  */

  /*
    For now:

    Customer viewing artisan:
      professional.isAvailable / artisanData.isAvailable

    Artisan viewing customer:
      customer.isOnline

    Later the backend can provide true
    real-time online presence.
  */

  const isPartnerOnline =
    isArtisan
      ? customer?.isOnline === true
      : artisanAvailable;


  /*
  RENDER
  */

  return (

    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? 0
          : 20
      }
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name="arrow-back"
            size={30}
            color="#8b15b9"
          />

        </Pressable>


        {/* PROFILE IMAGE */}

        {partnerImage ? (

          <Image
            source={{
              uri:
                typeof partnerImage ===
                "string"
                  ? partnerImage
                  : undefined,
            }}
            style={styles.headerImage}
          />

        ) : (

          <View
            style={
              styles.headerImagePlaceholder
            }
          >

            <Ionicons
              name="person"
              size={29}
              color="#8b15b9"
            />

          </View>

        )}


        {/* PARTNER INFORMATION */}

        <View style={styles.headerInfo}>

          <Text
            style={styles.headerName}
            numberOfLines={1}
          >
            {partnerName}
          </Text>


          <View
            style={
              styles.headerProfessionRow
            }
          >

            <Text
              style={
                styles.headerProfession
              }
            >
              {partnerProfession}
            </Text>


            {!isArtisan &&
              chatPartner?.rating ? (

              <>
                <Text
                  style={styles.headerDot}
                >
                  •
                </Text>

                <Ionicons
                  name="star"
                  size={16}
                  color="#f6ad16"
                />

                <Text
                  style={styles.headerRating}
                >
                  {chatPartner.rating}
                </Text>
              </>

            ) : null}

          </View>


          {/* ONLINE / OFFLINE */}

          <View
            style={styles.onlineRow}
          >

            <View
              style={[
                styles.onlineDot,
                !isPartnerOnline &&
                  styles.offlineDot,
              ]}
            />

            <Text
              style={[
                styles.onlineText,
                !isPartnerOnline &&
                  styles.offlineText,
              ]}
            >
              {isPartnerOnline
                ? "Online"
                : "Offline"}
            </Text>

          </View>

        </View>


        {/* CALL */}

        <Pressable
          style={
            styles.headerIconButton
          }
          onPress={() => {

            Alert.alert(
              "Calling",
              `Calling ${partnerName}...`
            );

          }}
        >

          <Ionicons
            name="call-outline"
            size={24}
            color="#8b15b9"
          />

        </Pressable>


        {/* MORE */}

        <Pressable
          style={
            styles.headerIconButton
          }
          onPress={() => {

            Alert.alert(
              partnerName,
              "More conversation options will be available here."
            );

          }}
        >

          <Ionicons
            name="ellipsis-vertical"
            size={25}
            color="#8b15b9"
          />

        </Pressable>

      </View>


      {/* =====================================================
          CHAT
      ===================================================== */}

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={
          styles.chatContent
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() =>
          scrollToBottom()
        }
      >

        {/* TODAY */}

        <Text
          style={styles.todayText}
        >
          TODAY
        </Text>


        {/* EXISTING MESSAGES */}

        {messages.map((item) => {

          const isMine =
            item.sender === "me";


          return (

            <View
              key={item.id}
              style={[
                styles.messageRow,
                isMine &&
                  styles.myMessageRow,
              ]}
            >

              {/* OTHER PERSON AVATAR */}

              {!isMine && (

                partnerImage ? (

                  <Image
                    source={{
                      uri:
                        typeof partnerImage ===
                        "string"
                          ? partnerImage
                          : undefined,
                    }}
                    style={
                      styles.messageAvatar
                    }
                  />

                ) : (

                  <View
                    style={
                      styles.messageAvatarPlaceholder
                    }
                  >

                    <Ionicons
                      name="person"
                      size={21}
                      color="#8b15b9"
                    />

                  </View>

                )

              )}


              <View
                style={[
                  styles.messageBubble,
                  isMine
                    ? styles.myMessage
                    : styles.otherMessage,
                ]}
              >

                {/* IMAGE */}

                {item.attachment?.type ===
                  "image" && (

                  <Image
                    source={{
                      uri:
                        item.attachment.uri,
                    }}
                    style={
                      styles.sentImage
                    }
                  />

                )}


                {/* VIDEO */}

                {item.attachment?.type ===
                  "video" && (

                  <View
                    style={
                      styles.sentVideo
                    }
                  >

                    <Ionicons
                      name="videocam"
                      size={30}
                      color={
                        isMine
                          ? "#fff"
                          : "#8b15b9"
                      }
                    />

                    <Text
                      style={[
                        styles.sentFileName,
                        isMine &&
                          styles.sentFileNameMine,
                      ]}
                    >
                      {item.attachment.name}
                    </Text>

                  </View>

                )}


                {/* FILE */}

                {item.attachment?.type ===
                  "file" && (

                  <View
                    style={
                      styles.sentFile
                    }
                  >

                    <Ionicons
                      name="document-text"
                      size={29}
                      color={
                        isMine
                          ? "#fff"
                          : "#8b15b9"
                      }
                    />

                    <Text
                      numberOfLines={2}
                      style={[
                        styles.sentFileName,
                        isMine &&
                          styles.sentFileNameMine,
                      ]}
                    >
                      {item.attachment.name}
                    </Text>

                  </View>

                )}


                {/* TEXT */}

                {item.text ? (

                  <Text
                    style={[
                      styles.messageText,
                      isMine &&
                        styles.myMessageText,
                    ]}
                  >
                    {item.text}
                  </Text>

                ) : null}


                <Text
                  style={[
                    styles.messageTimestamp,
                    isMine &&
                      styles.myMessageTimestamp,
                  ]}
                >
                  {item.time}
                </Text>

              </View>

            </View>

          );

        })}


        {/* EMPTY CHAT */}

        {messages.length === 0 && (

          <View
            style={styles.emptyChat}
          >

            <View
              style={
                styles.emptyChatIcon
              }
            >

              <Ionicons
                name="chatbubble-ellipses-outline"
                size={30}
                color="#8b15b9"
              />

            </View>


            <Text
              style={
                styles.emptyChatTitle
              }
            >
              Start a conversation
            </Text>


            <Text
              style={
                styles.emptyChatText
              }
            >
              Send a message to{" "}
              {partnerName} to start
              your conversation.
            </Text>

          </View>

        )}

      </ScrollView>


      {/* =====================================================
          ATTACHMENT PREVIEW
      ===================================================== */}

      {selectedAttachment && (

        <View
          style={
            styles.attachmentPreview
          }
        >

          <View
            style={
              styles.attachmentPreviewContent
            }
          >

            {selectedAttachment.type ===
              "image" ? (

              <Image
                source={{
                  uri:
                    selectedAttachment.uri,
                }}
                style={
                  styles.previewImage
                }
              />

            ) : (

              <View
                style={
                  styles.previewFileIcon
                }
              >

                <Ionicons
                  name={
                    selectedAttachment.type ===
                    "video"
                      ? "videocam"
                      : "document-text"
                  }
                  size={26}
                  color="#8b15b9"
                />

              </View>

            )}


            <View
              style={
                styles.previewInformation
              }
            >

              <Text
                style={
                  styles.previewTitle
                }
                numberOfLines={1}
              >
                {selectedAttachment.name}
              </Text>

              <Text
                style={
                  styles.previewSubtitle
                }
              >
                Ready to send
              </Text>

            </View>


            <Pressable
              onPress={
                removeAttachment
              }
              style={
                styles.removeAttachment
              }
            >

              <Ionicons
                name="close"
                size={21}
                color="#666"
              />

            </Pressable>

          </View>

        </View>

      )}


      {/* =====================================================
          EMOJI PICKER
      ===================================================== */}

      {showEmojiPicker && (

        <View
          style={
            styles.emojiPicker
          }
        >

          <View
            style={
              styles.emojiHeader
            }
          >

            <Text
              style={
                styles.emojiTitle
              }
            >
              Emojis
            </Text>

            <Pressable
              onPress={() =>
                setShowEmojiPicker(false)
              }
            >

              <Ionicons
                name="close"
                size={22}
                color="#777"
              />

            </Pressable>

          </View>


          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.emojiGrid
            }
          >

            {emojis.map(
              (emoji, index) => (

                <Pressable
                  key={`${emoji}-${index}`}
                  style={
                    styles.emojiItem
                  }
                  onPress={() =>
                    addEmoji(emoji)
                  }
                >

                  <Text
                    style={
                      styles.emojiText
                    }
                  >
                    {emoji}
                  </Text>

                </Pressable>

              )
            )}

          </ScrollView>

        </View>

      )}


      {/* =====================================================
          INPUT BAR
      ===================================================== */}

      <View
        style={styles.inputContainer}
      >

        {/* PLUS */}

        <Pressable
          style={styles.plusButton}
          onPress={() =>
            setShowAttachmentMenu(
              true
            )
          }
          android_ripple={{
            color: "#6c0e8f",
          }}
        >

          <Ionicons
            name="add"
            size={29}
            color="#fff"
          />

        </Pressable>


        {/* TEXT INPUT */}

        <TextInput
          value={message}
          onChangeText={
            setMessage
          }
          placeholder="Type a message..."
          placeholderTextColor="#999"
          style={
            styles.messageInput
          }
          multiline
          onFocus={() =>
            setShowEmojiPicker(
              false
            )
          }
        />


        {/* EMOJI */}

        <Pressable
          style={
            styles.emojiButton
          }
          onPress={() =>
            setShowEmojiPicker(
              (previous) =>
                !previous
            )
          }
        >

          <Text
            style={
              styles.emojiButtonText
            }
          >
            😊
          </Text>

        </Pressable>


        {/* SEND */}

        <Pressable
          style={[
            styles.sendButton,
            !message.trim() &&
              !selectedAttachment &&
              styles.sendButtonDisabled,
          ]}
          onPress={
            sendMessage
          }
          disabled={
            !message.trim() &&
            !selectedAttachment
          }
        >

          <Ionicons
            name="send"
            size={23}
            color="#fff"
          />

        </Pressable>

      </View>


      {/* =====================================================
          ATTACHMENT MENU
      ===================================================== */}

      <Modal
        visible={
          showAttachmentMenu
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowAttachmentMenu(
            false
          )
        }
      >

        <Pressable
          style={
            styles.attachmentOverlay
          }
          onPress={() =>
            setShowAttachmentMenu(
              false
            )
          }
        >

          <Pressable
            style={
              styles.attachmentMenu
            }
            onPress={(event) =>
              event.stopPropagation()
            }
          >

            <View
              style={
                styles.attachmentMenuHeader
              }
            >

              <Text
                style={
                  styles.attachmentMenuTitle
                }
              >
                Add to message
              </Text>


              <Pressable
                onPress={() =>
                  setShowAttachmentMenu(
                    false
                  )
                }
              >

                <Ionicons
                  name="close"
                  size={24}
                  color="#777"
                />

              </Pressable>

            </View>


            {/* PHOTO */}

            <Pressable
              style={
                styles.attachmentOption
              }
              onPress={
                openGallery
              }
              android_ripple={{
                color: "#ead8f0",
              }}
            >

              <View
                style={[
                  styles.attachmentOptionIcon,
                  styles.photoIcon,
                ]}
              >

                <Ionicons
                  name="images-outline"
                  size={25}
                  color="#8b15b9"
                />

              </View>


              <View
                style={
                  styles.attachmentOptionText
                }
              >

                <Text
                  style={
                    styles.attachmentOptionTitle
                  }
                >
                  Photo / Video
                </Text>

                <Text
                  style={
                    styles.attachmentOptionDescription
                  }
                >
                  Choose from your gallery
                </Text>

              </View>


              <Ionicons
                name="chevron-forward"
                size={21}
                color="#999"
              />

            </Pressable>


            {/* FILE */}

            <Pressable
              style={
                styles.attachmentOption
              }
              onPress={
                openFilePicker
              }
              android_ripple={{
                color: "#ead8f0",
              }}
            >

              <View
                style={[
                  styles.attachmentOptionIcon,
                  styles.fileIcon,
                ]}
              >

                <Ionicons
                  name="document-attach-outline"
                  size={25}
                  color="#8b15b9"
                />

              </View>


              <View
                style={
                  styles.attachmentOptionText
                }
              >

                <Text
                  style={
                    styles.attachmentOptionTitle
                  }
                >
                  File
                </Text>

                <Text
                  style={
                    styles.attachmentOptionDescription
                  }
                >
                  Choose a document from your phone
                </Text>

              </View>


              <Ionicons
                name="chevron-forward"
                size={21}
                color="#999"
              />

            </Pressable>


            {/* CANCEL */}

            <Pressable
              style={
                styles.attachmentCancel
              }
              onPress={() =>
                setShowAttachmentMenu(
                  false
                )
              }
            >

              <Text
                style={
                  styles.attachmentCancelText
                }
              >
                Cancel
              </Text>

            </Pressable>

          </Pressable>

        </Pressable>

      </Modal>

    </KeyboardAvoidingView>
  );
}


/*==
STYLES==
*/

const styles =
  StyleSheet.create({

    /*
    SCREEN
    */

    screen: {
      flex: 1,
      backgroundColor: "#f9f7fc",
    },


    /*
    HEADER
    */

    header: {
      height: 125,
      paddingTop: 42,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      elevation: 3,
    },

    backButton: {
      width: 42,
      height: 45,
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

    headerImagePlaceholder: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 3,
      borderColor: "#8b15b9",
      backgroundColor: "#f3e8f8",
      justifyContent: "center",
      alignItems: "center",
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
      fontSize: 14,
      color: "#666",
    },

    headerDot: {
      marginHorizontal: 5,
      color: "#888",
      fontSize: 15,
    },

    headerRating: {
      fontSize: 14,
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

    offlineDot: {
      backgroundColor: "#a0a0a0",
    },

    onlineText: {
      fontSize: 13,
      color: "#555",
    },

    offlineText: {
      color: "#888",
    },

    headerIconButton: {
      width: 38,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
    },


    /*
    CHAT
    */

    chatArea: {
      flex: 1,
    },

    chatContent: {
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 25,
      flexGrow: 1,
    },

    todayText: {
      textAlign: "center",
      fontSize: 13,
      fontWeight: "700",
      color: "#777",
      marginTop: 10,
      marginBottom: 20,
    },

    /*
    EMPTY CHAT
    */

    emptyChat: {
      flex: 1,
      minHeight: 350,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 35,
    },

    emptyChatIcon: {
      width: 72,
      height: 72,
      borderRadius: 25,
      backgroundColor: "#f3e8f8",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
    },

    emptyChatTitle: {
      fontSize: 19,
      fontWeight: "800",
      color: "#211822",
      textAlign: "center",
    },

    emptyChatText: {
      fontSize: 13,
      lineHeight: 20,
      color: "#888",
      textAlign: "center",
      marginTop: 8,
    },


    /*
    MESSAGE ROW
    */

    messageRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 12,
    },

    myMessageRow: {
      justifyContent: "flex-end",
    },

    messageAvatar: {
      width: 42,
      height: 42,
      borderRadius: 22,
      marginRight: 8,
    },

    messageAvatarPlaceholder: {
      width: 42,
      height: 42,
      borderRadius: 22,
      backgroundColor: "#f3e8f8",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },


    /*
    MESSAGE BUBBLES
    */

    messageBubble: {
      maxWidth: "78%",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },

    otherMessage: {
      backgroundColor: "#fff",
      elevation: 1,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },

    myMessage: {
      backgroundColor: "#8b15b9",
    },

    messageText: {
      fontSize: 16,
      color: "#1d1820",
      lineHeight: 24,
    },

    myMessageText: {
      color: "#fff",
    },

    messageTimestamp: {
      fontSize: 11,
      color: "#888",
      marginTop: 6,
      textAlign: "right",
    },

    myMessageTimestamp: {
      color: "#eadcf0",
    },


    /*
    SENT IMAGE
    */

    sentImage: {
      width: 220,
      height: 220,
      borderRadius: 15,
      marginBottom: 4,
    },


    /*
    SENT VIDEO
    */

    sentVideo: {
      minWidth: 180,
      minHeight: 90,
      borderRadius: 14,
      backgroundColor: "#f5edf8",
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      marginBottom: 4,
    },


    /*
    SENT FILE
    */

    sentFile: {
      minWidth: 180,
      minHeight: 70,
      borderRadius: 14,
      backgroundColor: "#f5edf8",
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      gap: 10,
      marginBottom: 4,
    },

    sentFileName: {
      flex: 1,
      fontSize: 12,
      fontWeight: "600",
      color: "#444",
    },

    sentFileNameMine: {
      color: "#fff",
    },


    /*
    ATTACHMENT PREVIEW
    */

    attachmentPreview: {
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#eee",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },

    attachmentPreviewContent: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#faf7fb",
      borderRadius: 15,
      padding: 8,
    },

    previewImage: {
      width: 55,
      height: 55,
      borderRadius: 10,
    },

    previewFileIcon: {
      width: 55,
      height: 55,
      borderRadius: 10,
      backgroundColor: "#f1e6f5",
      justifyContent: "center",
      alignItems: "center",
    },

    previewInformation: {
      flex: 1,
      marginLeft: 11,
    },

    previewTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: "#333",
    },

    previewSubtitle: {
      fontSize: 11,
      color: "#888",
      marginTop: 3,
    },

    removeAttachment: {
      width: 35,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
    },


    /*
    EMOJI PICKER
    */

    emojiPicker: {
      height: 245,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#eee",
      paddingHorizontal: 15,
      paddingTop: 10,
    },

    emojiHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },

    emojiTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#54275f",
    },

    emojiGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingBottom: 15,
    },

    emojiItem: {
      width: "11.11%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },

    emojiText: {
      fontSize: 25,
    },


    /*
    INPUT
    */

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
      overflow: "hidden",
    },

    messageInput: {
      flex: 1,
      marginHorizontal: 9,
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

    emojiButtonText: {
      fontSize: 25,
    },

    sendButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#8b15b9",
      justifyContent: "center",
      alignItems: "center",
    },

    sendButtonDisabled: {
      opacity: 0.45,
    },


    // ATTACHMENT MODAL
    

    attachmentOverlay: {
      flex: 1,
      backgroundColor:
        "rgba(0,0,0,0.45)",
      justifyContent: "flex-end",
    },

    attachmentMenu: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 35,
    },

    attachmentMenuHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },

    attachmentMenuTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: "#54275f",
    },

    attachmentOption: {
      minHeight: 75,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      overflow: "hidden",
    },

    attachmentOptionIcon: {
      width: 48,
      height: 48,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 13,
    },

    photoIcon: {
      backgroundColor: "#f3e8f8",
    },

    fileIcon: {
      backgroundColor: "#eeeafa",
    },

    attachmentOptionText: {
      flex: 1,
    },

    attachmentOptionTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#29232c",
    },

    attachmentOptionDescription: {
      fontSize: 12,
      color: "#888",
      marginTop: 4,
    },

    attachmentCancel: {
      height: 50,
      borderRadius: 14,
      marginTop: 15,
      borderWidth: 1,
      borderColor: "#8b15b9",
      alignItems: "center",
      justifyContent: "center",
    },

    attachmentCancelText: {
      color: "#8b15b9",
      fontSize: 15,
      fontWeight: "700",
    },

  });