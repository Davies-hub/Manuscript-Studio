import { useUser } from '../../hooks/useUser'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text } from 'react-native'

const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile")
    }
  }, [user, authChecked])

  if (!authChecked) {
    return (
      <Text>Loading</Text>
    )
  }
  if (user) {
    // Optionally, you could redirect here, but useEffect already handles it
    return null;
  }
  return children
}

export default GuestOnly