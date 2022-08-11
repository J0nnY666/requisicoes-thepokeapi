let formulario = document.querySelector("form");

formulario.addEventListener("submit", function (pesquisar) {
  pesquisar.preventDefault();


  let urlForm = " https://pokeapi.co/api/v2/pokemon/";

  urlForm += this.name.value;
  urlForm = urlForm.toLocaleLowerCase();

  let imagem = document.getElementById("imgPokemon");
  let raridade = document.getElementById("raridade");

  fetch(urlForm)
    .then((Response) => Response.json())
    .then(function (data) {
      document.getElementById("id").innerHTML = `ID: ${data.id}`;
      document.getElementById("nameResult").innerHTML = `Nome: ${maiuscula(data.name)}`
      
      let type = data.types[0].type.name
      document.getElementById("type").innerHTML = `Tipo: ${maiuscula(data.types.map(typeinfo => typeinfo.type.name).join(' / '))}`
      
      let tipo = document.getElementById('type');
      if(type == 'electric'){
        tipo.style.color = 'yellow'
      } else if(type == 'fire'){
        tipo.style.color = 'red'
      } else if(type == 'grass'){
        tipo.style.color = '#26CA4F'
      } else if(type == 'water'){
        tipo.style.color = 'blue'
      } else if(type == 'bug'){
        tipo.style.color = '#3B994F'
      } else if(type == 'dark'){
        tipo.style.color = '#4B0082	'
      } else if(type == 'ghost'){
        tipo.style.color = '#800080'
      } else if (type == 'normal'){
        tipo.style.color = 'white'
      } else if(type == 'dragon'){
        tipo.style.color = '#4169E1'
      } else if (type == 'fairy'){
        tipo.style.color = '#FF1493'
      } else if (type == 'fighting'){
        tipo.style.color = '#A52A2A'
      } else if (type == 'flying'){
        tipo.style.color = '#6495ED'
      } else if(type == 'ground'){
        tipo.style.color = '#8B4513' 
      } else if(type == 'ice'){
        tipo.style.color = '#E0FFFF'
      } else if (type == 'psychic'){
        tipo.style.color = '#F61D90'
      } else if (type == 'rock'){
        tipo.style.color = '#800000'
      } else if (type == 'steel'){
        tipo.style.color = '#B0C4DE'
      } else if (type == 'poison'){
        tipo.style.color = '#FF1493'
      } 
      else {
        tipo.style = 'black'
      }


      let PesoKg = data.weight / 10;
      document.getElementById("weight").innerHTML = `Peso: ${PesoKg}kg`

      let alturaM = data.height / 10;
      document.getElementById("height").innerHTML = `Altura: ${alturaM}m`

      imagem.innerHTML =
        "<img src='" +
        data.sprites.front_default +
        "'><img src= '" +
        data.sprites.back_default +
        "'>";
      raridade.innerHTML = 'Normal'

      let shiny = false;
      imagem.onclick = () => {
        if (shiny == false) {
          imagem.innerHTML =
            "<img src='" +
            data.sprites.front_shiny +
            "'><img src= '" +
            data.sprites.back_shiny +
            "'>";
          shiny = true;
          raridade.innerHTML = 'Shiny'
          raridade.style.cssText = 'font-weight: bold;'
        } else {

          imagem.innerHTML =
            "<img src='" +
            data.sprites.front_default +
            "'><img src= '" +
            data.sprites.back_default +
            "'>";
          shiny = false;
          raridade.innerHTML = 'Normal'
          raridade.style.cssText = 'font-weight: none;'
        }
      }

      document.getElementById("habilidades").innerHTML = maiuscula(data.moves.map(typeinfo => typeinfo.move.name).join(' | ') );
      abrir.innerHTML = `Habilidades`

      const gamesEl = document.getElementById("games")
      gamesEl.innerHTML = `<p class="game-information"> <span class = "poke-name">${maiuscula(data.name)}</span> já apareceu nos seguintes games: </p>` + (data.game_indices.map(typeinfo => typeinfo.version.name).join(' | '));
      showGames.innerHTML = 'Aparições'

      let esconder = document.getElementById("esconder")
      

    }).catch(function (err){
      console.log(err)
      if(err == `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON`){
        swal('Pokémon não encontrado 😥')
      } else{
        swal(err)
      }
    })
});

function maiuscula(string) {
  return string[0].toUpperCase() + string.substr(1);
}

let abrir = document.getElementById("abilities");
let habilidades = document.getElementById("habilidades");

abrir.addEventListener('click', function(){
  
 if(habilidades.style.display === 'block'){
 habilidades.style.display = 'none';
} else {
 habilidades.style.display = 'block'
}
})

habilidades.addEventListener('dblclick', () =>{
  if(habilidades.style.display === 'block'){
    habilidades.style.display = 'none';
   } else {
    habilidades.style.display = 'block'
   }
})


let showGames = document.getElementById("showGames");
let games = document.getElementById("games")
let esconder = document.getElementById("esconder")

showGames.addEventListener('click', () => {

  if(games.style.display === 'block'){
    games.style.display = 'none';
  } else {
    games.style.display = 'block';
  }

})

games.addEventListener("dblclick", () => {
  if(games.style.display === 'block'){
    games.style.display = 'none';
  } else {
    games.style.display = 'block';
  }
})

