# Diagrama do Sistema — Campeonato Esportivo

## Entidade Principal (`times`) e Relacionamentos

```mermaid
erDiagram
    TIMES {
        int id
        string nome
        string cidade
        int fundacao
        string tecnico
        boolean ativo
    }

    JOGADORES {
        int id
        int timeId
        string nome
    }

    PARTIDAS {
        int id
        int timeCasaId
        int timeForaId
    }

    TIMES ||--o{ JOGADORES : possui
    TIMES ||--o{ PARTIDAS : disputa