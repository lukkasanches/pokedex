const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

// Elementos adicionais para Tipo, Altura e Peso exigidos pela atividade
// (Certifique-se de ter essas classes no seu HTML, ou mude para as classes que você preferir)
const pokemonType = document.querySelector('.pokemon__type');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// 1. FUNÇÃO FETCH ALTERADA PARA USAR TRY...CATCH
const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Se o status for 200 (OK), retorna os dados
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      // Se for 404 ou qualquer outro erro, dispara para o bloco catch
      throw new Error('Pokémon não encontrado');
    }
  } catch (error) {
    // Trata o erro aqui e retorna null para a função renderPokemon saber que falhou
    console.error("Erro na requisição: ", error.message);
    return null;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  if (pokemonType) pokemonType.innerHTML = '';
  if (pokemonHeight) pokemonHeight.innerHTML = '';
  if (pokemonWeight) pokemonWeight.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  // Se o try...catch deu certo e retornou os dados do Pokémon
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    
    // Pegando a imagem animada que você configurou
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    // Mapeando os tipos (ex: "grass, poison")
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    // Adicionando os novos dados na tela (requisito da atividade)
    if (pokemonType) pokemonType.innerHTML = `Tipo: ${types}`;
    if (pokemonHeight) pokemonHeight.innerHTML = `Altura: ${data.height / 10} m`;
    if (pokemonWeight) pokemonWeight.innerHTML = `Peso: ${data.weight / 10} kg`;

    input.value = '';
    searchPokemon = data.id;
  } else {
    // Se caiu no erro do bloco catch e retornou null
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
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