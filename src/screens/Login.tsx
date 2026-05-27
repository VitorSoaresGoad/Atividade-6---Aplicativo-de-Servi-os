import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('appData.db');
      const user: any = await db.getFirstAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, senha]
      );

      if (user) {
        navigation.replace('Home', { userId: user.id });
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao acessar o banco de dados.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="lock-open-outline" size={64} color="#007bff" />
      </View>
      <Text style={styles.title}>Acesso ao Sistema</Text>
      
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Criar uma nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f8f9fa' },
  iconContainer: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#212529' },
  input: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#dee2e6', fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 20, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkButton: { alignItems: 'center' },
  linkText: { color: '#007bff', fontSize: 16, fontWeight: '600' }
});