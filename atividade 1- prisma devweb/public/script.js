document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api';

    
    const tabsContainer = document.querySelector('.tabs');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const formPessoa = document.getElementById('form-pessoa');
    const inputPessoaNome = document.getElementById('pessoa-nome');
    const tablePessoasBody = document.querySelector('#table-pessoas tbody');

    const formCarro = document.getElementById('form-carro');
    const inputCarroModelo = document.getElementById('carro-modelo');
    const tableCarrosBody = document.querySelector('#table-carros tbody');

    const formAssociar = document.getElementById('form-associar');
    const selectPessoa = document.getElementById('select-pessoa');
    const selectCarro = document.getElementById('select-carro');
    const tableAssociacoesBody = document.querySelector('#table-associacoes tbody');

    
    tabsContainer.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('.tab-button');
        if (!clickedTab) return;

        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        clickedTab.classList.add('active');
        document.getElementById(clickedTab.dataset.tab).classList.add('active');
    });


    const api = {
        get: async (endpoint) => (await fetch(`${API_URL}/${endpoint}`)).json(),
        post: async (endpoint, data) => (await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })).json(),
        delete: async (endpoint, id) => {
            await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
        },
        deleteAssociacao: async (pessoaId, carroId) => {
            const params = new URLSearchParams({ pessoaId, carroId });
            await fetch(`${API_URL}/associar?${params}`, { method: 'DELETE' });
        }
    };

    
    const render = {
        pessoas: async () => {
            const pessoas = await api.get('pessoas');
            tablePessoasBody.innerHTML = '';
            selectPessoa.innerHTML = '<option value="">Selecione uma pessoa...</option>';
            pessoas.forEach(p => {
                const row = `<tr><td>${p.id}</td><td>${p.nome}</td><td><button class="delete-btn" data-id="${p.id}">Excluir</button></td></tr>`;
                tablePessoasBody.innerHTML += row;
                const option = `<option value="${p.id}">${p.nome}</option>`;
                selectPessoa.innerHTML += option;
            });
        },
        carros: async () => {
            const carros = await api.get('carros');
            tableCarrosBody.innerHTML = '';
            selectCarro.innerHTML = '<option value="">Selecione um carro...</option>';
            carros.forEach(c => {
                const row = `<tr><td>${c.id}</td><td>${c.modelo}</td><td><button class="delete-btn" data-id="${c.id}">Excluir</button></td></tr>`;
                tableCarrosBody.innerHTML += row;
                const option = `<option value="${c.id}">${c.modelo}</option>`;
                selectCarro.innerHTML += option;
            });
        },
        associacoes: async () => {
            const associacoes = await api.get('associacoes');
            tableAssociacoesBody.innerHTML = '';
            associacoes.forEach(a => {
                const row = `<tr>
                    <td>${a.pessoa.nome}</td>
                    <td>${a.carro.modelo}</td>
                    <td><button class="delete-btn" data-pessoa-id="${a.pessoaId}" data-carro-id="${a.carroId}">Excluir</button></td>
                </tr>`;
                tableAssociacoesBody.innerHTML += row;
            });
        }
    };

  
    async function carregarTudo() {
        await Promise.all([render.pessoas(), render.carros(), render.associacoes()]);
    }


    formPessoa.addEventListener('submit', async (e) => {
        e.preventDefault();
        await api.post('pessoas', { nome: inputPessoaNome.value });
        inputPessoaNome.value = '';
        await carregarTudo();
    });

    formCarro.addEventListener('submit', async (e) => {
        e.preventDefault();
        await api.post('carros', { modelo: inputCarroModelo.value });
        inputCarroModelo.value = '';
        await carregarTudo();
    });

    formAssociar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pessoaId = parseInt(selectPessoa.value);
        const carroId = parseInt(selectCarro.value);
        if (pessoaId && carroId) {
            await api.post('associar', { pessoaId, carroId });
            await render.associacoes();
        }
    });

    
    document.body.addEventListener('click', async (e) => {
        if (!e.target.classList.contains('delete-btn')) return;
        
        const id = e.target.dataset.id;
        const table = e.target.closest('table');

        if (table.id === 'table-pessoas') {
            await api.delete('pessoas', id);
        } else if (table.id === 'table-carros') {
            await api.delete('carros', id);
        } else if (table.id === 'table-associacoes') {
            const { pessoaId, carroId } = e.target.dataset;
            await api.deleteAssociacao(pessoaId, carroId);
        }
        await carregarTudo();
    });

    
    carregarTudo();
});