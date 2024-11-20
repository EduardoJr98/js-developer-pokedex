const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

pokemonList.addEventListener('click', (event) => {
    const pokemonItem = event.target.closest('.pokemon');
    if (pokemonItem) {
        const pokemonId = pokemonItem.getAttribute('data-id'); 
        openPokemonDetail(pokemonId);
    }
});

function openPokemonDetail(pokemonId) {
    pokeApi.getPokemonDetail({url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`})
        .then((pokemon) => {
            showPokemonDetail(pokemon);
        })
        .catch((error) => {
            console.error('Erro ao obter detalhes do Pokémon:', error);
        });
}

function showPokemonDetail(pokemon) {
    const detailSection = document.getElementById('pokemonDetail');
    if (!detailSection) {
        const newDetailSection = document.createElement('section');
        newDetailSection.id = 'pokemonDetail';
        newDetailSection.classList.add('pokemon-detail');
        document.body.appendChild(newDetailSection);
    }

    const detailHtml = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p><strong>Number:</strong> #${pokemon.number}</p>
        <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
        <p><strong>Height:</strong> ${pokemon.height} meters</p>
        <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
    `;

    document.getElementById('pokemonDetail').innerHTML = detailHtml;
}

function showPokemonDetail(pokemon) {
    const detailSection = document.getElementById('pokemonDetail');
    if (!detailSection) {
        const newDetailSection = document.createElement('section');
        newDetailSection.id = 'pokemonDetail';
        newDetailSection.classList.add('pokemon-detail');
        document.body.appendChild(newDetailSection);
    }

    const detailHtml = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p><strong>Number:</strong> #${pokemon.number}</p>
        <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
        <p><strong>Height:</strong> ${pokemon.height} meters</p>
        <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
        <button onclick="closePokemonDetail()">Close</button>
    `;

    const detailContainer = document.getElementById('pokemonDetail');
    detailContainer.innerHTML = detailHtml;
    detailContainer.style.display = 'block';
}

function closePokemonDetail() {
    const detailSection = document.getElementById('pokemonDetail');
    detailSection.style.display = 'none';
}


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
