const db = require("./db");

const modalidades = ["Futebol", "Futsal", "Voleibol", "Basquete", "Handebol"];

const times = [
    { nome: "Corinthians", cidade: "São Paulo", fundacao: 1910, tecnico: "Clarence Seedorf", ativo: 1, modalidade: "Futebol" },
    { nome: "Ceará", cidade: "Capital do Ceará", fundacao: 1914, tecnico: "Anderson Batatais", ativo: 1, modalidade: "Futebol" },
    { nome: "Flamengo", cidade: "Rio de Janeiro", fundacao: 1895, tecnico: "Leonardo Jardim", ativo: 1, modalidade: "Futebol" },
    { nome: "São Paulo", cidade: "São Paulo", fundacao: 1930, tecnico: "Dorival Júnior", ativo: 1, modalidade: "Futebol" },
    { nome: "Fortaleza", cidade: "Fortaleza", fundacao: 1918, tecnico: "Juan Pablo Vojvoda", ativo: 1, modalidade: "Futebol" },
    { nome: "Palmeiras", cidade: "São Paulo", fundacao: 1914, tecnico: "Abel Ferreira", ativo: 1, modalidade: "Futebol" },
    { nome: "Santos", cidade: "Santos", fundacao: 1912, tecnico: "Cuca", ativo: 1, modalidade: "Futebol" },
    { nome: "Grêmio", cidade: "Porto Alegre", fundacao: 1903, tecnico: "Renato Portaluppi", ativo: 1, modalidade: "Futebol" },
    { nome: "Sada Cruzeiro", cidade: "Betim", fundacao: 2006, tecnico: "Filipe Ferraz", ativo: 1, modalidade: "Voleibol" },
    { nome: "Bauru Basket", cidade: "Bauru", fundacao: 1994, tecnico: "Paulo Jaú", ativo: 1, modalidade: "Basquete" }
];

const inserirModalidade = db.prepare("INSERT OR IGNORE INTO modalidades (nome) VALUES (?)");
const buscarModalidade = db.prepare("SELECT id FROM modalidades WHERE nome = ?");
const inserirTime = db.prepare(`
    INSERT OR IGNORE INTO times (nome, cidade, fundacao, tecnico, ativo, modalidade_id)
    VALUES (?, ?, ?, ?, ?, ?)
`);

const executarSeed = db.transaction(() => {
    for (const nome of modalidades) {
        inserirModalidade.run(nome);
    }

    for (const time of times) {
        const modalidade = buscarModalidade.get(time.modalidade);
        inserirTime.run(time.nome, time.cidade, time.fundacao, time.tecnico, time.ativo, modalidade.id);
    }
});

executarSeed();
console.log("Seed executado: modalidades e times cadastrados.");
db.close();
