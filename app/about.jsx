import React from "react";
import { Link, useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

/**
 * About screen for the Author's Manuscript Management Platform
 * Palette: goldenrod (#DAA520), white, blue (#0A74DA / #1E90FF)
 * Fully mobile-optimized version with wrapping tag pills.
 */
const About = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerBadge}>✍️ Author Platform</Text>
          <Text style={styles.headerTitle}>Manuscript Studio</Text>
          <Text style={styles.headerSubtitle}>
            Write · Organize · Publish — Your creative works, beautifully managed.
          </Text>
        </View>

        <View style={styles.headerRight}>
          <Link href="/" style={styles.homeLink}>
            Home
          </Link>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro card */}
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.cardTitle}>Why Manuscript Studio?</Text>
          <Text style={styles.cardText}>
            Manuscript Studio is a creative management platform designed for authors, poets, and storytellers. Whether you write novels, short stories, or poetry — this is your digital atelier to draft, organize, and showcase your works.
          </Text>

          {/* Wrapped tag pills */}
          <View
            style={[
              styles.pillRow,
              {
                backgroundColor: "#fffaf0",
                borderRadius: 999,
                paddingVertical: 8,
                paddingHorizontal: 6,
              },
            ]}
          >
            <Text style={styles.pill}>Goldenrod · Inspired</Text>
            <Text style={styles.pillAlt}>Blue · Creative</Text>
            <Text style={styles.pill}>White · Minimal</Text>
          </View>
        </View>

        {/* Features */}
        <View style={[styles.card, styles.cardAlt]}>
          <Text style={styles.sectionTitle}>Core features for Authors</Text>
          <Text style={styles.featureItem}>• Draft manuscripts in a distraction-free editor</Text>
          <Text style={styles.featureItem}>• Organize works by genre, status, or inspiration</Text>
          <Text style={styles.featureItem}>• Showcase your portfolio with beautiful cards</Text>
          <Text style={styles.featureItem}>• Securely store, edit, and revisit your writing</Text>
          <Text style={styles.featureItem}>• Share select works with readers or collaborators</Text>

          <Text style={styles.cardTextSmall}>
            Every feature is crafted to empower your creative journey and keep your manuscripts safe, organized, and ready for the world.
          </Text>
        </View>

        {/* How it works */}
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.sectionTitle}>How it works — for Authors</Text>

          <View style={styles.step}>
            <Text style={styles.stepIndex}>1</Text>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Start a new manuscript</Text>
              <Text style={styles.cardTextSmall}>
                Tap "New Manuscript", give it a title, and begin writing in the immersive editor. Your words are saved as you go.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepIndex}>2</Text>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Organize & tag</Text>
              <Text style={styles.cardTextSmall}>
                Group your works by genre, inspiration, or status. Tags and shelves help you find and revisit ideas quickly.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepIndex}>3</Text>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Edit & polish</Text>
              <Text style={styles.cardTextSmall}>
                Return to your drafts anytime. Edit, annotate, and refine your manuscripts with ease.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <Text style={styles.stepIndex}>4</Text>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>Showcase & share</Text>
              <Text style={styles.cardTextSmall}>
                Share select works with readers, publishers, or collaborators. You control what is public and what remains private.
              </Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={[styles.card, styles.cardAlt]}>
          <Text style={styles.sectionTitle}>Tips for Creative Flow</Text>

          <Text style={styles.cardText}>
            • Set aside daily writing time in your Studio.
            {"\n"}
            • Use tags for themes, genres, or moods.
            {"\n"}
            • Revisit and revise old drafts — every masterpiece starts as a draft.
            {"\n"}
            • Back up your manuscripts regularly for peace of mind.
          </Text>

          <Text style={[styles.cardTextSmall, { marginTop: 12 }]}>
            Pro tip: Use the immersive editor for long-form writing sessions and let your creativity flow without distractions.
          </Text>
        </View>

        {/* Privacy / data */}
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.sectionTitle}>Privacy & Data Ownership</Text>
          <Text style={styles.cardText}>
            Your manuscripts belong to you. Manuscript Studio is built to protect your creative work — with secure storage and optional encrypted cloud backup. You decide what to share and what to keep private.
          </Text>

          <Text style={styles.cardTextSmall}>
            We never sell your writing or data. Your creative journey is yours alone.
          </Text>
        </View>

        {/* Roadmap */}
        <View style={[styles.card, styles.cardAlt]}>
          <Text style={styles.sectionTitle}>What's next (Roadmap)</Text>
          <Text style={styles.cardText}>
            • Collaborative writing rooms for co-authors. {"\n"}
            • Advanced manuscript analytics and insights. {"\n"}
            • Customizable author portfolios and public pages. {"\n"}
            • Offline-first writing and encrypted backups.
          </Text>

          <Text style={[styles.cardTextSmall, { marginTop: 10 }]}>
            We build features that inspire creativity and protect your work.
          </Text>
        </View>

        {/* Closing / CTA */}
        <View style={[styles.card, styles.cardElevated, { alignItems: "center" }]}>
          <Text style={styles.sectionTitle}>Begin your next chapter</Text>
          <Text style={styles.cardText}>
            Ready to write your next story? Start a new manuscript and let your creativity shine — Manuscript Studio is your creative home.
          </Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => router.push(user ? "/profile" : "/login")}
          >
            <Text style={styles.ctaText}>Start Writing</Text>
          </TouchableOpacity>

          <Text style={[styles.smallNote, { marginTop: 12 }]}>
            Designed for authors • Colors: goldenrod, blue and white • Crafted for inspiration.
          </Text>
        </View>

        {/* Footer spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "#DAA520",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  headerLeft: {
    flex: 1,
  },
  headerBadge: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 4,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    color: "#fff",
    opacity: 0.95,
    marginTop: 4,
    fontSize: 12,
  },
  headerRight: {
    marginLeft: 12,
  },

  homeLink: {
    backgroundColor: "#0A74DA",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontWeight: "700",
    overflow: "hidden",
  },

  container: {
    padding: 16,
    paddingTop: 18,
    paddingBottom: 36,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(10,116,218,0.06)",
  },
  cardAlt: {
    backgroundColor: "#fbfcff",
    borderColor: "rgba(218,165,32,0.06)",
  },
  cardElevated: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0A74DA",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#DAA520",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: "#222",
    lineHeight: 20,
  },

  cardTextSmall: {
    fontSize: 13,
    color: "#333",
    opacity: 0.9,
    lineHeight: 18,
  },

  /* --- Fixed Responsive Pill Section --- */
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap", // ✅ allows multiple lines
    justifyContent: "center", // ✅ centers content
    marginTop: 12,
    gap: 8,
  },
  pill: {
    backgroundColor: "#fff",
    borderColor: "#DAA520",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "700",
    color: "#DAA520",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
  },
  pillAlt: {
    backgroundColor: "#0A74DA",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
  },

  featureItem: {
    fontSize: 14,
    marginBottom: 6,
    color: "#1e2a3a",
  },

  step: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "flex-start",
  },

  stepIndex: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: "#0A74DA",
    color: "#fff",
    textAlign: "center",
    lineHeight: 34,
    fontWeight: "800",
    marginRight: 12,
  },

  stepBody: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
    color: "#0A74DA",
  },

  cta: {
    marginTop: 12,
    backgroundColor: "#DAA520",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 180,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  smallNote: {
    fontSize: 12,
    color: "#333",
    opacity: 0.8,
    textAlign: "center",
  },
});
