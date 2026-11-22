# Projeto Campeonato Web 2 — Campeonato Esportivo[cite: 8, 9, 11]

Projeto final (Parte 1) com API CRUD em memória da entidade principal, página HTML/CSS com `fetch` e documentação[cite: 8, 9, 11].

## Equipe
- **Yarley:** Backend — API de `times`, 6 endpoints CRUD, validações e testes no Thunder Client[cite: 10, 11].
- **Vinicius:** Frontend — HTML/CSS, formulário de cadastro e listagem de `times` usando `fetch`[cite: 11].
- **Italo:** Documentação — `README.md`, `docs/api.md`, `docs/diagrama.md` e apoio nos testes finais[cite: 10, 11].

## Entidade Principal e Campos
- **Entidade:** `times`[cite: 9]
- **Campos:** `id`, `nome` (único para status `409`), `cidade`, `fundacao`, `tecnico` e `ativo`[cite: 9, 10].

## Documentação
- [Documentação da API](docs/api.md)[cite: 11]
- [Diagrama do Sistema](docs/diagrama.md)[cite: 11]

## Como Instalar e Rodar
1. `git clone https://github.com/yarleyxd/projeto-campeonato-web2.git`[cite: 1, 11]
2. `cd projeto-campeonato-web2`[cite: 1, 11]
3. `npm install`[cite: 11]
4. `node backend/server.js`[cite: 11, 14]
5. Acesse `http://localhost:3000`[cite: 10, 11]

## Testes
Testar os 6 endpoints e erros no Thunder Client e conferir cadastro/listagem na tela (com a aba Network aberta)[cite: 11, 13, 14].