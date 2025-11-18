// DebugDetector (temporary) - paste near top of books.jsx for debugging only
import React, { useEffect } from 'react';
import { Text } from 'react-native';

/**
 * Wrap your entire component with <DebugDetector> ... </DebugDetector>
 * It will recursively inspect rendered React elements (the JSX tree passed as "children")
 * and warn if it finds any string/number that is NOT inside a <Text> parent.
 */
const DebugDetector = ({ children }) => {
  useEffect(() => {
    const isStringLike = (v) => typeof v === 'string' || typeof v === 'number';

    function traverse(node, path = 'root', parentIsText = false) {
      if (node == null) return;
      if (isStringLike(node)) {
        if (!parentIsText && String(node).trim() !== '') {
          console.warn(`Stray text node found at ${path}:`, JSON.stringify(String(node)));
        }
        return;
      }
      if (Array.isArray(node)) {
        node.forEach((child, i) => traverse(child, `${path}[${i}]`, parentIsText));
        return;
      }
      // if it's a React element
      if (React.isValidElement(node)) {
        // Compare element.type to Text (imported from react-native)
        const typeIsText = node.type === Text;
        const children = node.props && node.props.children;
        traverse(children, `${path} -> <${getTypeName(node.type)}>`, typeIsText);
        return;
      }
      // fallback: might be object with children
      if (node && node.props && node.props.children) {
        traverse(node.props.children, `${path} -> unknown`, parentIsText);
      }
    }

    function getTypeName(t) {
      if (!t) return 'unknown';
      if (typeof t === 'string') return t;
      if (t.displayName) return t.displayName;
      if (t.name) return t.name;
      return 'Component';
    }

    traverse(children);
  }, [children]);

  return children;
};




// books.jsx (clean)
import { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../hooks/useUser';
import { API_BASE } from '../../config/api';

// Optional: temporary debug wrapper. Uncomment the import and wrapper lines below while debugging.
// import DebugDetector from './DebugDetector'; // OR paste the DebugDetector code above and use it.

const Books = () => {
  const { user } = useUser();
  const router = useRouter();
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/books?appwriteUserId=${encodeURIComponent(user.$id)}`);
      const data = await res.json();
      if (res.ok) setBooks(Array.isArray(data) ? data : []);
      else setBooks([]);
    } catch (err) {
      console.warn('Load books error', err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/books/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBooks((prev = []) => prev.filter((b) => b.id !== id));
      } else {
        console.warn('Delete failed', await res.text());
      }
    } catch (err) {
      console.warn('Delete error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const unsubscribe = router.addListener && router.addListener('focus', load);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f6f2' }}>
      <View style={[styles.container, { marginTop: 20 }]}>  
        <View style={styles.headerRow}>
          <Text style={styles.heading}>Your Manuscripts</Text>
          <TouchableOpacity onPress={load} style={styles.refreshBtn} accessibilityLabel="Refresh">
            <Text style={styles.refreshText}>⟳ Refresh</Text>
          </TouchableOpacity>
        </View>

        {books && books.length > 0 ? (
          <FlatList
            data={books}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.manuscriptCard}>
                <TouchableOpacity onPress={() => router.push(`/books/${item.id}`)} style={{ flex: 1 }}>
                  <View style={styles.cardHeader}>
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>{item.authorName ? item.authorName[0].toUpperCase() : '?'}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.manuscriptTitle}>{item.title}</Text>
                      <Text style={styles.manuscriptAuthor}>by {item.authorName || 'Unknown Author'}</Text>
                    </View>
                  </View>
                  <Text style={styles.manuscriptSnippet} numberOfLines={2}>
                    {item.description || '(No manuscript text yet)'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn} accessibilityLabel="Delete manuscript">
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            initialNumToRender={8}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16 }}>No manuscripts yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontWeight: '900', fontSize: 24, marginBottom: 12, color: '#2d1e2f', letterSpacing: 0.2 },
  manuscriptCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 0,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    flexDirection: 'column',
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DAA520',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 0.5,
  },
  manuscriptTitle: { fontWeight: '800', fontSize: 18, color: '#1e2a3a', marginBottom: 2 },
  manuscriptAuthor: { color: '#DAA520', fontWeight: '700', fontSize: 14, marginBottom: 2 },
  manuscriptSnippet: { color: '#444', fontSize: 14, marginTop: 4, marginBottom: 2, fontStyle: 'italic' },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-end',
    elevation: 1,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  refreshBtn: {
    backgroundColor: '#0A74DA',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 2,
  },
  refreshText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
