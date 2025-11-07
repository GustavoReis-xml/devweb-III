const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalExpensesEl = document.getElementById('totalExpenses');
const submitButton = expenseForm.querySelector('button[type="submit"]');


let editingId = null;


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctDate = new Date(date.getTime() + userTimezoneOffset);
    
    // Pega dia, mês e ano
    const day = String(correctDate.getDate()).padStart(2, '0');
    const month = String(correctDate.getMonth() + 1).padStart(2, '0');
    const year = correctDate.getFullYear();
    
    return `${day}/${month}/${year}`;
};


const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};


async function fetchTotalExpenses() {
    try {
        const response = await fetch('/api/expenses/total');
        const data = await response.json();
        totalExpensesEl.innerText = `Total das Despesas: ${formatCurrency(data.totalAmount)}`;
    } catch (error) {
        console.error('Erro ao buscar o total das despesas:', error);
    }
}

async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();

        // Limpa a lista antes de adicionar os itens
        expenseList.innerHTML = '';

        expenses.forEach(expense => {
            const li = document.createElement('li');

            const formattedAmount = formatCurrency(expense.amount);
            const formattedDate = formatDate(expense.date);

            li.innerHTML = `
                <span>${expense.description} - ${formattedAmount} - ${formattedDate}</span>
                <div class="btn-container">
                    <button class="btn btn-edit" data-id="${expense._id}">Alterar</button>
                    <button class="btn btn-delete" data-id="${expense._id}">Excluir</button>
                </div>
            `;
            expenseList.appendChild(li);

            li.querySelector('.btn-edit').addEventListener('click', () => setupEditForm(expense));
            li.querySelector('.btn-delete').addEventListener('click', () => deleteExpense(expense._id));
        });

    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
    }
}


async function handleFormSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const expenseData = {
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        date: dateInput.value // O backend cuidará se estiver vazio
    };

    try {
        let response;
        if (editingId) {

            response = await fetch(`/api/expenses/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData),
            });
        } else {
            response = await fetch('/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData),
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao salvar despesa');
        }

        resetForm();

        await fetchExpenses();
        await fetchTotalExpenses();

    } catch (error) {
        console.error('Erro ao salvar despesa:', error);
        alert(`Erro: ${error.message}`);
    }
}


function setupEditForm(expense) {
    editingId = expense._id; // Entra no "modo de edição"

    // Preenche o formulário com os dados da despesa
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    dateInput.value = new Date(expense.date).toISOString().split('T')[0];

    submitButton.innerText = 'Atualizar Despesa';
    
    descriptionInput.focus();
}


function resetForm() {
    editingId = null; 
    expenseForm.reset();
    submitButton.innerText = 'Cadastrar Despesa';
}

async function deleteExpense(id) {
    if (!confirm('Tem certeza que deseja excluir esta despesa?')) {
        return;
    }

    try {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir despesa');
        }
        await fetchExpenses();
        await fetchTotalExpenses();

    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}


expenseForm.addEventListener('submit', handleFormSubmit);

// Carrega os dados iniciais quando a página é carregada [cite: 124-127]
window.addEventListener('DOMContentLoaded', () => {
    fetchExpenses();
    fetchTotalExpenses();
});