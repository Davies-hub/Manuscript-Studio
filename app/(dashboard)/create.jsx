import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { API_BASE } from '../../config/api';
import { useRouter } from 'expo-router';

const Create = () => {
  const { user } = useUser();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');

  const submit = async () => {
    if (!title.trim() || !authorName.trim()) {
      return Alert.alert('Please enter title and author name');
    }
    try {
      const res = await fetch(`${API_BASE}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          authorName: authorName.trim(),
          description: description.trim(),
          appwriteUserId: user.$id,
          email: user.email,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        return Alert.alert('Error', body.error || 'Failed to save');
      }
      Alert.alert('Saved', 'Manuscript saved successfully', [
        { text: 'OK', onPress: () => router.push('/books') }
      ]);
      setTitle(''); setAuthorName(''); setDescription('');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
      {Platform.OS === 'web' ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f6f2' }}>
          <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh' }}>
            <View style={[styles.container, { maxWidth: 1200, minWidth: 900, width: '100%', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #DAA52022', marginTop: 32, marginBottom: 32, padding: 48 }]}> 
              <Text style={[styles.heading, { marginTop: 8 }]}>New Manuscript</Text>

              <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={styles.authorInput}
                placeholder="Author name"
                value={authorName}
                onChangeText={setAuthorName}
              />

              <View style={styles.editorWrapWeb}>
                <Text style={styles.editorLabel}>Manuscript</Text>
                <TextInput
                  style={styles.editorWeb}
                  placeholder="Write your manuscript here..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 14 }}>
                <TouchableOpacity style={styles.btn} onPress={submit} accessibilityLabel="Save manuscript">
                  <Text style={styles.btnText}>Save Manuscript</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <View style={[styles.container, { flex: 1 }]}> 
              <Text style={styles.heading}>New Manuscript</Text>

              <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={styles.authorInput}
                placeholder="Author name"
                value={authorName}
                onChangeText={setAuthorName}
              />

              <View style={styles.editorWrapMobile}>
                <Text style={styles.editorLabel}>Manuscript</Text>
                <ScrollView style={{ flex: 1 }}>
                  <TextInput
                    style={styles.editorMobile}
                    placeholder="Write your manuscript here..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                  />
                </ScrollView>
              </View>

              <TouchableOpacity style={styles.btn} onPress={submit} accessibilityLabel="Save manuscript">
                <Text style={styles.btnText}>Save Manuscript</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontWeight: '800', fontSize: 28, marginBottom: 18, color: '#2d1e2f', textAlign: 'center', letterSpacing: 0.2 },
  titleInput: { backgroundColor: '#f7f7f8', padding: 16, borderRadius: 8, marginBottom: 12, width: '100%', fontSize: 18 },
  authorInput: { backgroundColor: '#f7f7f8', padding: 16, borderRadius: 8, marginBottom: 12, width: '100%', fontSize: 18 },
  editorWrap: { flex: 1, width: '100%', marginTop: 12 },
  editorLabel: { fontWeight: '700', marginBottom: 8, color: '#666', fontSize: 16 },
  editor: { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 10, padding: 18, height: 600, width: '100%', fontSize: 18, lineHeight: 26, boxShadow: '0 2px 8px #DAA52011' },
  editorWide: { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 10, padding: 24, height: 800, width: '100%', fontSize: 20, lineHeight: 30, boxShadow: '0 2px 16px #DAA52011', marginBottom: 8 },
  editorWrapMobile: { flex: 1, width: '100%', marginTop: 8, marginBottom: 8 },
  editorMobile: { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 8, padding: 14, minHeight: 420, width: '100%', fontSize: 16, lineHeight: 22 },
  editorWrapWeb: { flex: 1, width: '100%', marginTop: 12, marginBottom: 12 },
  editorWeb: { backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 12, padding: 32, minHeight: 700, height: '60vh', maxHeight: 900, width: '100%', fontSize: 22, lineHeight: 34, boxShadow: '0 2px 24px #DAA52011', marginBottom: 8, resize: 'vertical' },
  btn: { backgroundColor: '#DAA520', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 18, width: 260, alignSelf: 'center', elevation: 2 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 17 }
});
