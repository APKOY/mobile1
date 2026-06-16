import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Loading from '../components/Loading';
import { loginUser, registerUser } from '../services/firebaseService';

export default function LoginScreen() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password || (isRegister && !name)) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);

      if (isRegister) {
        await registerUser(name, email, password);
      } else {
        await loginUser(email, password);
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loading
        message={isRegister ? 'Criando conta...' : 'Entrando...'}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>Meu App</Text>

      <Text style={styles.title}>
        {isRegister ? 'Criar conta' : 'Login'}
      </Text>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isRegister ? 'Registrar' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.link}>
          {isRegister
            ? 'Já tenho conta. Fazer login'
            : 'Não tenho conta. Registrar'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f3ff',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#7c3aed',
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#7c3aed',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
});