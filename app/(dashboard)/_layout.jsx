import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import UserOnly from "../../components/auth/UserOnly"

export default function DashboardLayout() {
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#f3f3f3', paddingTop: 10, height: 90 },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'black',
        }}
      >
        <Tabs.Screen 
          name="profile"
          options={{ title: "Profile", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'person': 'person-outline'} 
              color= 'goldenrod'
            />
          )}}
        />
        <Tabs.Screen 
          name="books"
          options={{ title: "Books", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'book': 'book-outline'} 
              color= 'goldenrod'
            />
          )}} 
        />
        <Tabs.Screen 
          name="create"
          options={{ title: "Create", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'create': 'create-outline'} 
              color= 'goldenrod'
            />
          )}} 
        />
        <Tabs.Screen
          name="books/[id]"
          options={{
            title: "Details",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'document-text' : 'document-text-outline'}
                color="goldenrod"
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  )
}