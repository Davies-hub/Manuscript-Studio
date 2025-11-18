import { StyleSheet, View, Text, SafeAreaView, ScrollView, Platform } from 'react-native'
import { useUser } from '../../hooks/useUser';
import ThemedButton from '../../components/ThemedButton';

const Spacer = ({ height = 20 }) => <View style={{ height }} />;

const Profile = () => {
  const {logout, user, authChecked} = useUser();

  if (!user && !authChecked) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user && authChecked) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.heading}>You are not logged in.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // On web, use ScrollView and move avatar below banner
  const Content = (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{user.email ? user.email[0].toUpperCase() : '?'}</Text>
      </View>
      <Text title={true} style={styles.heading}>{user.email}</Text>
      <Text style={styles.subheading}>Author Profile</Text>
      <Spacer />
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>✍️</Text>
          <Text style={styles.statLabel}>Manuscripts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>⭐</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>📚</Text>
          <Text style={styles.statLabel}>Portfolio</Text>
        </View>
      </View>
      <Spacer height={18} />
      <View style={styles.featuredManuscriptBox}>
        <Text style={styles.featuredTitle}>Featured Manuscript</Text>
        <Text style={styles.featuredText} numberOfLines={2}>
          "Your next masterpiece will appear here. Start writing and let your creativity shine!"
        </Text>
      </View>
      <Spacer height={18} />
      <Text style={styles.quoteAnimated}>
        <Text style={{ color: '#DAA520', fontWeight: '900', fontSize: 22 }}>“</Text>
        Fill your paper with the breathings of your heart.
        <Text style={{ color: '#DAA520', fontWeight: '900', fontSize: 22 }}>”</Text>
      </Text>
      <Spacer />
      <ThemedButton onPress={logout} style={styles.logoutBtn}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Logout</Text>
      </ThemedButton>
      <Spacer height={20} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
      <View style={styles.gradientBg} />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Welcome, Author!</Text>
      </View>
      <View style={styles.bgDecor} />
      {Platform.OS === 'web' ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh' }}>
          {Content}
        </ScrollView>
      ) : (
        Content
      )}
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    zIndex: 2,
  },
  bgDecor: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 320,
    height: 320,
    backgroundColor: '#DAA52033',
    borderRadius: 160,
    zIndex: 0,
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: 'linear-gradient(180deg, #DAA52033 0%, #0A74DA11 100%)',
    zIndex: 0,
  },
  banner: {
    width: '100%',
    backgroundColor: '#0A74DA',
    paddingVertical: 22,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 10,
    zIndex: 1,
    shadowColor: '#0A74DA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 26,
    letterSpacing: 0.5,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DAA520',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 48,
    letterSpacing: 0.5,
  },
  heading: {
    fontWeight: '900',
    fontSize: 22,
    textAlign: 'center',
    color: '#2d1e2f',
  },
  subheading: {
    fontSize: 16,
    color: '#DAA520',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A74DA',
    marginBottom: 2,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 13,
    color: '#2d1e2f',
    fontWeight: '700',
    textAlign: 'center',
  },
  featuredManuscriptBox: {
    backgroundColor: '#fffbe6',
    borderRadius: 14,
    padding: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DAA52033',
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  featuredTitle: {
    fontWeight: '800',
    color: '#DAA520',
    fontSize: 16,
    marginBottom: 4,
  },
  featuredText: {
    color: '#2d1e2f',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  quote: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  quoteAnimated: {
    fontStyle: 'italic',
    color: '#0A74DA',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    marginTop: 10,
    width: 180,
    alignSelf: 'center',
  },
});