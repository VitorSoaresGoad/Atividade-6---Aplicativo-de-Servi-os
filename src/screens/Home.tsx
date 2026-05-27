import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ route, navigation }: any) {
  const userId = route.params?.userId;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel Principal</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.perfilCard]} onPress={() => navigation.navigate('Perfil', { userId })}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
          <Text style={styles.cardTextWhite}>Alterar Dados da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('IMC', { userId })}>
          <Ionicons name="calculator-outline" size={32} color="#007bff" />
          <Text style={styles.cardText}>Calculadora IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Moedas')}>
          <Ionicons name="cash-outline" size={32} color="#007bff" />
          <Text style={styles.cardText}>Conversor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SistemaSolar')}>
          <Ionicons name="planet-outline" size={32} color="#007bff" />
          <Text style={styles.cardText}>Sistema Solar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pedidos', { userId })}>
          <Ionicons name="restaurant-outline" size={32} color="#007bff" />
          <Text style={styles.cardText}>Pedidos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#212529' },
  grid: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '47%', backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, borderWidth: 1, borderColor: '#dee2e6' },
  perfilCard: { width: '100%', backgroundColor: '#28a745', flexDirection: 'row', gap: 10, borderColor: '#28a745' },
  cardText: { color: '#495057', fontSize: 16, fontWeight: '600', marginTop: 10, textAlign: 'center' },
  cardTextWhite: { color: '#fff', fontSize: 16, fontWeight: '600' }
});