const API_URL = 'http://localhost:3000/api/discs'; // URL do Backend

const form = document.getElementById('disc-form');
const tableBody = document.getElementById('disc-list');
const discIdInput = document.getElementById('disc-id');

// Função para carregar e exibir os discos na tabela
async function fetchDiscs() {
  const response = await fetch(API_URL);
  const discs = await response.json();

  tableBody.innerHTML = '';

  discs.forEach(disc => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${disc.titulo}</td>
      <td>${disc.artista}</td>
      <td>${disc.ano}</td>
      <td>${disc.formato}</td>
      <td>R$ ${disc.preco.toFixed(2)}</td>
      <td>
        <button onclick="editDisc('${disc._id}')">Editar</button>
        <button onclick="deleteDisc('${disc._id}')">Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Função para lidar com o envio do formulário (Criar ou Atualizar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = discIdInput.value;
  const discData = {
    titulo: document.getElementById('titulo').value,
    artista: document.getElementById('artista').value,
    ano: document.getElementById('ano').value,
    genero: document.getElementById('genero').value,
    formato: document.getElementById('formato').value,
    preco: document.getElementById('preco').value,
  };

  let method = 'POST';
  let url = API_URL;

  if (id) {
    // se tem ID, é uma atualização (UPDATE) 
    method = 'PUT';
    url = `${API_URL}/${id}`;
  }

  await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discData),
  });

  form.reset();
  discIdInput.value = ''; 
  fetchDiscs(); // Recarrega a lista
});

// Função para carregar dados no formulário para edição 
async function editDisc(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const disc = await response.json();

  // Preenche o formulário
  document.getElementById('disc-id').value = disc._id;
  document.getElementById('titulo').value = disc.titulo;
  document.getElementById('artista').value = disc.artista;
  document.getElementById('ano').value = disc.ano;
  document.getElementById('genero').value = disc.genero;
  document.getElementById('formato').value = disc.formato;
  document.getElementById('preco').value = disc.preco;
}

// Função para excluir um disco 
async function deleteDisc(id) {
  if (!confirm('Tem certeza que deseja excluir este disco?')) {
    return;
  }

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  fetchDiscs(); // Recarrega a lista
}

// Carrega os discos ao iniciar a página
fetchDiscs();