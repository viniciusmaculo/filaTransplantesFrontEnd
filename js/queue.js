// queue.js
// Responsável por mostrar a fila na tela

function renderQueue(data) {
    const div = document.getElementById("content");
    let html = "";

    // Caso a fila esteja vazia
    if (!data.metadata || !data.metadata.fila || data.metadata.fila.length === 0) {
        html += `<p><b>A fila está vazia.</b></p>`;
    } else {
        // Renderiza cada paciente
        data.metadata.fila.forEach(p => {
            html += `
                <div class="patient-card">
                    <p><b>Posição:</b> ${p.posicao}</p>
                    <p><b>Nome:</b> ${p.nome_mascarado}</p>
                    <p><b>CPF:</b> ${p.cpf_mascarado}</p>
                </div>
            `;
        });
    }

    // Botões gerais da fila
    html += `
        <div class="global-actions">
            <button onclick="openInNewTab('${apiUrl}')">Ver API</button>
            <button onclick="openHistory()">Histórico</button>
            <button onclick="validateTx('${latestTx}')">Validar no BigchainDB</button>
        </div>
    `;

    div.innerHTML = html;
}
