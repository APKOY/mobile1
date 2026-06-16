import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading({ message = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#7c3aed" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f3ff',
  },
  text: {
    fontSize: 16,
    color: '#4c1d95',
    fontWeight: '600',
  },
});