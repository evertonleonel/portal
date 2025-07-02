# Portal Baixada Unificado Frontend

## 🛠 Instalação do Projeto

Siga os passos abaixo para configurar o ambiente de desenvolvimento e instalar o projeto localmente.

### 🔄 1. Clonar o Repositório

Para clonar o repositório, utilize o seguinte comando:

```bash
git clone https://
```

### 📂 2. Navegar até o Diretório do Projeto

Depois de clonar, entre no diretório do projeto com:

```bash
cd portal
```

### 📦 3. Instalar Dependências

Para instalar todas as dependências do projeto, você pode utilizar o comando abaixo:

```bash
npm i
```

### ⚙️ 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, utilizando o arquivo de exemplo como base. Para isso, copie o arquivo `.env.example` com o seguinte comando:

```bash
cp .env.example .env
```

Em seguida, edite o arquivo `.env` com as configurações específicas para o ambiente de desenvolvimento.

### 🚀 5. Iniciar o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando abaixo:

```bash
npm run dev
```

O projeto estará disponível no navegador no endereço `http://localhost:5173`.

## ⚙️ Configuração do Projeto

### 🔧 1. Configurar Prettier e ESLint

Este projeto utiliza `Prettier` e `ESLint` para manter a qualidade do código. Certifique-se de que seu editor de código esteja configurado para aplicar essas ferramentas automaticamente ao salvar os arquivos.

## 🚀 Criando um Branch

Antes de começar a trabalhar em uma nova feature ou correção, crie um branch específico para sua tarefa.

### 🔄 1. Atualizar o Branch `dev`

Certifique-se de que o branch `dev` esteja atualizado com as últimas mudanças, utilizando os comandos:

```bash
git checkout dev
```

para mudar para o branch `dev` e

```bash
git pull --rebase
```

para puxar as últimas alterações.

### 🌱 2. Criar um Novo Branch

Para criar um novo branch a partir do branch `dev`, utilize o comando:

```bash
git checkout -b nome-do-branch
```

Substitua `nome-do-branch` pelo nome do seu branch, seguindo o padrão:

- Para uma nova feature: \`feature/task-number-nome-feature\`
- Para uma correção: \`fix/task-number-nome-correcao\`

Exemplos:

```bash
git checkout -b feature/12345-nova-funcionalidade
```

para uma nova feature.

```bash
git checkout -b fix/67890-corrigir-bug
```

para uma correção de bug.

### 🔄 3. Sincronizar o Branch

Antes de enviar o branch para o repositório remoto, sincronize-o com o branch `dev` para evitar conflitos, utilizando os comandos:

```bash
git checkout dev
```

para mudar para o branch `dev`

```bash
git pull
```

para buscar as atualizações do repositório remoto.

```bash
git checkout sua-branch
```

para voltar ao seu branch

```bash
git rebase dev
```

para sincronizar com a `dev`

```bash
git push -f
```

para aplicar essas atualizações ao seu branch.

### 🔀 4. Criar uma Pull Request (PR)

No GitLab, crie uma Pull Request (PR) para o branch `develop`. Certifique-se de que a PR esteja clara, com uma descrição detalhada do que foi implementado ou corrigido.
