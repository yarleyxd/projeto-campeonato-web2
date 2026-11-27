# Modelo de Dados

O projeto utiliza SQLite com duas tabelas: `modalidades` e `times`.

## modalidades

| Campo | Tipo | Regra |
|---|---|---|
| `id` | INTEGER | Chave primária, autoincremento |
| `nome` | TEXT | Obrigatório e único |

## times

| Campo | Tipo | Regra |
|---|---|---|
| `id` | INTEGER | Chave primária, autoincremento |
| `nome` | TEXT | Obrigatório e único |
| `cidade` | TEXT | Obrigatório |
| `fundacao` | INTEGER | Ano de fundação, obrigatório |
| `tecnico` | TEXT | Obrigatório |
| `ativo` | INTEGER | Obrigatório; `1` ativo ou `0` inativo |
| `modalidade_id` | INTEGER | Obrigatório; chave estrangeira para `modalidades.id` |

## Relacionamento

Uma modalidade pode estar relacionada a vários times. Cada time está associado a uma modalidade.

```mermaid
erDiagram
    MODALIDADES ||--o{ TIMES : possui
    MODALIDADES {
        INTEGER id PK
        TEXT nome UNIQUE
    }
    TIMES {
        INTEGER id PK
        TEXT nome UNIQUE
        TEXT cidade
        INTEGER fundacao
        TEXT tecnico
        INTEGER ativo
        INTEGER modalidade_id FK
    }
```

A conexão SQLite ativa a verificação de chaves estrangeiras com `PRAGMA foreign_keys = ON`.

## Arquivos

- `backend/db.js`: cria a pasta do banco, abre a conexão e cria as tabelas.
- `backend/seed.js`: insere as modalidades e os times iniciais.
- Banco criado em `backend/dados/campeonato.db` quando o código é executado.

## Seed

Execute `npm run seed`. Os inserts usam `INSERT OR IGNORE`, então executar novamente não duplica os registros que já existem.
