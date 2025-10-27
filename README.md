# 📚 CryptoFunction - Ferramenta Didática de Criptografia

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg)

**Uma aplicação web interativa para aprender e experimentar com algoritmos clássicos de criptografia**

[![Demonstração](https://img.shields.io/badge/🚀-Ver_Demonstração-purple.svg)](#-como-executar)
[![Curiosidades](https://img.shields.io/badge/📚-Curiosidades-orange.svg)](#-funcionalidades)

</div>

## 🌟 Sobre o Projeto

O **CryptoFunction** é uma ferramenta educacional desenvolvida como parte de um projeto acadêmico para demonstrar métodos clássicos de criptografia de forma interativa e acessível. A aplicação combina uma interface moderna com conteúdo educativo rico, permitindo que usuários aprendam sobre criptografia enquanto experimentam com algoritmos reais.

### 🎯 Objetivos

- 🔐 **Educar** sobre fundamentos de segurança digital
- 🧪 **Demonstrar** algoritmos clássicos de criptografia  
- 🎮 **Proporcionar** experiência prática com criptografia
- 📚 **Divulgar** a história e evolução da criptografia

## 🚀 Funcionalidades

### 🛠️ Ferramenta de Criptografia
- **Cifra de César** - Deslocamento simples de caracteres
- **Cifra de Substituição** - Mapeamento aleatório de caracteres
- **Cifra de Transposição** - Rearranjo da ordem dos caracteres
- ⚡ Processamento em tempo real
- 🔄 Criptografar e descriptografar
- 🎯 Interface intuitiva e responsiva

### 📚 Conteúdo Educacional
- **História da Criptografia** - Linha do tempo interativa
- **Explicações Detalhadas** - Como cada algoritmo funciona
- **Curiosidades Históricas** - Fatos interessantes e casos reais
- **Quiz Interativo** - Teste seu conhecimento
- **Evolução Tecnológica** - Da Antiguidade à era digital

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.8+** - Linguagem principal
- **Flask 2.3.3** - Framework web
- **Werkzeug** - Utilitários WSGI

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos e responsivos
- **JavaScript ES6+** - Interatividade e dinamismo
- **Boxicons** - Ícones elegantes

### Design
- **Tema Escuro Moderno** - Interface agradável aos olhos
- **Design Responsivo** - Adaptável a todos os dispositivos
- **Animações CSS** - Transições suaves
- **Gradientes Personalizados** - Visual atraente

## 📦 Instalação e Execução

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### 🚀 Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/tcigualchi/CryptoFunction.git
   cd CryptoFunction
   ```

2. **Crie um ambiente virtual (opcional, mas recomendado)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate     # Windows
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute a aplicação**
   ```bash
   python app.py
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5000
   ```

### 📁 Estrutura do Projeto
```
CryptoFunction/
├── app.py                 # Aplicação Flask principal
├── requirements.txt       # Dependências do projeto
├── static/
│   ├── css/
│   │   └── style.css     # Estilos principais
│   └── js/
│       ├── app.js        # JavaScript da ferramenta
│       └── curiosities.js # JavaScript das curiosidades
└── templates/
    ├── index.html        # Página principal (ferramenta)
    └── curiosities.html  # Página de curiosidades
```

## 💡 Como Usar

### 🔐 Usando a Ferramenta de Criptografia

1. **Digite o texto** que deseja processar na área de texto
2. **Selecione o algoritmo** desejado:
   - **César**: Use o controle de chave para ajustar o deslocamento
   - **Substituição**: Clique em "Novas Chaves" para gerar mapeamento aleatório
   - **Transposição**: O texto será reorganizado automaticamente
3. **Escolha a operação**: Criptografar ou Descriptografar
4. **Clique em "Processar Texto"** ou use `Ctrl + Enter`

### 📖 Explorando o Conteúdo Educacional

1. **Navegue para "Curiosidades"** no menu superior
2. **Explore a linha do tempo** para entender a evolução histórica
3. **Leia as explicações detalhadas** de cada algoritmo
4. **Teste seu conhecimento** com o quiz interativo
5. **Descubra curiosidades** sobre casos reais de criptografia

## 🎓 Conteúdo Educacional Incluído

### 📜 História da Criptografia
- **Cifra de César** (100-44 a.C.) - Usada por Júlio César
- **Cifra de Substituição** (Século XV) - Popular entre reis e diplomatas
- **Cifra de Transposição** (Séculos XVI-XVII) - Usada por espartanos
- **Era Digital** - Do Enigma à criptografia quântica

### 🔍 Conceitos Explicados
- Como cada algoritmo funciona tecnicamente
- Métodos para quebrar cada cifra
- Análise de frequência e padrões
- Aplicações práticas no mundo real

## 🌐 API Endpoints

### `POST /api/encrypt`
Processa texto usando os algoritmos de criptografia.

**Body:**
```json
{
  "text": "Texto a ser processado",
  "algorithm": "cesar|substitution|transposition",
  "operation": "encrypt|decrypt",
  "key": 3
}
```

**Resposta:**
```json
{
  "success": true,
  "result": "Texto processado",
  "algorithm": "cesar",
  "operation": "encrypt"
}
```

### `POST /api/generate-new-keys`
Gera novos mapeamentos para a cifra de substituição.

## 🎨 Personalização

### Cores e Tema
O tema pode ser personalizado modificando as variáveis CSS em `static/css/style.css`:

```css
:root {
    --primary: #2563eb;
    --accent: #f59e0b;
    --background: #0f172a;
    /* ... outras variáveis */
}
```

### Adicionando Novos Algoritmos
1. Implemente o algoritmo em `app.py` na classe `CriptografiaService`
2. Adicione a opção no select do HTML
3. Atualize a lógica JavaScript em `static/js/app.js`

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estos passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### 🐛 Reportando Problemas
Encontrou um bug? [Abra uma issue](https://github.com/tcigualchi/CryptoFunction/issues) com:
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Capturas de tela (se aplicável)

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙋‍♂️ Suporte

- 📧 **Email**: tcigualchi@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/tcigualchi/CryptoFunction/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/tcigualchi/CryptoFunction/discussions)

## 🏆 Créditos

Desenvolvido como parte do projeto **APS - Atividades Práticas Supervisionadas** do curso de Ciência da Computação.

**Desenvolvido com ❤️ para a comunidade acadêmica**

---

<div align="center">

**⭐️ Não se esqueça de dar uma estrela no repositório se este projeto foi útil para você!**

[⬆ Voltar ao topo](#-CryptoFunction---ferramenta-didática-de-criptografia)

</div>
