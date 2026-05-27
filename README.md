Atividade 6 - Aplicativo de Serviços

Este é um aplicativo móvel integrado desenvolvido em React Native com a utilização do Expo Go. O sistema centraliza diversas ferramentas utilitárias sob um fluxo de navegação seguro, com autenticação de usuários e persistência de dados local utilizando o banco de dados SQLite.

 📱 Funcionalidades

Autenticação e Configurações
* **Tela de Login:** Validação de credenciais diretamente no banco de dados local.
* **Criação de Conta:** Cadastro de novos usuários com verificação de e-mail duplicado.
* **Alteração de Dados:** Permite que o usuário logado atualize seu nome e senha diretamente no perfil.

Módulos Integrados
* Calculadora de IMC: Realiza o cálculo do Índice de Massa Corporal, exibe a classificação e armazena automaticamente o resultado no histórico vinculado ao usuário.
* Pedidos (Cardápio): Simulação de um carrinho de compras onde o utilizador adiciona itens, calcula o total e, ao finalizar, registra o resumo do pedido no histórico.
* Conversor de Moedas: Tela integrada para conversão de valores monetários.
* Sistema Solar: Módulo visual e informativo sobre os corpos celestes.

---

🛠️ Tecnologias Utilizadas

* React Native (Core do aplicativo)
* Expo Go (Ambiente de desenvolvimento e testes)
* React Navigation / Native Stack (Gerenciamento de rotas e fluxo de navegação)
* Expo SQLite (Banco de dados relacional local para persistência de dados)
*  Expo Vector Icons (Ionicons) (Interface visual e iconografia)

---
📂 Estrutura de Pastas Sugerida

```text
.
├── assets/               # Imagens e recursos visuais do sistema
├── src/
│   ├── database/
│   │   └── database.ts   # Inicialização das tabelas do SQLite
│   └── screens/
│       ├── Login.tsx     # Tela de acesso
│       ├── Cadastro.tsx  # Tela de registro de usuário
│       ├── Home.tsx      # Menu principal (Painel)
│       ├── Perfil.tsx    # Atualização de dados da conta
│       ├── IMC.tsx       # Calculadora com histórico
│       ├── Moedas.tsx    # Conversor de moedas
│       ├── SistemaSolar.tsx
│       └── pedidos.tsx   # Cardápio com histórico de compras
├── App.tsx               # Configuração do NavigationContainer e Stack
└── package.json          # Dependências do projeto


🚀 Como Executar o Projeto
Pré-requisitos
Ter o Node.js instalado no computador.

Ter o aplicativo Expo Go instalado no seu dispositivo móvel (Android ou iOS).

Passo a Passo
Clonar o repositório:

Bash
git clone [https://github.com/VitorSoaresGoad/Atividade-6---Aplicativo-de-Servi-os.git](https://github.com/VitorSoaresGoad/Atividade-6---Aplicativo-de-Servi-os.git)
Entrar no diretório do projeto:

Bash
cd Atividade-6---Aplicativo-de-Servi-os
Instalar as dependências do projeto:

Bash
npm install
Iniciar o servidor de desenvolvimento do Expo:

Bash
npx expo start
Executar no telemóvel:

Abra o aplicativo Expo Go no seu smartphone.

No Android, escaneie o código QR gerado no terminal.

No iOS, utilize a aplicação nativa da Câmara para ler o código QR.
