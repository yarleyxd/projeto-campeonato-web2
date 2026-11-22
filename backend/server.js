const express = require("express");

const app = express();
app.use(express.json());

let times = [
    { id: 1, nome: "Corinthians", cidade: "São Paulo", fundacao: 1910, tecnico: "Clarence Seedorf", ativo: true },
    { id: 2, nome: "Ceará", cidade: "Capital do Ceará", fundacao: 1914, tecnico: "Anderson Batatais", ativo: true },
    { id: 3, nome: "Flamengo", cidade: "Rio de Janeiro", fundacao: 1895, tecnico: "Leonardo Jardim", ativo: true },
    { id: 4, nome: "São Paulo", cidade: "São Paulo", fundacao: 1930, tecnico: "Dorival Júnior", ativo: true },
    { id: 5, nome: "Fortaleza", cidade: "Fortaleza", fundacao: 1918, tecnico: "Juan Pablo Vojvoda", ativo: true },
    { id: 6, nome: "Palmeiras", cidade: "São Paulo", fundacao: 1914, tecnico: "Abel Ferreira", ativo: true },
];

let proximoId = Math.max(...times.map(t => t.id)) + 1;

// Registro das requisições
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`);
    next();
});

// Listar todos os times
app.get("/times", (req, res) => {
    let resultado = times;

    if (req.query.cidade) {
        resultado = resultado.filter(t =>
            t.cidade.toLowerCase() === req.query.cidade.toLowerCase()
        );
    }

    if (req.query.fundacaoMin) {
        const ano = Number(req.query.fundacaoMin);

        if (isNaN(ano)) {
            return res.status(400).json({ erro: "Ano inválido." });
        }

        resultado = resultado.filter(t => t.fundacao >= ano);
    }

    res.json(resultado);
});

// Buscar um time pelo ID
app.get("/times/:id", (req, res) => {
    const id = Number(req.params.id);
    const time = times.find(t => t.id === id);

    if (!time) {
        return res.status(404).json({ erro: "Time não encontrado." });
    }

    res.json(time);
});

// Criar time
app.post("/times", (req, res) => {
    const { nome, cidade, fundacao, tecnico, ativo } = req.body;

    if (!nome || !cidade || !fundacao || !tecnico || typeof ativo !== "boolean") {
        return res.status(400).json({ erro: "Preencha todos os campos corretamente." });
    }

    if (typeof fundacao !== "number" || fundacao < 1800 || fundacao > new Date().getFullYear()) {
        return res.status(400).json({ erro: "Ano de fundação inválido." });
    }

    const duplicado = times.some(t => t.nome.toLowerCase() === nome.trim().toLowerCase());

    if (duplicado) {
        return res.status(409).json({ erro: "Já existe um time com esse nome." });
    }

    const novoTime = {
        id: proximoId++,
        nome,
        cidade,
        fundacao,
        tecnico,
        ativo
    };

    times.push(novoTime);

    res.status(201).json(novoTime);
});

// Atualizar todos os dados de um time
app.put("/times/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = times.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Time não encontrado." });
    }

    const { nome, cidade, fundacao, tecnico, ativo } = req.body;

    if (!nome || !cidade || !fundacao || !tecnico || typeof ativo !== "boolean") {
        return res.status(400).json({ erro: "Preencha todos os campos corretamente." });
    }

    if (typeof fundacao !== "number" || fundacao < 1800 || fundacao > new Date().getFullYear()) {
        return res.status(400).json({ erro: "Ano de fundação inválido." });
    }

    const duplicado = times.some(t =>
        t.nome.toLowerCase() === nome.trim().toLowerCase() && t.id !== id
    );

    if (duplicado) {
        return res.status(409).json({ erro: "Já existe um time com esse nome." });
    }

    times[indice] = { id, nome, cidade, fundacao, tecnico, ativo };

    res.json(times[indice]);
});

// Atualizar somente alguns campos
app.patch("/times/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = times.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Time não encontrado." });
    }

    times[indice] = { ...times[indice], ...req.body };

    res.json(times[indice]);
});

// Excluir time
app.delete("/times/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = times.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Time não encontrado." });
    }

    times.splice(indice, 1);

    res.status(204).send();
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});