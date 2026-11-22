const API_URL = "http://localhost:3000/times";

const formulario = document.getElementById("form-time");
const listaTimes = document.getElementById("lista-times");
const mensagem = document.getElementById("mensagem");

function escapar(texto) {
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

async function listarTimes() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os times.");
        }

        const times = await resposta.json();

        listaTimes.innerHTML = "";

        if (times.length === 0) {
            listaTimes.innerHTML = "<p>Nenhum time cadastrado.</p>";
            return;
        }

        times.forEach(time => {
            listaTimes.innerHTML += `
                <div class="time">
                    <h3>${escapar(time.nome)}</h3>
                    <p><strong>Cidade:</strong> ${escapar(time.cidade)}</p>
                    <p><strong>Fundação:</strong> ${escapar(time.fundacao)}</p>
                    <p><strong>Técnico:</strong> ${escapar(time.tecnico)}</p>
                    <p class="${time.ativo ? "ativo" : "inativo"}">
                        ${time.ativo ? "Ativo" : "Inativo"}
                    </p>
                </div>
            `;
        });

    } catch (erro) {
        listaTimes.innerHTML = `<p>${escapar(erro.message)}</p>`;
    }
}

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoTime = {
        nome: document.getElementById("nome").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        fundacao: Number(document.getElementById("fundacao").value),
        tecnico: document.getElementById("tecnico").value.trim(),
        ativo: document.getElementById("ativo").checked
    };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoTime)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.erro || "Não foi possível cadastrar o time.";
            return;
        }

        mensagem.textContent = "Time cadastrado com sucesso!";

        formulario.reset();

        document.getElementById("ativo").checked = true;

        await listarTimes();

    } catch (erro) {
        mensagem.textContent = "Não foi possível conectar à API.";
    }
});

listarTimes();