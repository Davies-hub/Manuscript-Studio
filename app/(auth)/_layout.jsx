import { Stack} from 'expo-router'
import { StatusBar } from "react-native"
import { useUser } from '../../hooks/useUser';
import GuestOnly from '../../components/auth/GuestOnly'; 

export default function AuthLayout() {

    const { user } = useUser();
    console.log("Auth Layout User:", user);

    return (
        <>
            <StatusBar style="dark" />
            <GuestOnly>
                <Stack screenOptions={{
                    animation: 'fade',
                }}/>
            </GuestOnly>
        </>
    )
}