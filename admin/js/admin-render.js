// Renderiza a fila e os controles administrativos
function renderAdminQueue(data) {
    const div = document.getElementById("content");
    const latestTx = data?.txId;

    let html = `<div class="global-actions">`;

    // Se a fila NÃO existir, só mostra o botão de criar
    if (!data || !data.metadata) {
        html += `
            <button class="admin-button" onclick="createQueue()">
                Criar fila
            </button>
        `;
    }

    // Se a fila EXISTIR, mostra as ações administrativas
    if (data && data.metadata) {
        html += `
            <button class="admin-button secondary" onclick="callNext()">
                Chamar próximo
            </button>

            <button
                class="admin-button secondary"
                onclick="validateLatestTx('${latestTx}')">
                Validar no BigchainDB
            </button>
        `;
    }

    html += `</div>`;

    // Formulário só aparece se a fila existir
    if (data && data.metadata) {
        html += `
            <div class="admin-form">
                <h3>Adicionar novo paciente</h3>

                <input id="cpf" placeholder="CPF do paciente">
                <input id="nome" placeholder="Nome do paciente">

                <button class="admin-button" onclick="addPatient()">
                    Adicionar à fila
                </button>
            </div>
        `;
    }

    // Situações da fila
    if (!data || !data.metadata) {
        html += `<p><i>Fila ainda não existe.</i></p>`;
    } else if (data.metadata.fila.length === 0) {
        html += `<p><b>Fila vazia.</b></p>`;
    } else {
        // Lista de pacientes
        data.metadata.fila.forEach(p => {
            html += `
                <div class="patient-card">
                    <p><b>Posição:</b> ${p.posicao}</p>
                    <p><b>Nome:</b> ${p.nome_mascarado}</p>
                    <p><b>CPF:</b> ${p.cpf_mascarado}</p>

                    <button
                        class="admin-button secondary"
                        onclick="callByPosition(${p.posicao})">
                        Chamar paciente
                    </button>
                </div>
            `;
        });
    }

    div.innerHTML = html;
}
