import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function BookingScreen({ route, navigation }) {
  const professional = route.params?.professional;

  const scrollViewRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState( new Date(2026, 7, 1));
  const [selectedTime, setSelectedTime] = useState({time: "10:00", period: "AM",});

  const [showDateModal, setShowDateModal] = useState(false)
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [notes, setNotes] = useState("");

  const dates = [
    { day: "Mon", date: 17 },
    { day: "Tue", date: 18 },
    { day: "Wed", date: 19 },
    { day: "Thu", date: 20 },
    { day: "Fri", date: 21 },
    { day: "Sat", date: 22 },
    { day: "Sun", date: 23 },
  ];

  const times = [
    { time: "08:00", period: "AM" },
    { time: "10:00", period: "AM" },
    { time: "12:00", period: "PM" },
    { time: "02:00", period: "PM" },
    { time: "04:00", period: "PM" },
    { time: "06:00", period: "PM" },
  ];

  const serviceFee = 15000;
  const bookingFee = 1000;
  const totalAmount = serviceFee + bookingFee;

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }, [])
  );

  if (!professional) {
    return (
      <View style={styles.noProfessionalContainer}>
        <Ionicons
          name="person-outline"
          size={50}
          color="#8b15b9"
        />

        <Text style={styles.noProfessionalTitle}>
          No Professional Selected
        </Text>

        <Text style={styles.noProfessionalText}>
          Please select a professional before booking a service.
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>
           Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>

      {/* HEADER */}
      <View style={styles.header}>

        <Pressable
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          android_ripple={{
            color: "#ead8f0",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#8b15b9"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Book Service
        </Text>

        <Pressable
          style={styles.headerButton}
          onPress={() => {}}
          android_ripple={{
            color: "#8a15b938",
          }}
        >
          <Ionicons
            name="headset-outline"
            size={26}
            color="#8b15b9"
          />
        </Pressable>

      </View>


      <ScrollView
         ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* PROFESSIONAL */}
        <View style={styles.professionalSection}>

          <Image
            source={professional.image}
            style={styles.professionalImage}
          />

          <View style={styles.professionalInfo}>

            <View style={styles.nameRow}>

              <Text style={styles.professionalName}>
                {professional.name}
              </Text>

              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#1688e8"
              />

            </View>

            <Text style={styles.profession}>
              {professional.profession}
            </Text>

            <View style={styles.ratingRow}>

              <Ionicons
                name="star"
                size={20}
                color="#f6ad16"
              />

              <Text style={styles.rating}>
                {professional.rating}
              </Text>

              <Text style={styles.divider}>
                |
              </Text>

              <Ionicons
                name="location-outline"
                size={18}
                color="#666"
              />

              <Text style={styles.distance}>
                {professional.distance} away
              </Text>

            </View>

            {/* BADGES */}
            <View style={styles.badges}>

              <View style={styles.badge}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#16834a"
                />

                <Text style={styles.badgeText}>
                  Verified
                </Text>
              </View>

              <View style={styles.badge}>
                <Ionicons
                  name="trophy-outline"
                  size={18}
                  color="#e7a719"
                />

                <Text style={styles.badgeText}>
                  Top Rated
                </Text>
              </View>

            </View>

          </View>

        </View>


        {/* DATE */}
    <View style={styles.section}>

      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          1. Select Date
        </Text>

        <Pressable
          style={styles.dateContainer}
          onPress={() => setShowDateModal(true)}
        >

          <Text style={styles.date}>
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={21}
            color="#444"
          />

        </Pressable>

      </View>


      {/* QUICK DATE SELECTION */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
      >

        {dates.map((item) => {

          const selected =
            selectedDate.getDate() === item.date;

          return (
            <Pressable
              key={`${item.day}-${item.date}`}
              style={[
                styles.dateCard,
                selected && styles.selectedDateCard,
              ]}
              onPress={() => {

                const newDate = new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  item.date
                );

                setSelectedDate(newDate);

              }}
            >

              <Text
                style={[
                  styles.dateDay,
                  selected && styles.selectedText,
                ]}
              >
                {item.day}
              </Text>

              <Text
                style={[
                  styles.dateNumber,
                  selected && styles.selectedText,
                ]}
              >
                {item.date}
              </Text>

              

            </Pressable>
          );

        })}

      </ScrollView>

    </View>

    {/* TIME */}
<View style={styles.section}>

  <View style={styles.sectionHeader}>

    <Text style={styles.sectionTitle}>
      2. Select Time
    </Text>

    <Pressable
      style={styles.dateContainer}
      onPress={() => setShowTimeModal(true)}
    >

      <Text style={styles.date}>
        {selectedTime.time} {selectedTime.period}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={21}
        color="#444"
      />

    </Pressable>

  </View>


  {/* QUICK TIME SELECTION */}

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.timeList}
  >

    {times.map((item) => {

      const selected =
        selectedTime.time === item.time &&
        selectedTime.period === item.period;

      return (
        <Pressable
          key={`${item.time}-${item.period}`}
          style={[
            styles.timeCard,
            selected && styles.selectedTimeCard,
          ]}
          onPress={() => setSelectedTime(item)}
        >

          <Text
            style={[
              styles.timeText,
              selected && styles.selectedTimeText,
            ]}
          >
            {item.time}
          </Text>

          <Text
            style={[
              styles.periodText,
              selected && styles.selectedTimeText,
            ]}
          >
            {item.period}
          </Text>

        </Pressable>
      );

    })}

  </ScrollView>

</View>

        {/* ADDRESS */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            3. Service Address
          </Text>

          <Pressable
            style={styles.addressCard}
            onPress={() => {}}
          >

            <View style={styles.addressIcon}>
              <Ionicons
                name="location"
                size={24}
                color="#8b15b9"
              />
            </View>

            <Text style={styles.addressText}>
              57 Marina, UBA House, Lagos Island
            </Text>

            <Text style={styles.changeText}>
              Change
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#8b15b9"
            />

          </Pressable>

        </View>


        {/* NOTES */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            4. Additional Notes (Optional)
          </Text>

          <View style={styles.notesCard}>

            <View style={styles.notesIcon}>
              <Ionicons
                name="document-text-outline"
                size={23}
                color="#8b15b9"
              />
            </View>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any instructions or details about the job..."
              placeholderTextColor="#999"
              multiline
              style={styles.notesInput}
            />

          </View>

        </View>


        {/* PAYMENT */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            5. Payment Summary
          </Text>

          <View style={styles.paymentCard}>

            <View style={styles.paymentRow}>

              <Text style={styles.paymentLabel}>
                Service Fee
              </Text>

              <Text style={styles.paymentAmount}>
                ₦{serviceFee.toLocaleString()}
              </Text>

            </View>


            <View style={styles.paymentRow}>

              <View style={styles.bookingFeeLabel}>

                <Text style={styles.paymentLabel}>
                  Booking Fee
                </Text>

                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color="#777"
                />

              </View>

              <Text style={styles.paymentAmount}>
                ₦{bookingFee.toLocaleString()}
              </Text>

            </View>


            <View style={styles.paymentDivider} />


            <View style={styles.paymentRow}>

              <Text style={styles.totalLabel}>
                Total Amount
              </Text>

              <Text style={styles.totalAmount}>
                ₦{totalAmount.toLocaleString()}
              </Text>

            </View>

          </View>

        </View>


        {/* BUTTONS */}
        <View style={styles.buttonRow}>

          <View style={styles.buttonWrapper}>

            <Pressable
              style={styles.chatButton}
              android_ripple={{
                color: "#ead8f0",
              }}
              onPress={() =>
                navigation.navigate("Messages", {
                  professional: professional,
                  selectedDate: selectedDate.toISOString(),
                  selectedTime: selectedTime,
                  serviceFee: serviceFee,
                  bookingFee: bookingFee,
                  totalAmount: totalAmount,
                  serviceAddress: "57 Marina, UBA House, Lagos Island",
                })
              }
            >

              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                color="#8b15b9"
              />

              <Text style={styles.chatText}>
                Chat / Negotiate
              </Text>

            </Pressable>

          </View>


          <View style={styles.buttonWrapper}>

            <Pressable
              style={styles.bookButton}
              android_ripple={{
                color: "#6c0e8f",
              }}
              onPress={() => setShowConfirmationModal(true)}
            >

              <Ionicons
                name="calendar-outline"
                size={20}
                color="#fff"
              />

              <Text style={styles.bookText}>
                Book Now
              </Text>

            </Pressable>

          </View>

        </View>


        {/* TRUST FEATURES */}
        <View style={styles.trustRow}>

          <View style={styles.trustItem}>

            <Ionicons
              name="refresh-circle-outline"
              size={30}
              color="#8b15b9"
            />

            <Text style={styles.trustText}>
              Free cancellation
              {"\n"}
              up to 2 hours before
            </Text>

          </View>


          <View style={styles.trustItem}>

            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color="#8b15b9"
            />

            <Text style={styles.trustText}>
              100% Satisfaction
              {"\n"}
              Guaranteed
            </Text>

          </View>


          <View style={styles.trustItem}>

            <Ionicons
              name="lock-closed-outline"
              size={27}
              color="#8b15b9"
            />

            <Text style={styles.trustText}>
              Secure & Safe
              {"\n"}
              Transactions
            </Text>

          </View>

        </View>

      </ScrollView>

      {/* DATE MODAL */}

<Modal
  visible={showDateModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowDateModal(false)}
>

  <View style={styles.modalOverlay}>

    <View style={styles.modalContainer}>

      <View style={styles.modalHeader}>

        <Text style={styles.modalTitle}>
          Select Service Date
        </Text>

        <Pressable
          onPress={() => setShowDateModal(false)}
        >
          <Ionicons
            name="close"
            size={26}
            color="#555"
          />
        </Pressable>

      </View>


      <View style={styles.modalMonthRow}>

        <Pressable>
          <Ionicons
            name="chevron-back"
            size={25}
            color="#8b15b9"
          />
        </Pressable>

        <Text style={styles.modalMonth}>
          August 2026
        </Text>

        <Pressable>
          <Ionicons
            name="chevron-forward"
            size={25}
            color="#8b15b9"
          />
        </Pressable>

      </View>


      {/* DAYS OF WEEK */}

      <View style={styles.weekRow}>

        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
          (day) => (
            <Text
              key={day}
              style={styles.weekDay}
            >
              {day}
            </Text>
          )
        )}

      </View>


      {/* CALENDAR */}

      <View style={styles.calendarGrid}>

        {Array.from({ length: 31 }, (_, index) => {

          const date = index + 1;

          const selected =
            selectedDate.getDate() === date;

          return (
            <Pressable
              key={date}
              style={[
                styles.calendarDay,
                selected && styles.selectedCalendarDay,
              ]}
              onPress={() => {

                const newDate = new Date(
                  2026,
                  7,
                  date
                );

                setSelectedDate(newDate);

              }}
            >

              <Text
                style={[
                  styles.calendarDayText,
                  selected &&
                    styles.selectedCalendarDayText,
                ]}
              >
                {date}
              </Text>

            </Pressable>
          );

        })}

      </View>


      <Text style={styles.selectedDatePreview}>

        Selected:{" "}

        {selectedDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}

      </Text>


      <View style={styles.modalButtons}>

        <Pressable
          style={styles.cancelButton}
          onPress={() => setShowDateModal(false)}
        >
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </Pressable>


        <Pressable
          style={styles.doneButton}
          onPress={() => setShowDateModal(false)}
        >
          <Text style={styles.doneText}>
            Done
          </Text>
        </Pressable>

      </View>

    </View>

  </View>

</Modal>


{/* TIME MODAL */}

<Modal
  visible={showTimeModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowTimeModal(false)}
>

  <View style={styles.modalOverlay}>

    <View style={styles.modalContainer}>

      <View style={styles.modalHeader}>

        <Text style={styles.modalTitle}>
          Select Service Time
        </Text>

        <Pressable
          onPress={() => setShowTimeModal(false)}
        >
          <Ionicons
            name="close"
            size={26}
            color="#555"
          />
        </Pressable>

      </View>


      <Text style={styles.timeModalSubtitle}>
        Choose your preferred time
      </Text>


      <View style={styles.timeModalGrid}>

        {times.map((item) => {

          const selected =
            selectedTime.time === item.time &&
            selectedTime.period === item.period;

          return (
            <Pressable
              key={`${item.time}-${item.period}`}
              style={[
                styles.modalTimeCard,
                selected &&
                  styles.selectedModalTimeCard,
              ]}
              onPress={() => setSelectedTime(item)}
            >

              <Text
                style={[
                  styles.modalTimeText,
                  selected &&
                    styles.selectedModalTimeText,
                ]}
              >
                {item.time}
              </Text>

              <Text
                style={[
                  styles.modalPeriodText,
                  selected &&
                    styles.selectedModalTimeText,
                ]}
              >
                {item.period}
              </Text>

            </Pressable>
          );

        })}

      </View>


      <View style={styles.modalButtons}>

        <Pressable
          style={styles.cancelButton}
          onPress={() => setShowTimeModal(false)}
        >
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </Pressable>


        <Pressable
          style={styles.doneButton}
          onPress={() => setShowTimeModal(false)}
        >
          <Text style={styles.doneText}>
            Done
          </Text>
        </Pressable>

      </View>

    </View>

  </View>

</Modal>

{/* BOOKING CONFIRMATION MODAL */}

<Modal
  visible={showConfirmationModal}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setShowConfirmationModal(false)}
>

  {/* DARK OVERLAY */}

  <View style={styles.confirmationOverlay}>

    {/* CONFIRMATION CARD */}

    <View style={styles.confirmationCard}>

      {/* CLOSE BUTTON */}

      <Pressable
        style={styles.confirmationClose}
        onPress={() => setShowConfirmationModal(false)}
      >
        <Ionicons
          name="close"
          size={24}
          color="#777"
        />
      </Pressable>


      {/* ICON */}

      <View style={styles.confirmationIcon}>

        <Ionicons
          name="calendar"
          size={30}
          color="#8b15b9"
        />

      </View>


      {/* TITLE */}

      <Text style={styles.confirmationTitle}>
        Confirm Booking
      </Text>

      <Text style={styles.confirmationSubtitle}>
        Please review your booking details
      </Text>


      {/* PROFESSIONAL */}

      <View style={styles.confirmationProfessional}>

        <Image
          source={professional.image}
          style={styles.confirmationImage}
        />

        <View style={styles.confirmationProfessionalInfo}>

          <Text style={styles.confirmationName}>
            {professional.name}
          </Text>

          <Text style={styles.confirmationProfession}>
            {professional.profession}
          </Text>

        </View>

      </View>


      {/* BOOKING DETAILS */}

      <View style={styles.confirmationDetails}>

        {/* DATE */}

        <View style={styles.confirmationDetailRow}>

          <Ionicons
            name="calendar-outline"
            size={21}
            color="#8b15b9"
          />

          <View style={styles.confirmationDetailText}>

            <Text style={styles.confirmationLabel}>
              Date
            </Text>

            <Text style={styles.confirmationValue}>
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>

          </View>

        </View>


        {/* TIME */}

        <View style={styles.confirmationDetailRow}>

          <Ionicons
            name="time-outline"
            size={21}
            color="#8b15b9"
          />

          <View style={styles.confirmationDetailText}>

            <Text style={styles.confirmationLabel}>
              Time
            </Text>

            <Text style={styles.confirmationValue}>
              {selectedTime.time} {selectedTime.period}
            </Text>

          </View>

        </View>


        {/* ADDRESS */}

        <View style={styles.confirmationDetailRow}>

          <Ionicons
            name="location-outline"
            size={21}
            color="#8b15b9"
          />

          <View style={styles.confirmationDetailText}>

            <Text style={styles.confirmationLabel}>
              Service Address
            </Text>

            <Text style={styles.confirmationValue}>
              57 Marina, UBA House, Lagos Island
            </Text>

          </View>

        </View>

      </View>


      {/* PAYMENT */}

      <View style={styles.confirmationPayment}>

        <View style={styles.confirmationPaymentRow}>

          <Text style={styles.confirmationPaymentLabel}>
            Service Fee
          </Text>

          <Text style={styles.confirmationPaymentAmount}>
            ₦{serviceFee.toLocaleString()}
          </Text>

        </View>


        <View style={styles.confirmationPaymentRow}>

          <Text style={styles.confirmationPaymentLabel}>
            Booking Fee
          </Text>

          <Text style={styles.confirmationPaymentAmount}>
            ₦{bookingFee.toLocaleString()}
          </Text>

        </View>


        <View style={styles.confirmationDivider} />


        <View style={styles.confirmationPaymentRow}>

          <Text style={styles.confirmationTotalLabel}>
            Total
          </Text>

          <Text style={styles.confirmationTotalAmount}>
            ₦{totalAmount.toLocaleString()}
          </Text>

        </View>

      </View>


      {/* BUTTONS */}

      <View style={styles.confirmationButtons}>

        <Pressable
          style={styles.confirmationCancelButton}
          onPress={() => setShowConfirmationModal(false)}
        >

          <Text style={styles.confirmationCancelText}>
            Cancel
          </Text>

        </Pressable>


        <Pressable
          style={styles.confirmationConfirmButton}
          onPress={() => {
            setShowConfirmationModal(false);

            navigation.navigate("Payment", {
              professional: professional,
              selectedDate: selectedDate.toISOString(),
              selectedTime: selectedTime,
              serviceFee: serviceFee,
              bookingFee: bookingFee,
              totalAmount: totalAmount,
              notes: notes,
            });
          }}
        >

          <Text style={styles.confirmationConfirmText}>
            Confirm
          </Text>

        </Pressable>

      </View>

    </View>

  </View>

</Modal>

    </View>
  );
}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#ebcce823",
  },

  content: {
    paddingBottom: 30,
  },


  /* HEADER */

  header: {
    height: 95,
    paddingTop: 35,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    color: "#8b15b9",
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#8b15b9",
  },


  /* PROFESSIONAL */

  professionalSection: {
    flexDirection: "row",
    padding: 22,
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  professionalImage: {
    width: 135,
    height: 150,
    borderRadius: 22,
  },

  professionalInfo: {
    flex: 1,
    justifyContent: "center",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  professionalName: {
    fontSize: 23,
    fontWeight: "700",
    color: "#1d1620",
  },

  profession: {
    fontSize: 18,
    color: "#4d285b",
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 5,
  },

  rating: {
    fontSize: 16,
    fontWeight: "600",
  },

  reviews: {
    fontSize: 14,
    color: "#777",
  },

  divider: {
    color: "#aaa",
    marginHorizontal: 5,
  },

  distance: {
    fontSize: 14,
    color: "#666",
  },

  badges: {
    flexDirection: "row",
    gap: 2,
    marginTop: 12,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#e9e2ec",
    borderRadius: 14,
    backgroundColor: "#fff",
  },

  badgeText: {
    fontSize: 13,
    color: "#3b303f",
    fontWeight: "600",
  },


  /* SECTIONS */

  section: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#211822",
  },

  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  month: {
    fontSize: 15,
    color: "#666",
  },


  /* DATE */

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  dateSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 15,
    color: "#666",
  },

  dateList: {
    gap: 10,
    paddingTop: 14,
  },

  dateCard: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  selectedDateCard: {
    borderColor: "#8b15b9",
    backgroundColor: "#f7effa",
  },

  dateDay: {
    fontSize: 11,
    color: "#888",
    marginBottom: 4,
  },
  
  dateNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444",
  },
  
  selectedText: {
    color: "#8b15b9",
  },


  /* TIME */

  timeList: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },

  timeCard: {
    width: 78,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    gap: 4,
  },

  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  
  periodText: {
    fontSize: 11,
    color: "#888",
  },

  selectedTimeCard: {
    borderColor: "#8b15b9",
    backgroundColor: "#f7effa",
  },

  selectedTimeText: {
    color: "#8b15b9",
  },


  /* ADDRESS */

  addressCard: {
    marginTop: 14,
    minHeight: 75,
    borderWidth: 1,
    borderColor: "#e9e4eb",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 12,
  },

  addressIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#f5ebf8",
    justifyContent: "center",
    alignItems: "center",
  },

  addressText: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },

  changeText: {
    color: "#8b15b9",
    fontSize: 14,
    fontWeight: "600",
  },


  /* NOTES */

  notesCard: {
    marginTop: 14,
    minHeight: 95,
    borderWidth: 1,
    borderColor: "#e9e4eb",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    gap: 12,
  },

  notesIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#f5ebf8",
    justifyContent: "center",
    alignItems: "center",
  },

  notesInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    minHeight: 65,
    textAlignVertical: "top",
  },


  /* PAYMENT */

  paymentCard: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#e9e4eb",
    borderRadius: 17,
    padding: 18,
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  paymentLabel: {
    fontSize: 15,
    color: "#29232c",
  },

  paymentAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  bookingFeeLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  paymentDivider: {
    height: 1,
    backgroundColor: "#e7e2e9",
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#211822",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8b15b9",
  },


  /* BUTTONS */

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
    paddingHorizontal: 22,
  },

  buttonWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  chatButton: {
    minHeight: 48,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#8b15b9",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  chatText: {
    color: "#8b15b9",
    fontSize: 14,
    fontWeight: "700",
  },

  bookButton: {
    minHeight: 48,
    backgroundColor: "#8b15b9",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  bookText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },


  /* TRUST */

  trustRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginTop: 25,
    gap: 12,
  },

  trustItem: {
    flex: 1,
    alignItems: "center",
  },

  trustText: {
    textAlign: "center",
    fontSize: 11,
    color: "#555",
    lineHeight: 17,
    marginTop: 6,
  },


  /* NO PROFESSIONAL */

  noProfessionalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },

  noProfessionalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#54275f",
    marginTop: 15,
  },

  noProfessionalText: {
    textAlign: "center",
    color: "#777",
    fontSize: 15,
    marginTop: 10,
    lineHeight: 22,
  },

  backButton: {
    marginTop: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#8b15b9",
    borderRadius: 10,
  },

  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  /*MODAL*/

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
    maxHeight: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#54275f",
  },

  modalMonthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  modalMonth: {
    fontSize: 18,
    fontWeight: "700",
    color: "#54275f",
  },

  /* DAYS OF WEEK */

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  weekDay: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
  },

  /* CALENDAR */

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  calendarDayText: {
    fontSize: 15,
    color: "#444",
  },

  selectedCalendarDay: {
    backgroundColor: "#8b15b9",
  },

  selectedCalendarDayText: {
    color: "#fff",
    fontWeight: "700",
  },

  selectedDatePreview: {
    textAlign: "center",
    marginTop: 18,
    marginBottom: 20,
    fontSize: 15,
    color: "#777",
  },

  /* TIME MODAL */

  timeModalSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 18,
  },

  timeModalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  modalTimeCard: {
    width: "31%",
    minHeight: 65,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  selectedModalTimeCard: {
    backgroundColor: "#8b15b9",
    borderColor: "#8b15b9",
  },

  modalTimeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },

  modalPeriodText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  selectedModalTimeText: {
    color: "#fff",
  },

  /* MODAL BUTTONS */

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#8b15b9",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  cancelText: {
    color: "#8b15b9",
    fontSize: 16,
    fontWeight: "600",
  },

  doneButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8b15b9",
  },

  doneText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* CONFIRMATION MODAL */

confirmationOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
},

confirmationCard: {
  width: "100%",
  maxWidth: 430,
  backgroundColor: "#fff",
  borderRadius: 24,
  padding: 22,
  elevation: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.25,
  shadowRadius: 10,
},

confirmationClose: {
  position: "absolute",
  top: 15,
  right: 15,
  width: 35,
  height: 35,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
},

confirmationIcon: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#f3e5f7",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginTop: 5,
},

confirmationTitle: {
  textAlign: "center",
  fontSize: 22,
  fontWeight: "700",
  color: "#54275f",
  marginTop: 14,
},

confirmationSubtitle: {
  textAlign: "center",
  fontSize: 13,
  color: "#888",
  marginTop: 5,
  marginBottom: 18,
},

confirmationProfessional: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#faf6fb",
  borderRadius: 15,
  padding: 12,
  marginBottom: 18,
},

confirmationImage: {
  width: 55,
  height: 55,
  borderRadius: 28,
},

confirmationProfessionalInfo: {
  marginLeft: 12,
},

confirmationName: {
  fontSize: 16,
  fontWeight: "700",
  color: "#333",
},

confirmationProfession: {
  fontSize: 13,
  color: "#777",
  marginTop: 3,
},

confirmationDetails: {
  gap: 14,
},

confirmationDetailRow: {
  flexDirection: "row",
  alignItems: "center",
},

