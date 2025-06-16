const pokemonList = document.getElementById('pokemonList')
const loadMoreButton= document.getElementById('loadMore')
let limit = 12
let offset = 151

function convertPokemonToLi(pokemon, i) {
  console.log(i)
  return `
  <li class="pokemon ${pokemon.type}">
    <span class="number">${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
      </ol>

      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
  </li>
  `
}

function loadPokemonItems(offset, limit){
  
  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadMoreButton.addEventListener('click', () =>  {
  offset += limit
  if (offset + limit > 251) {
    limit = 251 - offset
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }
  
  loadPokemonItems(offset, limit)
})

loadPokemonItems(offset, limit)