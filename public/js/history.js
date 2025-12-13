
//   ABRIR O HISTÓRICO
async function openHistory() {
    try {
        const url = `http://localhost:3000/transplant/${currentEstado}/${currentOrgao}/history`;

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Erro ao buscar histórico. Código HTTP: " + res.status);
        }

        const data = await res.json();

        const historyArray = Array.isArray(data.historico) ? data.historico : [];

        let html = "";

        if (historyArray.length === 0) {
            html = `<p><i>Nenhuma versão encontrada no histórico.</i></p>`;
        } else {
            historyArray.forEach(entry => {
                html += `
                    <div class="history-entry">

                        <p><b>Versão:</b> ${entry.versao}</p>
                        <p><b>Evento:</b> ${entry.evento}</p>
                        <p><b>Timestamp:</b> ${entry.timestamp}</p>

                        <p><b>Paciente Chamado:</b><br>
                            ${entry.pacienteChamado ? `
                                Nome: ${entry.pacienteChamado.nome_mascarado}<br>
                                CPF: ${entry.pacienteChamado.cpf_mascarado}<br>
                                Posição: ${entry.pacienteChamado.posicao}<br>
                            ` : "Nenhum"}
                        </p>

                        <p><b>Paciente Adicionado:</b><br>
                            ${entry.pacienteAdicionado ? `
                                Nome: ${entry.pacienteAdicionado.nome_mascarado}<br>
                                CPF: ${entry.pacienteAdicionado.cpf_mascarado}<br>
                                Posição: ${entry.pacienteAdicionado.posicao}<br>
                            ` : "Nenhum"}
                        </p>

                        <p><b>txID:</b> ${entry.txId}</p>

                        <button onclick="validateTx('${entry.txId}')">
                            Validar essa versão no BigchainDB
                        </button>

                        <details>
                            <summary><b>Ver fila dessa versão</b></summary>
                            <pre>${JSON.stringify(entry.fila, null, 2)}</pre>
                        </details>

                    </div>
                `;
            });
        }

        document.getElementById("historyContent").innerHTML = html;

        // Mostra modal
        document.getElementById("historyModal").style.display = "flex";

    } catch (err) {
        console.error("Erro ao carregar histórico:", err);

        document.getElementById("historyContent").innerHTML =
            `<p style="color:red;">Erro ao carregar histórico: ${err.message}</p>`;

        document.getElementById("historyModal").style.display = "flex";
    }
}



//   FECHAR O MODAL
function closeHistory() {
    document.getElementById("historyModal").style.display = "none";
}



//   FECHAR AO CLICAR FORA DO MODAL
window.addEventListener("click", function (event) {
    const modal = document.getElementById("historyModal");
    const content = document.querySelector(".modal-content");

    // Se clicou no fundo (modal escuro), fecha
    if (event.target === modal) {
        closeHistory();
    }
});
