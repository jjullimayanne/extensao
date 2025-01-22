
# Sistema de Incentivo à Reciclagem para Comunidades Residenciais

## Descrição
Este projeto é uma API RESTful desenvolvida para gerenciar um sistema de reciclagem, recompensas e transações em comunidades residenciais. Ele permite que usuários ganhem pontos por reciclarem materiais (ex.: garrafas PET), que podem ser trocados por cupons e recompensas.

## Tecnologias Utilizadas
- Node.js
- PostgreSQL
- RabbitMQ
- Sequelize (ORM para banco de dados)
- JWT para autenticação
- DBeaver para gerenciamento de banco de dados (opcional)
- Docker (para execução com contêineres)

## Funcionalidades Principais
1. Registro de usuários
2. Login e autenticação via JWT
3. Simulação de reciclagem por webhook para adicionar pontos
4. Gerenciamento de cupons (listar, adicionar e resgatar)
5. Registro e consulta de transações
6. Sistema de pontos para materiais recicláveis

## Requisitos
- Node.js (v14 ou superior)
- PostgreSQL
- RabbitMQ
- DBeaver (opcional)
- Docker (opcional)
- npm (gerenciador de pacotes do Node.js)

---

## Como Rodar o Projeto

### Com Docker

1. **Instalar Docker e Docker Compose**:
   Certifique-se de que o Docker e o Docker Compose estão instalados.
   - Para mais informações, visite [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).

2. **Configurar Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   DATABASE_URL=postgres://user:password@db:5432/reciclagem
   RABBITMQ_URL=amqp://rabbitmq
   JWT_SECRET=seu-segredo-jwt
   PORT=3000
   ```

3. **Iniciar os Contêineres**:
   No terminal, execute:
   ```bash
   docker-compose up -d
   ```

4. **Executar Migrações**:
   Após iniciar os serviços, aplique as migrações:
   ```bash
   docker exec -it <nome-do-conteiner-da-api> npm run migrate
   ```

5. **Acessar a API**:
   O servidor estará disponível em:
   [http://localhost:3000](http://localhost:3000)

### Sem Docker

1. **Instalar PostgreSQL**:
   - Baixe e instale o PostgreSQL em [https://www.postgresql.org/download/](https://www.postgresql.org/download/).
   - Durante a instalação, configure o usuário e senha (ex.: `user` e `password`).

2. **Criar Banco de Dados**:
   Após instalar o PostgreSQL, use o DBeaver ou o terminal para criar o banco:
   ```sql
   CREATE DATABASE reciclagem;
   CREATE USER user WITH ENCRYPTED PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE reciclagem TO user;
   ```

3. **Instalar RabbitMQ**:
   - Baixe e instale o RabbitMQ em [https://www.rabbitmq.com/download.html](https://www.rabbitmq.com/download.html).
   - Certifique-se de que o serviço está rodando:
     ```bash
     rabbitmq-server
     ```

4. **Configurar Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/reciclagem
   RABBITMQ_URL=amqp://localhost
   JWT_SECRET=seu-segredo-jwt
   PORT=3000
   ```

5. **Instalar Dependências**:
   No terminal, execute:
   ```bash
   npm install
   ```

6. **Executar Migrações**:
   Aplique as migrações do banco de dados:
   ```bash
   npm run migrate
   ```

7. **Iniciar o Servidor**:
   Inicie a API com o comando:
   ```bash
   npm run dev
   ```

8. **Acessar a API**:
   O servidor estará disponível em:
   [http://localhost:3000](http://localhost:3000)

---

## Endpoints Principais

### Autenticação
- **Registro**: `POST /api/register`
- **Login**: `POST /api/login`

### Reciclagem e Pontos
- **Simular reciclagem (adicionar pontos)**: `POST /api/transactions/add-points`
- **Consultar saldo**: `GET /api/transactions/:userId/wallet`
- **Consultar transações**: `GET /api/transactions/:userId`

### Cupons
- **Listar cupons**: `GET /api/coupons`
- **Adicionar cupom**: `POST /api/coupons`
- **Resgatar cupom**: `POST /api/coupons/redeem`

---

## Estrutura do Projeto
```
src/
├── config/            # Configurações (banco, RabbitMQ, etc.)
├── controllers/       # Controladores para lógica de negócios
├── models/            # Modelos de dados
├── routes/            # Rotas da aplicação
├── services/          # Serviços e lógica de negócios
├── utils/             # Utilitários e constantes
├── workers/           # Workers para RabbitMQ
├── app.js             # Aplicação principal
```

---

## Testes
Para rodar os testes, execute:
```bash
npm test
```

---

## Contato
Em caso de dúvidas, entre em contato com o responsável pelo projeto.
