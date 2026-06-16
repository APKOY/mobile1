import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { auth } from '../../firebaseConfig';
import Loading from '../components/Loading';
import useApi from '../hooks/useApi';
import { getPostById } from '../services/api';
import { saveLastViewedPost } from '../services/firebaseService';

export default function DetailsScreen({ route }) {
  const { postId } = route.params;

  const {
    data: post,
    loading,
    error,
  } = useApi(getPostById, [postId]);

  useEffect(() => {
    async function saveHistory() {
      if (post && auth.currentUser) {
        await saveLastViewedPost(auth.currentUser.uid, post);
      }
    }

    saveHistory();
  }, [post]);

  if (loading) {
    return <Loading message="Carregando detalhes..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Post #{post.id}</Text>

      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.body}>{post.body}</Text>

      <Text style={styles.info}>
        Este item foi salvo no Firestore como último post visualizado.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#fff',
  },
  badge: {
    color: '#7c3aed',
    fontWeight: 'bold',
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  body: {
    fontSize: 17,
    lineHeight: 25,
    color: '#444',
  },
  info: {
    marginTop: 24,
    color: '#666',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
  },
});