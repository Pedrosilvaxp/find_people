const section = document.querySelector('section');
const container = document.querySelector('.container');
const formulario = document.querySelector('form');
const paragrafo = document.querySelector('p');
const circleLoader = document.querySelector('#iconLoader');


async function getPeople() {
    const response = await fetch("https://randomuser.me/api/?results=4000");

    return response.json();
}

formulario.addEventListener('submit', async (event) => {

    event.preventDefault(); // Evitando que os dados sejam submetidos

    paragrafo.style.opacity = '0';
    circleLoader.style.opacity = '1';

    const data = await getPeople();
    const pessoas = data.results;

    const nomeBusca = document.querySelector('#nome').value;
    // Buscando nome 
    const pessoaEncontrada = pessoas.find(pessoa => pessoa.name.first.toLowerCase() === nomeBusca.toLowerCase() || pessoa.name.last.toLowerCase() === nomeBusca.toLowerCase());


    circleLoader.style.opacity = '0';
    paragrafo.style.opacity = '1';

    if (!pessoaEncontrada) {
        paragrafo.innerHTML = "<p style='color: #24242475;'>Sem resultados. Busque novamente</p>";

    } else {
        paragrafo.innerHTML = "<p style='color: #28B5D4;'>Pessoa encontrada!</p>";

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

        // Gerando imagem
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
    }
});