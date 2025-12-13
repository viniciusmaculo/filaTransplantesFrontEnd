// Cria a fila vazia no BigchainDB
async function createQueue() {
    const res = await fetch(
        `${apiBase}/${currentEstado}/${currentOrgao}/create`,
        { method: "POST" }
    );

    const data = await res.json();
    alert(data.message || data.error);
}

// Adiciona paciente
async function addPatient() {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;

    if (!cpf || !nome) {
        alert("Preencha CPF e nome");
        return;
    }

    await fetch(`${apiBase}/${currentEstado}/${currentOrgao}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cpf,
            nome,
            usuario: `admin-${currentEstado}`
        })
    });

    selectQueue(currentEstado, currentOrgao);
}

// Chama o próximo da fila
async function callNext() {
    await fetch(`${apiBase}/${currentEstado}/${currentOrgao}/next`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: `admin-${currentEstado}` })
    });

    selectQueue(currentEstado, currentOrgao);
}

// Chama paciente pela posição
async function callByPosition(pos) {
    await fetch(
        `${apiBase}/${currentEstado}/${currentOrgao}/next/position/${pos}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario: `admin-${currentEstado}` })
        }
    );

    selectQueue(currentEstado, currentOrgao);
}

// Abre a transação mais recente no BigchainDB
function validateLatestTx(txId) {
    if (!txId) {
        alert("Transação não encontrada!");
        return;
    }

    const url = `http://bsi.cefet-rj.br:9984/api/v1/transactions/${txId}`;
    window.open(url, "_blank");
}