confirmationDetailText: {
  marginLeft: 12,
  flex: 1,
},

confirmationLabel: {
  fontSize: 12,
  color: "#999",
  marginBottom: 2,
},

confirmationValue: {
  fontSize: 14,
  color: "#333",
  fontWeight: "500",
},

confirmationPayment: {
  marginTop: 18,
  paddingTop: 15,
  borderTopWidth: 1,
  borderTopColor: "#eee",
},

confirmationPaymentRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

confirmationPaymentLabel: {
  fontSize: 13,
  color: "#777",
},

confirmationPaymentAmount: {
  fontSize: 14,
  color: "#444",
  fontWeight: "500",
},

confirmationDivider: {
  height: 1,
  backgroundColor: "#eee",
  marginVertical: 5,
},

confirmationTotalLabel: {
  fontSize: 16,
  fontWeight: "700",
  color: "#333",
},

confirmationTotalAmount: {
  fontSize: 18,
  fontWeight: "700",
  color: "#8b15b9",
},

confirmationButtons: {
  flexDirection: "row",
  gap: 12,
  marginTop: 18,
},

confirmationCancelButton: {
  flex: 1,
  height: 48,
  borderRadius: 13,
  borderWidth: 1,
  borderColor: "#8b15b9",
  justifyContent: "center",
  alignItems: "center",
},

confirmationCancelText: {
  color: "#8b15b9",
  fontSize: 15,
  fontWeight: "600",
},

confirmationConfirmButton: {
  flex: 1,
  height: 48,
  borderRadius: 13,
  backgroundColor: "#8b15b9",
  justifyContent: "center",
  alignItems: "center",
},

confirmationConfirmText: {
  color: "#fff",
  fontSize: 15,
  fontWeight: "600",
},

});