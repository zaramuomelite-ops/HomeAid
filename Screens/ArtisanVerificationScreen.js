import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ArtisanProfessionalVerificationScreen({
  navigation,
}) {
  const [nin, setNin] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [location, setLocation] = useState("");

  const [proofType, setProofType] = useState("");
  const [proofLink, setProofLink] = useState("");

  const [loading, setLoading] = useState(false);

  const [proofError, setProofError] = useState("");

  const handleNinChange = (text) => {
    const numbersOnly = text.replace(/[^0-9]/g, "");
    setNin(numbersOnly.slice(0, 11));
  };

  const handleSubmit = async () => {
    if (
      !nin ||
      !profession ||
      !experience ||
      !workDescription ||
      !location ||
      !proofType
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (nin.length !== 11) {
      alert("NIN must be exactly 11 digits.");
      return;
    }

    if (proofType === "link" && !proofLink.trim()) {
      alert("Please provide your portfolio link.");
      return;
    }

    if (!proofType) {
      setProofError("Proof of work is required.");
      return;
    }
    
    if (proofType === "upload" && !selectedFile) {
      setProofError("Please upload your proof of work.");
      return;
    }
    
    if (proofType === "link") {
      const isValidUrl = urlRegex.test(proofLink.trim());
    
      if (!isValidUrl) {
        setProofError("Please enter a valid portfolio link.");
        return;
      }
    }

    setLoading(true);

    try {
      // I will send the information 
      // to your backend.

      await new Promise((resolve) => setTimeout(resolve, 2500));

      navigation.replace("ArtisanVerification", {
        status: "pending",
      });
    } catch (error) {
      console.log("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.screen}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps= "handled"
    >
      {/* HEADER */}

      <Pressable
        style = {styles.back}
        onPress={() => navigation.goBack()}>

          <Ionicons
          name="arrow-back"
          size= {30}
          color={"#8b15b9"}/>
      </Pressable>

      <View style={styles.headerIcon}>
        <Ionicons
          name="shield-checkmark-outline"
          size={30}
          color="#6C4AB6"
        />
      </View>

      <Text style={styles.title}>
        Professional Verification
      </Text>

      <Text style={styles.description}>
        You're almost there! We need a few professional
        details to verify your identity and experience
        before you can be accepted as an <Text style={styles.homeText}>HomeAidConnect</Text> artisan.
      </Text>

      {/* PROGRESS */}

      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={styles.completedCircle}>
            <Ionicons
              name="checkmark"
              size={16}
              color="#fff"
            />
          </View>

          <Text style={styles.progressText}>
            Account Details
          </Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.progressStep}>
          <View style={styles.activeCircle}>
            <Text style={styles.activeNumber}>2</Text>
          </View>

          <Text style={styles.progressText}>
            Verification
          </Text>
        </View>
      </View>

      {/* NIN */}

      <Text style={styles.label}>
        NIN <Text style={styles.required}>*</Text>
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="card-outline"
          size={20}
          color="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your 11-digit NIN"
          placeholderTextColor="#aaa"
          keyboardType="number-pad"
          value={nin}
          onChangeText={handleNinChange}
          maxLength={11}
        />
      </View>

      <Text style={styles.helperText}>
        Your NIN is used only for identity verification.
      </Text>

      {/* PROFESSION */}

      <Text style={styles.label}>
        Profession <Text style={styles.required}>*</Text>
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="construct-outline"
          size={20}
          color="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="e.g. Plumber, Electrician"
          placeholderTextColor="#aaa"
          value={profession}
          onChangeText={setProfession}
        />
      </View>

      {/* EXPERIENCE */}

      <Text style={styles.label}>
        Years of Experience <Text style={styles.required}>*</Text>
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="briefcase-outline"
          size={20}
          color="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="e.g. 5 years"
          placeholderTextColor="#aaa"
          value={experience}
          onChangeText={setExperience}
        />
      </View>

      {/* LOCATION */}

      <Text style={styles.label}>
        Service Location <Text style={styles.required}>*</Text>
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Where do you provide services?"
          placeholderTextColor="#aaa"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* WORK DESCRIPTION */}

      <Text style={styles.label}>
        Tell us about your experience{" "}
        <Text style={styles.required}>*</Text>
      </Text>

      <View style={[styles.inputContainer, styles.textAreaContainer]}>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Briefly describe your experience and the services you provide..."
          placeholderTextColor="#aaa"
          multiline
          textAlignVertical="top"
          value={workDescription}
          onChangeText={setWorkDescription}
        />
      </View>

      {/* PROOF */}

      <Text style={styles.label}>
      Proof of Work <Text style={styles.required}>*</Text>
      </Text>

    <View
      style={[
        styles.proofOptions,
        proofError && styles.errorBorder,
      ]}
    >
    <Pressable
      style={[
        styles.proofOption,
        proofType === "upload" && styles.selectedProofOption,
      ]}
      onPress={() => {
        setProofType("upload");
        setProofError("");
      }}
    >
      <Ionicons
        name="cloud-upload-outline"
        size={25}
        color="#6C4AB6"
      />

      <Text style={styles.proofTitle}>
        Upload Document
      </Text>

    <Text style={styles.proofSubtitle}>
      PDF, image or résumé
    </Text>
      </Pressable>

      <Pressable
        style={[
          styles.proofOption,
          proofType === "link" && styles.selectedProofOption,
        ]}
        onPress={() => {
          setProofType("link");
          setProofError("");
        }}
      >
        <Ionicons
          name="link-outline"
          size={25}
          color="#6C4AB6"
        />

        <Text style={styles.proofTitle}>
          Portfolio Link
        </Text>

        <Text style={styles.proofSubtitle}>
          Website or online portfolio
        </Text>
      </Pressable>
      </View>

        {proofError ? (
          <Text style={styles.errorText}>
            {proofError}
          </Text>
        ) : null}

          {/* PORTFOLIO LINK */}

          {proofType === "link" && (
            <View style={styles.inputContainer}>
              <Ionicons
                name="globe-outline"
                size={20}
                color="#888"
              />

          <TextInput
            style={styles.input}
            placeholder="https://yourportfolio.com"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            keyboardType="url"
            value={proofLink}
            onChangeText={setProofLink}
          />
        </View>
      )}

      {/* UPLOAD BUTTON */}

      {proofType === "upload" && (
        <Pressable style={styles.uploadBox}>
          <Ionicons
            name="document-attach-outline"
            size={32}
            color="#6C4AB6"
          />

          <Text style={styles.uploadTitle}>
            Choose a file
          </Text>

          <Text style={styles.uploadSubtitle}>
            PDF, JPG or PNG
          </Text>
        </Pressable>
      )}

      {/* SUBMIT */}

      <Pressable
        style={[
          styles.submitButton,
          loading && styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <ActivityIndicator
              size="small"
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Submitting...
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.buttonText}>
              Submit Application
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#fff"
            />
          </>
        )}
      </Pressable>

      <Text style={styles.bottomText}>
        By submitting, you confirm that the information
        provided is accurate and belongs to you.
      </Text>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ebcce823",
  },

  container: {
    flex: 1,
    backgroundColor: "#FAF8FC",
  },

  
   back: {
    marginTop: 50,
    marginLeft: 10,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 40,
  },

  headerIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#F0EAF9",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },

  homeText: {
    color: "#8b15b9",
  },

  description: {
    fontSize: 14,
    color: "#777",
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 25,
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  progressStep: {
    alignItems: "center",
  },

  completedCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#6C4AB6",
    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#6C4AB6",
    justifyContent: "center",
    alignItems: "center",
  },

  activeNumber: {
    color: "#fff",
    fontWeight: "700",
  },

  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#6C4AB6",
    marginHorizontal: 8,
    marginBottom: 18,
  },

  progressText: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C4AB6",
    marginBottom: 8,
    marginTop: 12,
  },

  required: {
    color: "#B54A4A",
  },

  inputContainer: {
    minHeight: 52,
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E7E2ED",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#222",
    marginLeft: 10,
  },

  helperText: {
    fontSize: 11,
    color: "#999",
    marginTop: 5,
    lineHeight: 17,
  },

  textAreaContainer: {
    height: 110,
    alignItems: "flex-start",
    paddingTop: 14,
  },

  textArea: {
    height: 85,
  },

  proofOptions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  proofOption: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7E2ED",
  },

  selectedProofOption: {
    borderColor: "#6C4AB6",
    backgroundColor: "#F5F0FB",
  },

  proofTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
  },

  proofSubtitle: {
    fontSize: 10,
    color: "#999",
    marginTop: 3,
    textAlign: "center",
  },

  uploadBox: {
    height: 120,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6C4AB6",
    backgroundColor: "#F7F3FB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  uploadTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
    marginTop: 7,
  },

  uploadSubtitle: {
    fontSize: 11,
    color: "#999",
    marginTop: 3,
  },

  errorBorder: {
    borderWidth: 1,
    borderColor: "#D9534F",
    borderRadius: 15,
  },
 
  errorText: {
    color: "#D9534F",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  submitButton: {
    height: 55,
    borderRadius: 15,
    backgroundColor: "#6C4AB6",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 25,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomText: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    lineHeight: 17,
    marginTop: 12,
  },
});