async function carregarModalidades() {
  const select = document.getElementById('modalidade_id');

  try {
    const response = await fetch('http://localhost:8000/api/modalidade/');
    if (!response.ok) {
      throw new Error('Erro ao buscar modalidades');
    }

    const modalidades = await response.json();

    // Limpa as opções atuais
    select.innerHTML = '<option value="">Selecione uma modalidade</option>';

    // Adiciona cada modalidade como uma opção
    modalidades.forEach(modalidade => {
      const option = document.createElement('option');
      option.value = modalidade.id;  // ou .pk dependendo do seu serializer
      option.textContent = modalidade.nome;
      select.appendChild(option);
    });

  } catch (error) {
    console.error('Erro ao carregar modalidades:', error);
    select.innerHTML = '<option value="">Erro ao carregar</option>';
  }
}

// Chama assim que a página carregar
document.addEventListener('DOMContentLoaded', carregarModalidades);


document.getElementById('produto-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Pega os valores dos inputs
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const turma = document.getElementById('turma').value;
  const curso = document.getElementById('curso').value;
  const modalidadeId = document.getElementById('modalidade_id').value;
  const imagem = document.getElementById('imagem').files[0];  // opcional

  // Cria um FormData para enviar, que lida com texto e arquivos
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('turma', turma);
  formData.append('curso', curso);
  formData.append('Modalidade', modalidadeId);  // Use o nome do campo que o Django espera
  if (imagem) {
    formData.append('imagem', imagem);
  }

  try {
    const response = await fetch('http://localhost:8000/api/usuario/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const erroData = await response.json();
      throw new Error(`Erro: ${JSON.stringify(erroData)}`);
    }

    const data = await response.json();
    alert('Usuário criado com sucesso!');
    console.log(data);

  } catch (error) {
    alert(`Erro ao cadastrar usuário: ${error.message}`);
  }
});
