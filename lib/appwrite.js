import { Client, Account, Databases, Storage } from 'appwrite';

// Check if environment variables are loaded (optional, but good)
if (!process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || !process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID) {
  // Console errors are often fine, but be careful not to output text directly outside a component's return
  console.error("ERROR: Appwrite environment variables are not set. Check your .env file.");
}

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) 
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID); 

// Export the services you'll use
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// You can export the client itself if needed
export default client;