import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';

const planetas = [
  {
    id: '1',
    nome: 'Mercúrio',
    descricao: 'O menor planeta do Sistema Solar e o mais próximo do Sol. Não possui luas e sua superfície é cheia de crateras.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg'
  },
  {
    id: '2',
    nome: 'Vênus',
    descricao: 'O planeta mais quente do Sistema Solar, com uma atmosfera densa e tóxica. É o planeta mais brilhante no nosso céu.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg'
  },
  {
    id: '3',
    nome: 'Terra',
    descricao: 'O nosso lar. O único planeta conhecido a abrigar vida, com a maior parte de sua superfície coberta por água líquida.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
  },
  {
    id: '4',
    nome: 'Marte',
    descricao: 'Conhecido como o Planeta Vermelho devido ao óxido de ferro em sua superfície. Possui o maior vulcão do Sistema Solar.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'
  },
  {
    id: '5',
    nome: 'Júpiter',
    descricao: 'O maior planeta do Sistema Solar. É um gigante gasoso conhecido por sua Grande Mancha Vermelha, uma tempestade gigante.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg'
  },
  {
    id: '6',
    nome: 'Saturno',
    descricao: 'Famoso por seu complexo e brilhante sistema de anéis feitos de gelo e rocha. Também é um gigante gasoso.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg'
  },
  {
    id: '7',
    nome: 'Urano',
    descricao: 'Um gigante de gelo que gira de lado. Tem uma cor azul-esverdeada devido ao gás metano em sua atmosfera.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg'
  },
  {
    id: '8',
    nome: 'Netuno',
    descricao: 'O planeta mais distante do Sol. É um gigante de gelo escuro, frio e com ventos supersônicos muito fortes.',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829777304266%29.jpg'
  }
];

export default function App() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [planetaSelecionado, setPlanetaSelecionado] = useState<any>(null);

  const abrirModal = (planeta: any) => {
    setPlanetaSelecionado(planeta);
    setModalVisivel(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => abrirModal(item)}>
      <Image source={{ uri: item.imagem }} style={styles.imagemCard} />
      <Text style={styles.nomeCard}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Sistema Solar</Text>

      <FlatList
        data={planetas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2} 
        contentContainerStyle={styles.lista}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {planetaSelecionado && (
              <>
                <Image source={{ uri: planetaSelecionado.imagem }} style={styles.imagemModal} />
                <Text style={styles.tituloModal}>{planetaSelecionado.nome}</Text>
                <Text style={styles.descricaoModal}>{planetaSelecionado.descricao}</Text>
                
                <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisivel(false)}>
                  <Text style={styles.textoBotaoFechar}>Voltar para o Espaço</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17', 
    paddingTop: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  lista: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#15192B',
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    padding: 15,
    elevation: 3,
  },
  imagemCard: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nomeCard: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#15192B',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A405A',
  },
  imagemModal: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  tituloModal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  descricaoModal: {
    fontSize: 16,
    color: '#D0D6F9',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  botaoFechar: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  textoBotaoFechar: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});