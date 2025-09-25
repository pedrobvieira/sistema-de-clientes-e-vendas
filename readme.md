# Sistema de Gestão de Clientes e Vendas

Este é um sistema web completo e seguro, desenvolvido para auxiliar na gestão de clientes, produtos e finanças de um negócio individual. Ele permite o cadastro e login de usuários, a adição de clientes, o registro de vendas e pagamentos de produtos, além de fornecer relatórios de lucro por mês.

## Funcionalidades

- **Autenticação Segura:** Cadastro e login de usuários com senhas criptografadas.
- **Gestão de Clientes:** Adicione, edite e exclua clientes.
- **Gestão de Produtos:** Para cada cliente, é possível registrar produtos com informações detalhadas (nome, unidade, valor, data).
- **Controle Financeiro:**
  - Adicione o preço de custo e o valor de venda de cada produto.
  - O sistema calcula o valor total, o valor já pago e o valor restante.
  - Permite o registro de pagamentos de forma isolada do produto.
- **Relatórios:** Exibe o somatório do lucro por mês na tela principal.

## Tecnologias Utilizadas

Este projeto foi construído usando uma arquitetura moderna e escalável:

**Frontend:**
- **React:** Biblioteca JavaScript para construir a interface do usuário.
- **Styled-Components:** Para uma estilização de componentes dinâmica e moderna.
- **React Router DOM:** Para gerenciar a navegação entre as páginas.
- **Axios:** Para fazer as requisições à API do backend.
- **React Icons:** Para os ícones de editar e excluir.

**Backend:**
- **Node.js & Express:** Ambiente de execução e framework para a API REST.
- **MongoDB:** Banco de dados NoSQL para armazenar os dados.
- **Mongoose:** Biblioteca para interagir com o MongoDB.
- **JSON Web Token (JWT):** Para a autenticação e segurança do usuário.
- **Bcrypt.js:** Para a criptografia de senhas.

## Como Executar o Projeto Localmente

Para rodar este projeto no seu computador, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Configuração do Backend:**
    - Vá para a pasta `backend`.
    - Crie um arquivo `.env` com a sua string de conexão do MongoDB e a chave secreta para o JWT.
      ```
      MONGO_URI=sua-string-de-conexao-do-mongodb-atlas
      JWT_SECRET=sua-chave-secreta
      ```
    - Instale as dependências e inicie o servidor.
      ```bash
      npm install
      npm run server
      ```

3.  **Configuração do Frontend:**
    - Em um novo terminal, vá para a pasta `frontend`.
    - Instale as dependências e inicie a aplicação.
      ```bash
      npm install
      npm start
      ```
    - A aplicação será aberta automaticamente no seu navegador em `http://localhost:3000`.

## Contato
- Desenvolvido por: Pedro Brum Vieira
- GitHub: https://github.com/pedrobvieira
- LinkedIn: https://www.linkedin.com/in/pedro-brum-vieira-68583b215/
