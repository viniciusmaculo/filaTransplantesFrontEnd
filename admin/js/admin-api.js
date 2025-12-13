// Seleciona uma fila e carrega os dados
async function selectQueue(estado, orgao) {
    currentEstado = estado;
    currentOrgao = orgao;

    document.getElementById("title").innerText =
        `Admin – ${estado} / ${orgao}`;

    try {
        const res = await fetch(`${apiBase}/${estado}/${orgao}`);
        const data = await res.json();

        renderAdminQueue(data);
    } catch {
        renderAdminQueue(null);
    }
}
