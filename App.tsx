// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDB } from './src/database/database';

// Importando as telas
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import Home from './src/screens/Home';
import Perfil from './src/screens/Perfil';
import IMC from './src/screens/IMC'; 
import Moedas from './src/screens/Moedas';
import SistemaSolar from './src/screens/SistemaSolar';
import Pedidos from './src/screens/pedidos';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const setupDatabase = async () => {
      await initDB();
    };
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Telas de Autenticação */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Criar Conta' }} />
        
        {/* Menu Principal */}
        <Stack.Screen name="Home" component={Home} options={{ title: 'Início', headerBackVisible: false }} />
        
        {/* Telas de Funcionalidades */}
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Minha Conta' }} />
        <Stack.Screen name="IMC" component={IMC} options={{ title: 'Cálculo de IMC' }} />
        <Stack.Screen name="Moedas" component={Moedas} options={{ title: 'Conversão de Moedas' }} />
        <Stack.Screen name="SistemaSolar" component={SistemaSolar} options={{ title: 'Sistema Solar' }} />
        <Stack.Screen name="Pedidos" component={Pedidos} options={{ title: 'Meus Pedidos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}