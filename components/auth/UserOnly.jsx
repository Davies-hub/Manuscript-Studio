// components/auth/UserOnly.jsx (Corrected)

import { useUser } from '../../hooks/useUser'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text, View, ActivityIndicator } from 'react-native' // <-- ✅ Import Text from 'react-native'
import { StyleSheet } from 'react-native'

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login")
    }
  }, [user, authChecked])


  // 💡 Recommendation: Use a proper loading view
  if (!authChecked || !user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.text}>Loading user session...</Text>
      </View>
    )
  }

  return children
}

export default UserOnly

// Recommended minimal styles for a better loading state
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        marginTop: 10,
        color: '#555',
    }
})