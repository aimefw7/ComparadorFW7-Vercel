// Foco automático no textarea "fw7-input" ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const fw7Input = document.getElementById('fw7-input');
    fw7Input.focus();
});

let debounceTimeout;
function debounceCompareValues() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(compareValues, 500);
}

function compareValues() {
    const fw7Input = [...new Set(document.getElementById('fw7-input').value.split('\n').map(str => str.trim()).filter(str => str !== ''))];
    const erpInput = [...new Set(document.getElementById('erp-input').value.split('\n').map(str => str.trim()).filter(str => str !== ''))];

    const fw7Set = new Set(fw7Input);
    const erpSet = new Set(erpInput);

    const fw7Only = [...fw7Set].filter(value => !erpSet.has(value));
    const erpOnly = [...erpSet].filter(value => !fw7Set.has(value));

    document.getElementById('fw7-only').textContent = fw7Only.join(', ') || 'Nenhum';
    document.getElementById('erp-only').textContent = erpOnly.join(', ') || 'Nenhum';

    document.getElementById('fw7-buttons').style.display = fw7Only.length > 0 ? 'flex' : 'none';
    document.getElementById('erp-buttons').style.display = erpOnly.length > 0 ? 'flex' : 'none';

    // Atualiza os contadores
    document.getElementById('fw7-count').textContent = fw7Only.length;
    document.getElementById('erp-count').textContent = erpOnly.length;
}

function copyWithoutQuotes(elementId) {
    const values = document.getElementById(elementId).textContent.split(', ').filter(v => v !== 'Nenhum');
    const result = values.join(',');
    navigator.clipboard.writeText(result).then(() => {
        showNotification();
    });
}

function copyWithQuotes(elementId) {
    const values = document.getElementById(elementId).textContent.split(', ').filter(v => v !== 'Nenhum');
    const result = values.map(v => `'${v}'`).join(',');
    navigator.clipboard.writeText(result).then(() => {
        showNotification();
    });
}

function showNotification() {
    const notification = document.getElementById('copy-notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

document.getElementById('fw7-input').addEventListener('input', debounceCompareValues);
document.getElementById('erp-input').addEventListener('input', debounceCompareValues);
