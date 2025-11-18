import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from "react-native"
import { UserProvider } from '../context/UserContext'

const Rootlayout = () => {
  return (
    <UserProvider>
      <Stack screenOptions ={{
        headerStyle: { backgroundColor: '#ddd' },
        headerTintColor: '#333',
      }}>
        <Stack.Screen name='index' options={{ title: 'Home'}}/>
        <Stack.Screen name='about' options={{ title: 'About'}}/>
        <Stack.Screen name='contact' options={{ title: 'Contact'}}/>
        <Stack.Screen name='(auth)' options={{ headerShown: false}}/>
        <Stack.Screen name='(dashboard)' options={{ headerShown: false}}/>
      </Stack>
    </UserProvider>
  )
} // <-- The function should end here immediately

export default Rootlayout

const styles = StyleSheet.create({})