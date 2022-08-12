let formulario = document.querySelector("form");

formulario.addEventListener("submit", function (pesquisar) {
  pesquisar.preventDefault();


  let urlForm = " https://pokeapi.co/api/v2/pokemon/";

  urlForm += this.name.value;
  urlForm = urlForm.toLocaleLowerCase();

  let imagem = document.getElementById("imgPokemon");
  let raridade = document.getElementById("raridade");
  let resultEl = document.getElementById('result')
  let erroEl = document.getElementById('erro')

  fetch(urlForm)
    .then((Response) => Response.json())
    .then(function (data) {
      resultEl.style.display = 'block'
      erroEl.style.display = 'none'
      
      document.getElementById("id").innerHTML = `ID: ${data.id}`;
      document.getElementById("nameResult").innerHTML = `Nome: ${maiuscula(data.name)}`

      let type = data.types[0].type.name
      document.getElementById("type").innerHTML = `Tipo: ${maiuscula(data.types.map(typeinfo => typeinfo.type.name).join(' / '))}`

      let tipo = document.getElementById('type');
      switch (type){
        case "electric": tipo.style.color = 'yellow';  break
        case "fire": tipo.style.color = 'red';  break
        case "grass": tipo.style.color = '#26CA4F';  break
        case "water": tipo.style.color = 'blue';  break
        case "bug": tipo.style.color = '#3B994F' ;  break
        case "dark": tipo.style.color = '#4B0082' ; break
        case "ghost": tipo.style.color = '#800080'; break
        case "normal": tipo.style.color = 'white'; break
        case "dragon": tipo.style.color = '#4169E1'; break
        case "fairy": tipo.style.color = '#FF1493'; break
        case "fighting": tipo.style.color = '#A52A2A'; break
        case "flying": tipo.style.color = '#6495ED'; break
        case "ground": tipo.style.color = '#8B4513'; break
        case "ice": tipo.style.color = '#E0FFFF'; break
        case "psychic": tipo.style.color = '#F61D90'; break
        case "rock": tipo.style.color = '#800000'; break
        case "steel'": tipo.style.color = '#B0C4DE'; break
        case "poison": tipo.style.color = '#FF1493'; break
        default: tipo.style.color = 'black'
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

      document.getElementById("habilidades").innerHTML = maiuscula(data.moves.map(typeinfo => typeinfo.move.name).join(' | ') + '<p id="fecharHabilidades" class = "fechar" >fechar</p>');
      abrir.innerHTML = `Habilidades`

      let fecharHabilidades = document.querySelector('#fecharHabilidades')
      fecharHabilidades.addEventListener("click", () => {
        habilidades.style.display = 'none';
      })

      const gamesEl = document.getElementById("games")
      gamesEl.innerHTML = `<p class="game-information"> <span class = "poke-name">${maiuscula(data.name)}</span> já apareceu nos seguintes games: </p>` + (data.game_indices.map(typeinfo => typeinfo.version.name).join(' | ') + '<p id="fecharGames" class = "fechar" >Fechar</p>');
      showGames.innerHTML = 'Aparições'


      let fecharGames = document.querySelector('#fecharGames')
      fecharGames.addEventListener("click", () => {
        games.style.display = 'none';
      })




    }).catch(function (err) {
     
      console.log(err)
      if (err == `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON`) {
        resultEl.style.display = 'none'
        erroEl.style.display = 'block'
        erroEl.innerHTML = ' Pokémon não encontrado'
      } else {
        erroEl.innerHTML = err;
      }
    })
});

function maiuscula(string) {
  return string[0].toUpperCase() + string.substr(1);
}

let abrir = document.getElementById("abilities");
let habilidades = document.getElementById("habilidades");

abrir.addEventListener('click', function () {

  if (habilidades.style.display === 'block') {
    habilidades.style.display = 'none';
  } else {
    habilidades.style.display = 'block'
  }
})

let showGames = document.getElementById("showGames");
let games = document.getElementById("games")
let esconder = document.getElementById("esconder")

showGames.addEventListener('click', () => {

  if (games.style.display === 'block') {
    games.style.display = 'none';
  } else {
    games.style.display = 'block';
  }

})




