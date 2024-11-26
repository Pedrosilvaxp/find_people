const section = document.querySelector('section');
const container = document.querySelector('.container');
const formulario = document.querySelector('form');
const mensagem = document.querySelector('p');
const circleLoader = document.querySelector('#iconLoader');


formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitando que os dados sejam submetidos

    mensagem.style.opacity = '0';
    circleLoader.style.opacity = '1';

    // Processamento
    const nomeBusca = document.querySelector('#nome').value;
    const idadeBusca = document.querySelector('#idade').value;
    const paisSelecionado = document.querySelector('select#escolha').value;


    try {
		// Fazendo a requisição com o parâmetro de consulta correspondente ao país selecionado pelo usuário
        const response = await fetch(`https://randomuser.me/api/?inc=name,phone,location,dob,picture&results=4000&nat=${paisSelecionado}`);

        const data = await response.json();

        const pessoas = data.results;

        // Buscando pessoas
        let pessoasEncontradas = pessoas;

        if (idadeBusca == '' && nomeBusca != '') {
            // Pesquisa apenas por nome
            pessoasEncontradas = pessoas.filter(pessoa => pessoa.name.first.toLowerCase() == nomeBusca.toLowerCase() || pessoa.name.last.toLowerCase() == nomeBusca.toLowerCase());

        } else if (idadeBusca != '' && nomeBusca == '') {
            // Por idade
            pessoasEncontradas = pessoas.filter(pessoa => pessoa.dob.age == idadeBusca);

        } else if (idadeBusca != '' && nomeBusca != '') {
            // Conforme nome e idade
            pessoasEncontradas = pessoas.filter(pessoa => (pessoa.name.first.toLowerCase() == nomeBusca.toLowerCase() || pessoa.name.last.toLowerCase() == nomeBusca.toLowerCase()) && pessoa.dob.age == idadeBusca);

        } else {
            // Apenas por nacionalidade
            // Adicionando apenas 50, ao invés de todo resultado da requisição
            let resultadoPessoas = [];

            for (let c = 0; c < 50; c++) {
                resultadoPessoas.push(pessoasEncontradas[c]);
            }
            pessoasEncontradas = resultadoPessoas;
        }
 
        circleLoader.style.opacity = '0';
        mensagem.style.opacity = '1';

        if (pessoasEncontradas.length < 1) {
            mensagem.innerHTML = "<p style='color: #24242475;'>Sem resultados. Busque novamente.</p>";

        } else {
            if (pessoasEncontradas.length > 1) {
                mensagem.innerHTML = `<p style='color: #28B5D4;'> ${pessoasEncontradas.length} pessoas encontradas!</p>`;
            } else {
                mensagem.innerHTML = "<p style='color: #28B5D4;'>Uma pessoa encontrada!</p>";
            }

            pessoasEncontradas.map(pessoaEncontrada => {

                // Gerando dados
                const novaPessoa = document.createElement('div');
                novaPessoa.classList.add('novaPessoa');

                const nome = document.createElement('p');
                nome.textContent = `Nome: ${pessoaEncontrada.name.first} ${pessoaEncontrada.name.last}`;

                const pais = document.createElement('p');
                pais.textContent = `País: ${pessoaEncontrada.location.country}`;

                const idade = document.createElement('p');
                idade.textContent = `Idade: ${pessoaEncontrada.dob.age}`;

                const phone = document.createElement('p');
                phone.textContent = `Telefone: ${pessoaEncontrada.phone}`;

                // Gerando foto
                const foto = document.createElement('img');
                foto.setAttribute('src', `${pessoaEncontrada.picture.large}`);
                foto.classList.add('foto');

                // Atribuindo informações
                novaPessoa.append(foto, nome, pais, idade, phone);

                novaPessoa.style.border = '2px solid #28B5D4';
                setInterval(() => {
                    novaPessoa.style.border = '0px solid';
                }, 3000);

                // Exibindo informações
                container.appendChild(novaPessoa);

                section.style.height = 'auto';
            });
        }

    } catch (error) {
        console.error(error);
        mensagem.innerHTML = "<p style='color: red;'>Ocorreu um erro ao realizar a busca. <p style='color: #28B5D4;'>Atualize a página.</p></p>"
    }
});


// Botão de voltar
const button = document.querySelector('#backBtn');

window.onscroll = () => {
	const userScroll = document.documentElement.scrollTop;

	button.style.opacity = userScroll > 200 ? '1' : '0';
};

button.addEventListener('click', () => {
	scrollTo({top: 0, behavior:'smooth'});
});