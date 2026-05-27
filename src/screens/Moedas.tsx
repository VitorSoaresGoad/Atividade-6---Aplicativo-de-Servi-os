import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Keyboard, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const moedas = {
  BRL: { taxaBaseUSD: 5.0, icone: 'https://flagcdn.com/w80/br.png', nome: 'Real' },
  USD: { taxaBaseUSD: 1.0, icone: 'https://flagcdn.com/w80/us.png', nome: 'Dólar' },
  EUR: { taxaBaseUSD: 0.92, icone: 'https://flagcdn.com/w80/eu.png', nome: 'Euro' },
  GBP: { taxaBaseUSD: 0.79, icone: 'https://flagcdn.com/w80/gb.png', nome: 'Libra' },
};

export default function App() {
  const [valor, setValor] = useState('');
  const [origem, setOrigem] = useState('BRL');
  const [destino, setDestino] = useState('USD');
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const formatarMoeda = (valorNumerico, moedaSimb) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: moedaSimb,
    }).format(valorNumerico);
  };

  const converter = () => {
    if (!valor || isNaN(valor)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    if (origem === destino) {
      Alert.alert('Erro', 'As moedas de origem e destino não podem ser iguais.');
      return;
    }

    Keyboard.dismiss();

    const valorEntrada = parseFloat(valor);
    const valorEmUSD = valorEntrada / moedas[origem].taxaBaseUSD;
    const valorConvertido = valorEmUSD * moedas[destino].taxaBaseUSD;

    const resultadoFormatado = formatarMoeda(valorConvertido, destino);
    const origemFormatada = formatarMoeda(valorEntrada, origem);

    setResultado(resultadoFormatado);

    const novaConversao = {
      id: Math.random().toString(),
      texto: `${origemFormatada} ➔ ${resultadoFormatado}`
    };

    setHistorico([novaConversao, ...historico]);
  };

  const inverter = () => {
    const temp = origem;
    setOrigem(destino);
    setDestino(temp);
    setResultado(null);
  };

  const limpar = () => {
    setValor('');
    setOrigem('BRL');
    setDestino('USD');
    setResultado(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <View style={styles.selecaoContainer}>
          <View style={styles.pickerWrapper}>
            <Image source={{ uri: moedas[origem].icone }} style={styles.bandeira} />
            <Picker
              selectedValue={origem}
              style={styles.picker}
              onValueChange={(itemValue) => setOrigem(itemValue)}
            >
              <Picker.Item label="BRL - Real" value="BRL" />
              <Picker.Item label="USD - Dólar" value="USD" />
              <Picker.Item label="EUR - Euro" value="EUR" />
              <Picker.Item label="GBP - Libra" value="GBP" />
            </Picker>
          </View>

          <TouchableOpacity onPress={inverter} style={styles.botaoInverter}>
            <Text style={styles.textoBotaoInverter}>⇅</Text>
          </TouchableOpacity>

          <View style={styles.pickerWrapper}>
            <Image source={{ uri: moedas[destino].icone }} style={styles.bandeira} />
            <Picker
              selectedValue={destino}
              style={styles.picker}
              onValueChange={(itemValue) => setDestino(itemValue)}
            >
              <Picker.Item label="BRL - Real" value="BRL" />
              <Picker.Item label="USD - Dólar" value="USD" />
              <Picker.Item label="EUR - Euro" value="EUR" />
              <Picker.Item label="GBP - Libra" value="GBP" />
            </Picker>
          </View>
        </View>

        <View style={styles.botoesAcao}>
          <TouchableOpacity style={styles.botaoConverter} onPress={converter}>
            <Text style={styles.textoBotao}>Converter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
            <Text style={styles.textoBotaoLimpar}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoTexto}>{resultado}</Text>
          </View>
        )}
      </View>

      <Text style={styles.subtitulo}>Histórico Recente</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemHistorico}>
            <Text style={styles.textoHistorico}>{item.texto}</Text>
          </View>
        )}
        style={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    color: '#2C3E50',
  },
  selecaoContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bandeira: {
    width: 30,
    height: 20,
    borderRadius: 3,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  botaoInverter: {
    alignSelf: 'center',
    backgroundColor: '#3498DB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  textoBotaoInverter: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botoesAcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoConverter: {
    backgroundColor: '#27AE60',
    flex: 0.65,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoLimpar: {
    backgroundColor: '#E74C3C',
    flex: 0.3,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoLimpar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E8F8F5',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  resultadoTexto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 10,
    marginLeft: 5,
  },
  lista: {
    flex: 1,
  },
  itemHistorico: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  textoHistorico: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});