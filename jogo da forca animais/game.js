let palavras = [
  "cachorro", "gato", "elefante", "girafa", "leão", "tigre",
  "hipopótamo", "jacaré", "crocodilo", "morcego", "gorila", "macaco",
  "tucano", "pinguim", "zebra", "raposa", "lobo", "rinoceronte",
  "suricata", "ornitorrinco", "cavalo", "urso", "panda", "canguru",
  "esquilo", "coiote", "avestruz", "falcão", "puma", "jaguar",
  "chimpanzé", "baleia", "golfinho", "tartaruga", "gaivota", "gavião",
  "pavão", "camelo", "dromedário", "coruja", "águia", "lagarto",
  "iguana", "cisne", "pelicano", "flamingo", "cervo", "lontra"
  ];
  
  let palavra = palavras[Math.floor(Math.random() * palavras.length)];
  let palavraArray = palavra.split('');
  let letrasUsadas = [];
  let erros = 0;
  let maxErros = 5;
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
  