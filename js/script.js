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
      document.getElementById("type").innerHTML = `Tipo: ${maiuscula(data.types.map(typeinfo => typeinfo.type.name).join(' / '))}`

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

      document.getElementById("habilidades").innerHTML = maiuscula(data.moves.map(typeinfo => typeinfo.move.name).join(' | '));
      abrir.innerHTML = `Mostrar Habilidades`
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
 abrir.innerHTML = `Mostrar Habilidades`
} else {
 habilidades.style.display = 'block'
 abrir.innerHTML = `Esconder Habilidades`
}
})