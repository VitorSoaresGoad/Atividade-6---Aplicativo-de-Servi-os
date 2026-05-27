// src/screens/Perfil.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Perfil({ route, navigation }: any) {
  const { userId } = route.params; 

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const db = await SQLite.openDatabaseAsync('appData.db');
    const user: any = await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [userId]);
    if (user) {
      setNome(user.name);
      setSenha(user.password);
    }
  };

  const atualizarDados = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('appData.db');
      await db.runAsync('UPDATE users SET name = ?, password = ? WHERE id = ?', [nome, senha, userId]);
      Alert.alert('Sucesso', 'Dados atualizados!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Dados</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Nova Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={atualizarDados}>
        <Text style={styles.buttonText}>Atualizar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#ffc107', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});