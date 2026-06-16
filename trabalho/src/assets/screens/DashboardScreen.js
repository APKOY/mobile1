import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Loading from '../components/Loading';
import useApi from '../hooks/useApi';
import { getPosts } from '../services/api';

export default function DashboardScreen({ navigation }) {
  const { data: posts, loading, error, reload } = useApi(getPosts);
  const [search, setSearch] = useState('');

  if (loading) {
    return <Loading message="Carregando posts da API..." />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <TouchableOpacity style={styles.button} onPress={reload}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar posts..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Details', { postId: item.id })
            }
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText} numberOfLines={2}>
              {item.body}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  center: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#7c3aed',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#7c3aed',
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  cardText: {
    color: '#555',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});