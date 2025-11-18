// contact.jsx
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  Modal,
  Pressable,
} from "react-native";

const goldenrod = "#DAA520";
const blue = "#0A74DA";

const emails = ["smaida2311@ueab.ac.ke", "skimab2312@ueab.ac.ke"];
const phones = ["0714936606", "0763526179"];

const Contact = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalValue, setModalValue] = useState("");
  const [processing, setProcessing] = useState(false);

  const showConfirm = (type, value) => {
    setModalType(type);
    setModalValue(value);
    setModalVisible(true);
  };

  const hideConfirm = () => {
    setModalVisible(false);
    setModalType(null);
    setModalValue("");
    setProcessing(false);
  };

  const openEmail = async (email) => {
    setProcessing(true);
    const url = `mailto:${email}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert("Unable to open mail app on this device.");
    } catch {
      Alert.alert("Error", "Unable to open mail app.");
    } finally {
      hideConfirm();
    }
  };

  const callNumber = async (phone) => {
    setProcessing(true);
    const tel = Platform.OS === "android" ? `tel:${phone}` : `telprompt:${phone}`;
    try {
      const supported = await Linking.canOpenURL(tel);
      if (supported) await Linking.openURL(tel);
      else Alert.alert("Unable to start a call on this device.");
    } catch {
      Alert.alert("Error", "Unable to start the call.");
    } finally {
      hideConfirm();
    }
  };

  const onConfirm = () => {
    if (modalType === "email") openEmail(modalValue);
    else if (modalType === "call") callNumber(modalValue);
    else hideConfirm();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerBadge}>✉️ Contact</Text>
          <Text style={styles.headerTitle}>Contact Manuscript Studio</Text>
          <Text style={styles.headerSubtitle}>
            Reach out for author support, creative collaboration, or platform feedback.
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.homeBtn}
          >
            <Text style={styles.homeBtnText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={hideConfirm}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {modalType === "call" ? "Confirm call" : "Confirm email"}
            </Text>
            <Text style={styles.modalBody}>
              {modalType === "call"
                ? `Do you want to call ${modalValue}?`
                : `Do you want to send an email to ${modalValue}?`}
            </Text>
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={hideConfirm}>
                <Text style={[styles.modalButtonText, { color: blue }]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={onConfirm}
                disabled={processing}
              >
                <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                  {processing ? "Opening…" : "Proceed"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Author Support Email</Text>
          <Text style={styles.cardText}>
            For help with your manuscripts, account, or creative tools, email our support team.
          </Text>
          <View style={styles.row}>
            {emails.map((e) => (
              <TouchableOpacity key={e} onPress={() => showConfirm("email", e)} style={styles.contactPill}>
                <Text style={styles.pillText}>✉️ {e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Phone (Author Hotline)</Text>
          <Text style={styles.cardText}>For urgent author support or creative emergencies, call us directly.</Text>
          <View style={styles.row}>
            {phones.map((p) => (
              <TouchableOpacity key={p} onPress={() => showConfirm("call", p)} style={[styles.contactPill, styles.phonePill]}>
                <Text style={[styles.pillText, { color: "#fff" }]}>📱 {p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.cardAlt}>
          <Text style={styles.sectionTitle}>Creative Collaboration</Text>
          <Text style={styles.cardText}>
            Interested in partnering, workshops, or manuscript showcases? Email us to connect with the Manuscript Studio team.
          </Text>
        </View>

        <View style={styles.cardAlt}>
          <Text style={styles.sectionTitle}>Platform Feedback</Text>
          <Text style={styles.cardText}>
            We love hearing from authors! Share your ideas, feature requests, or report any issues to help us improve Manuscript Studio.
          </Text>
        </View>

        <View style={[styles.card, { alignItems: "center" }]}>
          <Text style={styles.sectionTitle}>Need help fast?</Text>
          <Text style={styles.cardText}>
            For urgent manuscript or account issues, use the hotline or email support.
          </Text>
          <TouchableOpacity style={styles.cta} onPress={() => showConfirm("email", emails[0])}>
            <Text style={styles.ctaText}>Email Author Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: goldenrod,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  headerLeft: { flex: 1, marginRight: 12 },
  headerRight: { justifyContent: "flex-start", alignItems: "flex-end" },
  headerBadge: { color: "#fff", fontSize: 13, fontWeight: "600" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 4 },
  headerSubtitle: { color: "#fff", marginTop: 4, fontSize: 12, opacity: 0.95, flexWrap: "wrap" },
  homeBtn: {
    backgroundColor: blue,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: "hidden",
    minWidth: 64,
    alignItems: "center",
  },
  homeBtnText: { color: "#fff", fontWeight: "700" },
  container: { padding: 16, paddingBottom: 36 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(10,116,218,0.06)",
  },
  cardAlt: {
    backgroundColor: "#fbfcff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(218,165,32,0.06)",
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: goldenrod, marginBottom: 8 },
  cardText: { fontSize: 14, color: "#222", lineHeight: 20 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  contactPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(10,116,218,0.12)",
    marginRight: 8,
    marginBottom: 8,
  },
  phonePill: {
    backgroundColor: blue,
    borderColor: "rgba(10,116,218,0.18)",
  },
  pillText: { fontWeight: "700", color: goldenrod },
  cta: {
    marginTop: 12,
    backgroundColor: goldenrod,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  ctaText: { color: "#fff", fontWeight: "800" },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(8,12,20,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  modalTitle: { fontSize: 17, fontWeight: "800", color: blue, marginBottom: 8 },
  modalBody: { fontSize: 14, color: "#222", lineHeight: 20, marginBottom: 16 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  modalButton: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, minWidth: 90, alignItems: "center" },
  cancelButton: { backgroundColor: "#fff", borderWidth: 1, borderColor: "rgba(10,116,218,0.12)" },
  confirmButton: { backgroundColor: goldenrod },
  modalButtonText: { fontWeight: "800" },
});
