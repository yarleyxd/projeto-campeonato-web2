# Documentação da API — Times

Base URL: `http://localhost:3000`

## Endpoints da Parte 1 (`/times`)

| Método | Caminho | O que faz | Corpo esperado | Status possíveis |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/times` | Lista os times (suporta filtros por query string)[cite: 10, 11] | — | `200`, `400`[cite: 10, 11] |
| `GET` | `/times/:id` | Devolve um time pelo ID[cite: 10] | — | `200`, `400` (ID inválido), `404`[cite: 10] |
| `POST` | `/times` | Cadastra um novo time[cite: 10] | `{"nome": "Fortaleza", "cidade": "Fortaleza", "fundacao": 1918, "tecnico": "Juan Pablo Vojvoda", "ativo": true}`[cite: 9, 10] | `201` (com `Location`), `400`, `409`[cite: 10] |
| `PUT` | `/times/:id` | Substitui o item inteiro[cite: 10] | `{"nome": "Fortaleza EC", "cidade": "Fortaleza", "fundacao": 1918, "tecnico": "Técnico Novo", "ativo": true}`[cite: 9, 10] | `200`, `400`, `404`, `409`[cite: 10] |
| `PATCH` | `/times/:id` | Altera só os campos enviados[cite: 10] | Ex.: `{"tecnico": "Novo Técnico"}`[cite: 9, 10] | `200`, `400`, `404`, `409`[cite: 10] |
| `DELETE` | `/times/:id` | Remove o item[cite: 10] | — | `204`, `404`[cite: 10] |

## Endpoints planejados (Partes 2 e 3)

| Método | Caminho | O que faz (planejado) |
| :--- | :--- | :--- |
| `GET` | `/jogadores` | Lista jogadores vinculados aos times[cite: 10] |
| `POST` | `/jogadores` | Cadastra jogador em um time[cite: 10] |
| `GET` | `/partidas` | Lista partidas do campeonato[cite: 10] |
| `POST` | `/partidas` | Registra uma partida entre times[cite: 10] |
| `POST` | `/auth/login` | Autentica utilizador para acesso protegido[cite: 10, 12] |
| `GET` | `/auth/perfil` | Consulta dados do utilizador autenticado[cite: 10, 12] |