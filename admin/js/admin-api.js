// Seleciona uma fila e carrega os dados
async function selectQueue(estado, orgao) {
    currentEstado = estado;
    currentOrgao = orgao;

    document.getElementById("title").innerText =
        `Admin – ${estado} / ${orgao}`;

    try {
        const res = await fetch(`${apiBase}/${estado}/${orgao}`);

            if (!res.ok) {
                renderAdminQueue({
                    error: true,
                    message: "Fila não encontrada ou ainda não indexada."
                });
                return;
        }

        const data = await res.json();

        renderAdminQueue(data);
    } catch {
        console.error(err);
        renderAdminQueue({
            error: true,
            message: "Erro de comunicação com o servidor."
        });
    }
}
