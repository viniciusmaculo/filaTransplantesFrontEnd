// api.js
// Arquivo responsável por buscar informações do backend

// Carrega a fila de um estado + órgão
async function loadQueue(estado, orgao) {
    currentEstado = estado;
    currentOrgao = orgao;

    // Monta a URL da API
    apiUrl = `http://localhost:3000/transplant/${estado}/${orgao}`;

    // Atualiza o título da página
    document.getElementById("title").innerText = `Fila – ${estado} / ${orgao}`;

    // Faz a requisição
    const res = await fetch(apiUrl);
    const data = await res.json();

    // Guarda o tx mais recente
    latestTx = data.txId;

    renderQueue(data);
}
