import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { auth } from '../../firebaseConfig';
import Loading from '../components/Loading';
import {
  getUserProfile,
  logoutUser,
} from '../services/firebaseService';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      setLoading(true);

      if (auth.currentUser) {
        const userProfile = await getUserProfile(auth.currentUser.uid);
        setProfile(userProfile);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <Loading message="Carregando perfil..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>
          {profile?.name || 'Não informado'}
        </Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.value}>
          {profile?.email || auth.currentUser?.email}
        </Text>

        <Text style={styles.label}>Último post visualizado:</Text>
        <Text style={styles.value}>
          {profile?.lastViewedPost?.title ||
            'Nenhum post visualizado ainda'}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#f5f3ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#4c1d95',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 12,
    marginTop: 24,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});