// app/(dashboard)/details.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_BASE } from '../../../config/api';

const Details = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  // editing state
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // form fields
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');

  const load = async () => {
    if (!id) return; // guard
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/books/${id}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return Alert.alert('Error', err.error || 'Failed to load');
      }
      const data = await res.json();
      setBook(data);
    } catch (err) {
      Alert.alert('Error', err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const startEdit = () => {
    if (!book) return;
    setTitle(book.title || '');
    setAuthorName(book.authorName || '');
    setDescription(book.description || '');
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    // keep book state as-is
  };

  const save = async () => {
    if (!title.trim() || !authorName.trim()) {
      return Alert.alert('Validation', 'Title and Author are required');
    }
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          authorName: authorName.trim(),
          description: description.trim() || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return Alert.alert('Save failed', err.error || 'Server error');
      }
      const updated = await res.json();
      setBook(updated);
      setEditing(false);
      Alert.alert('Saved', 'Book updated successfully');
    } catch (err) {
      Alert.alert('Error', err.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginHorizontal: 20 }}>
          No book selected. If you opened this screen directly, go back and open a book from the Books tab.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 16, backgroundColor: '#007bff', padding: 10, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff' }}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, color: '#888' }}>No book found or invalid book ID.</Text>
        <TouchableOpacity onPress={load} style={{ marginTop: 12 }}>
          <Text style={{ color: '#007bff' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.container, { justifyContent: 'flex-start' }]}>
            {/* Top controls */}
            <View style={styles.topRow}>
              {!editing ? (
                <>
                  <TouchableOpacity onPress={startEdit} style={[styles.btn, { backgroundColor: '#0A74DA' }]}>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={load} style={[styles.btn, { backgroundColor: '#888' }]}>
                    <Text style={styles.btnText}>Refresh</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.back()} style={[styles.btn, { backgroundColor: '#444' }]}>
                    <Text style={styles.btnText}>Back</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={save} style={[styles.btn, { backgroundColor: '#28a745' }]} disabled={saving}>
                    <Text style={styles.btnText}>{saving ? 'Saving...' : 'Save'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={cancelEdit} style={[styles.btn, { backgroundColor: '#888' }]} disabled={saving}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Content or Form */}
            {!editing ? (
              <View style={[styles.card]}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{book.authorName ? book.authorName[0].toUpperCase() : '?'}</Text>
                </View>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>by {book.authorName || 'Unknown Author'}</Text>
                <Text style={styles.desc}>{book.description || '(No manuscript text yet)'}</Text>
              </View>
            ) : (
              <View style={[styles.card, { paddingBottom: 32 }]}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Book title"
                  style={styles.input}
                />

                <Text style={styles.label}>Author</Text>
                <TextInput
                  value={authorName}
                  onChangeText={setAuthorName}
                  placeholder="Author name"
                  style={styles.input}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Short description"
                  style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
                  multiline
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginBottom: 12 },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    margin: 16,
    padding: 24,
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 8, color: '#2d1e2f', letterSpacing: 0.2, textAlign: 'center' },
  author: { fontSize: 16, color: '#DAA520', marginBottom: 16, fontWeight: '700', textAlign: 'center' },
  desc: { fontSize: 16, color: '#222', lineHeight: 24, textAlign: 'center', maxWidth: 420, fontStyle: 'italic', backgroundColor: '#f8f6f2', padding: 18, borderRadius: 12, marginTop: 8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DAA520',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 32,
    letterSpacing: 0.5,
  },
  label: { alignSelf: 'flex-start', marginLeft: 20, fontSize: 13, color: '#333', marginTop: 10, marginBottom: 6 },
  input: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
  },
});
