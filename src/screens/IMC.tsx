import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

export default function IMCScreen({ route }: any) {
  const userId = route.params?.userId;
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    if (!userId) return;
    const db = await SQLite.openDatabaseAsync('appData.db');
    const result = await db.getAllAsync('SELECT * FROM imc_history WHERE user_id = ? ORDER BY id DESC', [userId]);
    setHistorico(result);
  };

  const calcularIMC = async () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!pesoNum || !alturaNum) {
      setResultado('Por favor, preencha peso e altura corretamente.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc >= 18.5 && imc <= 24.9) classificacao = 'Peso normal';
    else if (imc >= 25 && imc <= 29.9) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    setResultado(`Seu IMC é: ${imc.toFixed(2)}\nClassificação: ${classificacao}`);
    Keyboard.dismiss();

    if (userId) {
      const db = await SQLite.openDatabaseAsync('appData.db');
      const dataAtual = new Date().toLocaleDateString('pt-BR');
      await db.runAsync(
        'INSERT INTO imc_history (user_id, weight, height, imc, date) VALUES (?, ?, ?, ?, ?)',
        [userId, pesoNum, alturaNum, imc, dataAtual]
      );
      carregarHistorico();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <TextInput style={styles.input} placeholder="Peso (kg)" keyboardType="numeric" value={peso} onChangeText={setPeso} />
      <TextInput style={styles.input} placeholder="Altura (m)" keyboardType="numeric" value={altura} onChangeText={setAltura} />
      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      
      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultado}</Text>
        </View>
      )}

      <Text style={styles.historyTitle}>Histórico de Cálculos</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View style={styles.historyHeader}>
              <Ionicons name="calendar-outline" size={16} color="#6c757d" />
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text style={styles.historyText}>IMC: {item.imc.toFixed(2)} — {item.weight} kg</Text>
          </View>
        )}
        style={styles.historyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', alignItems: 'center', paddingTop: 20, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#212529' },
  input: { width: '100%', height: 52, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 16, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#dee2e6' },
  button: { width: '100%', height: 52, backgroundColor: '#007BFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultContainer: { marginTop: 20, padding: 20, backgroundColor: '#fff', borderRadius: 10, width: '100%', alignItems: 'center', elevation: 3, borderWidth: 1, borderColor: '#e0e0e0' },
  resultText: { fontSize: 17, color: '#212529', textAlign: 'center', lineHeight: 26, fontWeight: '600' },
  historyTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 24, marginBottom: 12, alignSelf: 'flex-start', color: '#212529' },
  historyList: { width: '100%', flex: 1 },
  historyItem: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1, borderWidth: 1, borderColor: '#dee2e6' },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  historyDate: { fontSize: 14, color: '#6c757d' },
  historyText: { fontSize: 16, color: '#212529', fontWeight: 'bold' }
});