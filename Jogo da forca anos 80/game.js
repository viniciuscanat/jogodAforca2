let palavras = [
  "cidadão kane", "o poderoso chefão", "pulp fiction", "um sonho de liberdade", 
  "tubarão", "star wars", "o senhor dos anéis", "o silêncio dos inocentes", "matrix",
  "clube da luta", "o exorcista", "forrest gump", "o iluminado", "de volta para o futuro",
  "psicose", "a lista de schindler", "o rei leão", "titanic", "gladiador",
  "o sexto sentido", "avatar", "um estranho no ninho", "toy story", "os bons companheiros",
  "interestelar", "coração valente", "a origem", "o resgate do soldado ryan", "o pianista",
   "o fabuloso destino de amélie poulain", "alien o oitavo passageiro", "coringa", "scarface",
  "o grande ditador", "o profissional", "wall e", "up altas aventuras", "casablanca",
  "o mágico de oz", "cantando na chuva", "lawrence da arábia", "os pássaros", "o bom o mau e o feio",
  "rocky", "apocalypse now", "o padrino ii", "era uma vez no oeste", "o clube dos cinco",
  "quem quer ser um milionário", "o último imperador", "beleza americana", "um corpo que cai", "taxi driver",
  "chinatown", "e o vento levou", "cinderela", "a noviça rebelde", "o exterminador do futuro",
  "o labirinto do fauno", "homem aranha no aranhaverso", "coringa", "parasita", "mad max estrada da fúria"
];

let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let palavraArray = palavra.split('');
let letrasUsadas = [];
let erros = 0;
let maxErros = 4;
let vitórias = 0;
let derrotas = 0;

window.onload = function() {
  criarDisplayPalavra();
  criarTeclado();
  document.getElementById('reset-button').disabled = true;
}

function criarDisplayPalavra() {
  let container = document.getElementById('word-container');
  for(let i = 0; i < palavraArray.length; i++) {
      let divLetra = document.createElement('span');
      if (palavraArray[i] === " ") {
          divLetra.innerHTML = " ";
      } else {
          divLetra.innerHTML = "_";
      }
      container.appendChild(divLetra);
  }
}

function criarTeclado() {
  let container = document.getElementById('keyboard');
  for(let i = 65; i <= 90; i++) {
      let botao = document.createElement('button');
      botao.innerHTML = String.fromCharCode(i);
      botao.addEventListener('click', function() {
          checarLetra(this.innerHTML.toLowerCase());
          this.disabled = true;
      });
      container.appendChild(botao);
  }
}

function checarLetra(letra) {
  letrasUsadas.push(letra);
  let container = document.getElementById('letras-usadas');
  container.innerHTML = "Letras usadas: " + letrasUsadas.join(', ');
  let acertos = document.getElementById('word-container').children;
  let acerto = false;
  if (letra === " ") return;
  for(let i = 0; i < palavraArray.length; i++) {
      if(palavraArray[i] === letra) {
          acertos[i].innerHTML = letra;
          acerto = true;
      }
  }

  if(!acerto) {
      erros++;
      if(erros >= maxErros) {
          document.getElementById('message').innerHTML = "Você perdeu!";
          document.getElementById("message").style.fontSize="90px";
          document.getElementById("message").style.color="white";
          derrotas++;
          atualizarPlacar();
          finalizarJogo();
      } else {
          document.getElementById('message').innerHTML = `Errado! Você tem ${maxErros - erros} tentativas restantes.`;
          document.getElementById("message").style.color="white";
      }
  } else if(Array.from(acertos).every(item => item.innerHTML !== "_")) {
      document.getElementById('message').innerHTML = "Você venceu!";
      document.getElementById("message").style.fontSize="90px";
      document.getElementById("message").style.color="white";
      vitórias++;
      atualizarPlacar();
      finalizarJogo();
  }
}

function finalizarJogo() {
  let botoes = document.getElementById('keyboard').children;
  for(let i = 0; i < botoes.length; i++) {
      botoes[i].disabled = true;
  }
  let acertos = document.getElementById('word-container').children;
  for(let i = 0; i < palavraArray.length; i++) {
      acertos[i].innerHTML = palavraArray[i];
  }
  document.getElementById('reset-button').disabled = false;
}

function atualizarPlacar() {
  document.getElementById('vitorias').innerHTML = "Vitórias: " + vitórias;
  document.getElementById('derrotas').innerHTML = "Derrotas: " + derrotas;
}

function resetGame() {
  palavra = palavras[Math.floor(Math.random() * palavras.length)];
  palavraArray = palavra.split('');
  letrasUsadas = [];
  erros = 0;

  document.getElementById('word-container').innerHTML = '';
  document.getElementById('keyboard').innerHTML = '';
  document.getElementById('letras-usadas').innerHTML = '';
  document.getElementById('message').innerHTML = '';

  criarDisplayPalavra();
  criarTeclado();

  document.getElementById('reset-button').disabled = true;
}

let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
