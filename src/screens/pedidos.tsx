import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

const MENU_ITEMS = [
  { id: '1', name: 'Hambúrguer Clássico', price: 25.90 },
  { id: '2', name: 'Pizza de Frango', price: 45.00 },
  { id: '3', name: 'Refrigerante Lata', price: 6.50 },
  { id: '4', name: 'Porção de Fritas', price: 18.90 },
];

export default function PedidosScreen({ route }: any) {
  const userId = route.params?.userId;
  const [cart, setCart] = useState<any[]>([]);
  const [historicoPedidos, setHistoricoPedidos] = useState<any[]>([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    if (!userId) return;
    const db = await SQLite.openDatabaseAsync('appData.db');
    const result = await db.getAllAsync('SELECT * FROM orders_history WHERE user_id = ? ORDER BY id DESC', [userId]);
    setHistoricoPedidos(result);
  };

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const finalizeOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Atenção', 'Seu carrinho está vazio!');
      return;
    }
    
    if (userId) {
      const db = await SQLite.openDatabaseAsync('appData.db');
      const dataAtual = new Date().toLocaleDateString('pt-BR');
      
      const detalhesDoPedido = cart.map(item => item.name).join(', ');
      const total = calculateTotal();
      const resumoDoPedido = `${detalhesDoPedido} (Total: R$ ${total})`;

      await db.runAsync(
        'INSERT INTO orders_history (user_id, order_details, date) VALUES (?, ?, ?)',
        [userId, resumoDoPedido, dataAtual]
      );
      carregarPedidos();
    }

    Alert.alert('Sucesso', `Pedido finalizado! Total: R$ ${calculateTotal()}`);
    setCart([]);
  };

  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuItem}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <Ionicons name="add-circle-outline" size={18} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Cardápio</Text>
      
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={item => item.id}
        renderItem={renderMenuItem}
        style={styles.list}
      />

      <View style={styles.cartContainer}>
        <Text style={styles.cartInfo}>Itens no carrinho: {cart.length}</Text>
        <Text style={styles.cartTotal}>Total: R$ {calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={finalizeOrder}>
          <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.historyTitle}>Pedidos Anteriores</Text>
      <FlatList
        data={historicoPedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View style={styles.historyHeader}>
              <Ionicons name="time-outline" size={16} color="#6c757d" />
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text style={styles.historyDetails}>{item.order_details}</Text>
          </View>
        )}
        style={styles.historyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#212529' },
  list: { maxHeight: 240 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: '#dee2e6' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  itemPrice: { fontSize: 14, color: '#6c757d', marginTop: 4 },
  addButton: { backgroundColor: '#007BFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  cartContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 4, marginTop: 10, marginBottom: 20, borderWidth: 1, borderColor: '#dee2e6' },
  cartInfo: { fontSize: 16, color: '#495057', marginBottom: 4 },
  cartTotal: { fontSize: 22, fontWeight: 'bold', color: '#212529', marginBottom: 16 },
  checkoutButton: { backgroundColor: '#28a745', padding: 16, borderRadius: 10, alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  historyTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#212529' },
  historyList: { flex: 1 },
  historyItem: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#dee2e6' },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  historyDate: { fontSize: 14, color: '#6c757d' },
  historyDetails: { fontSize: 14, color: '#495057', fontWeight: '500' }
});