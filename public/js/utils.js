// utils.js
// Funções úteis usadas em várias partes do código

// Abre uma URL em uma nova aba
function openInNewTab(url) {
    window.open(url, "_blank");
}

// Valida uma transação diretamente no BigchainDB
function validateTx(txId) {
    if (!txId) return alert("txId não encontrado!");

    const url = `http://bsi.cefet-rj.br:9984/api/v1/transactions/${txId}`;
    window.open(url, "_blank");
}
