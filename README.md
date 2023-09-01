# Documentação do Software - CRUD de Cadastro de Pessoa

Bem-vindo à documentação do software de CRUD de Cadastro de Pessoa! Este documento fornecerá uma visão geral das bibliotecas utilizadas e suas principais vantagens.

---

## Bibliotecas Utilizadas

### 1. @tanstack/react-query
O React Query é uma biblioteca que simplifica o gerenciamento de estados assíncronos no React. Ele oferece hooks como `useQuery` e `useMutation`, que facilitam a busca e a manipulação de dados assíncronos. Benefícios principais:

- **Simplificação de Requisições Assíncronas:** `useQuery` abstrai a lógica de busca de dados assíncronos, facilitando a obtenção e a atualização dos dados da API.
  
- **Optimistic Updates:** O uso de `useMutation` permite a atualização otimista, onde a interface é atualizada antes mesmo de a API confirmar o sucesso da mutação, melhorando a sensação de responsividade.
  
- **Gerenciamento Automático do Cache:** O React Query mantém um cache local automaticamente, reduzindo a necessidade de rebuscar os mesmos dados repetidamente.

### 2. MUI (Material-UI)
O Material-UI é uma biblioteca de componentes React para construir interfaces de usuário consistentes e atraentes. Alguns benefícios notáveis são:

- **Design Consistente:** MUI oferece componentes seguindo as diretrizes de design do Material Design, resultando em uma interface coesa e moderna.
  
- **Customização Simples:** Os componentes podem ser facilmente personalizados para se adequarem à identidade visual da aplicação, sem perder a funcionalidade pronta para uso.
  
- **Responsividade:** Os componentes são responsivos por padrão, adaptando-se a diferentes tamanhos de tela sem esforço adicional.

### 3. Cypress
Cypress é uma ferramenta de teste de interface de usuário que permite a criação de testes end-to-end de forma eficiente. Alguns pontos fortes incluem:

- **Testes em Tempo Real:** Cypress permite a visualização dos testes enquanto eles são executados, facilitando a depuração e compreensão do fluxo de teste.
  
- **Integração Fácil:** Sua integração simples com o ecossistema de desenvolvimento torna a criação e a execução de testes um processo tranquilo.
  
- **Simulação Interativa:** Cypress oferece a capacidade de simular interações do usuário, como cliques e preenchimento de formulários, permitindo testes abrangentes.

---

## Começando

Para começar, siga as etapas abaixo para configurar e executar o servidor de desenvolvimento:

1. Clone este repositório para o seu ambiente local:

git clone <https://github.com/Fabinschulz/person-crud-web.git>

2. Instale as dependências do projeto usando npm, yarn ou pnpm:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Isso iniciará o servidor de desenvolvimento e você poderá acessar o aplicativo em seu navegador. Certifique-se de que todas as dependências foram instaladas corretamente antes de prosseguir.

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.

Você pode começar a editar a página ao modificar `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

Este projeto utiliza  [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para otimizar e carregar automaticamente a fonte Inter, uma fonte personalizada do Google.

## Arquiteturas:
- Arquitetura completa com preocupações de separação de responsabilidade, SOLID e Clean Code.
- Test Driven Development - TDD.

## Deploy on Vercel

---
