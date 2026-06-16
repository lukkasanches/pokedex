const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const pokemonType = document.querySelector('.pokemon__type');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
/* add fetch, awit*/
const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      throw new Error('Pokémon não encontrado');
    }
  } catch (error) {
    console.error("Erro na requisição: ", error.message);
    return null;
  }
}
/* arrumei render */
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';
  if (pokemonType) pokemonType.innerHTML = '';
  if (pokemonHeight) pokemonHeight.innerHTML = '';
  if (pokemonWeight) pokemonWeight.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    
    // Caminho da imagem animada oficial da pokédex clássica
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    if (pokemonType) pokemonType.innerHTML = `Tipo: ${types}`;
    if (pokemonHeight) pokemonHeight.innerHTML = `Alt: ${data.height / 10} m`;
    if (pokemonWeight) pokemonWeight.innerHTML = `Peso: ${data.weight / 10} kg`;

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado:c';
    pokemonNumber.innerHTML = '';
    
    if (pokemonType) pokemonType.innerHTML = '';
    if (pokemonHeight) pokemonHeight.innerHTML = '';
    if (pokemonWeight) pokemonWeight.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase().trim());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);