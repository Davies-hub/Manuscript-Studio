import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native"
import { Link } from 'expo-router'
import Logo from '../assets/lms1.png'

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.heroTitle}>Welcome to Manuscript Studio</Text>
          <Text style={styles.heroSubtitle}>A creative platform for authors to write, organize, and showcase their works.</Text>
        </View>
        <View style={styles.linksRow}>
          <Link href="/about" style={styles.linkBtn}>About</Link>
          <Link href="/contact" style={styles.linkBtn}>Contact</Link>
          <Link href="/login" style={styles.linkBtn}>Login</Link>
          <Link href="/register" style={styles.linkBtn}>Register</Link>
          <Link href="/profile" style={styles.linkBtn}>Profile</Link>
        </View>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaText}>Start your next manuscript and let your creativity shine!</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    heroCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 32,
        alignItems: 'center',
        marginBottom: 28,
        shadowColor: '#DAA520',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 6,
    },
    logo: {
        width: 110,
        height: 110,
        marginBottom: 18,
    },
    heroTitle: {
        fontWeight: '900',
        fontSize: 28,
        color: '#2d1e2f',
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#DAA520',
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    linksRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 24,
        justifyContent: 'center',
    },
    linkBtn: {
        backgroundColor: '#0A74DA',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        fontWeight: '700',
        marginHorizontal: 4,
        marginVertical: 4,
        overflow: 'hidden',
        fontSize: 15,
        textAlign: 'center',
    },
    ctaCard: {
        backgroundColor: '#DAA520',
        borderRadius: 14,
        padding: 22,
        marginTop: 10,
        shadowColor: '#DAA520',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
    ctaText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 17,
        textAlign: 'center',
    },
})