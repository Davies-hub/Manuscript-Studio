import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import { useUser } from '../../hooks/useUser';


const Spacer = ({ height = 20 }) => <View style={{ height }} />;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useUser();
    const [error, setError] = useState(null);

    const handleSubmit = async () => {

        setError(null);

        try {
            await login(email, password);
        } catch (error) {
            setError(error.message);
        }
        console.log("Current User:", user);
        console.log("Login form submitted", email, password);
    };
    return (
        Platform.OS === 'web' ? (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
                <View style={styles.gradientBg} />
                <View style={styles.banner}>
                  <Text style={styles.bannerText}>Welcome Back, Author</Text>
                </View>
                <View style={styles.bgDecor} />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                  <View style={styles.container}>
                      <View style={styles.card}>
                          <Spacer />
                          <Text title={true} style={styles.title}>
                              Welcome Back
                          </Text>
                          <Text style={styles.subtitle}>Sign in to your author account</Text>
                          <ThemedTextInput
                              style={{ width: '90%', marginBottom: 20 }}
                              placeholder='E-mail'
                              keyboardType='email-address'
                              onChangeText={setEmail}
                              value={email}
                          />
                          <ThemedTextInput
                              style={{ width: '90%', marginBottom: 20 }}
                              placeholder='Password'
                              onChangeText={setPassword}
                              value={password}
                              secureTextEntry={true}
                          />
                          <ThemedButton onPress={handleSubmit} style={styles.btn}>
                              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Login</Text>
                          </ThemedButton>
                          <Spacer/>
                          {error && <Text style={ styles.error }>{error}</Text>}
                          <Spacer height={40} />
                          <Link href="/register" replace>
                              <Text style={styles.linkText}>
                                  Don't have an account? Register
                              </Text>
                          </Link>
                          <Spacer height={10} />
                      </View>
                  </View>
                </ScrollView>
            </SafeAreaView>
        ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
                    <View style={styles.bgDecor} />
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Spacer />
                            <Text title={true} style={styles.title}>
                                Welcome Back
                            </Text>
                            <Text style={styles.subtitle}>Sign in to your author account</Text>
                            <ThemedTextInput
                                style={{ width: '90%', marginBottom: 20 }}
                                placeholder='E-mail'
                                keyboardType='email-address'
                                onChangeText={setEmail}
                                value={email}
                            />
                            <ThemedTextInput
                                style={{ width: '90%', marginBottom: 20 }}
                                placeholder='Password'
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={true}
                            />
                            <ThemedButton onPress={handleSubmit} style={styles.btn}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Login</Text>
                            </ThemedButton>
                            <Spacer/>
                            {error && <Text style={ styles.error }>{error}</Text>}
                            <Spacer height={40} />
                            <Link href="/register" replace>
                                <Text style={styles.linkText}>
                                    Don’t have an account? Register
                                </Text>
                            </Link>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    bgDecor: {
        position: 'absolute',
        top: -100,
        right: -100,
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
    title: {
        fontWeight: '900',
        fontSize: 28,
        color: '#2d1e2f',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#DAA520',
        fontWeight: '700',
        marginBottom: 18,
        textAlign: 'center',
    },
    linkText: {
        color: '#0A74DA',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 10,
        fontSize: 15,
    },
    card: {
        backgroundColor: '#fff',
        padding: 32,
        borderRadius: 18,
        shadowColor: '#DAA520',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 6,
        alignItems: 'center',
        minWidth: 340,
        maxWidth: 400,
        width: '100%',
    },
    btn: {
        backgroundColor: '#0A74DA',
        padding: 15,
        borderRadius: 8,
        width: 200,
        alignSelf: 'center',
        marginTop: 10,
    },
    error: {
        color: 'red',
        padding: 10,
        backgroundColor: '#f5c1c8',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 10,
        textAlign: 'center',
    },
})