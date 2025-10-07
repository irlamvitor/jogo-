const readline = require('readline-sync');

function criarTabuleiro() {
  return ['1','2','3','4','5','6','7','8','9'];
}

function mostrarTabuleiro(tab) {
  console.log(`
 ${tab[0]} | ${tab[1]} | ${tab[2]}
---+---+---
 ${tab[3]} | ${tab[4]} | ${tab[5]}
---+---+---
 ${tab[6]} | ${tab[7]} | ${tab[8]}
`);
}

function checarVitoria(tab, jogador) {
  const vitorias = [
    [0,1,2],[3,4,5],[6,7,8], 
    [0,3,6],[1,4,7],[2,5,8], 
    [0,4,8],[2,4,6]          
  ];

  return vitorias.some(combo => combo.every(i => tab[i] === jogador));
}

function cheio(tab) {
  return tab.every(c => c === 'X' || c === 'O');
}

function pedirPosicao(tab, jogador) {
  while (true) {
    let resposta = readline.question(`Jogador ${jogador}, escolha uma posição (1-9): `);
    // remove espaços e valida
    resposta = resposta.trim();
    if (!/^[1-9]$/.test(resposta)) {
      console.log('Entrada inválida. Digite um número de 1 a 9.');
      continue;
    }
    const idx = Number(resposta) - 1;
    if (tab[idx] === 'X' || tab[idx] === 'O') {
      console.log('Posição já ocupada. Escolha outra.');
      continue;
    }
    return idx;
  }
}

function jogo() {
  const tab = criarTabuleiro();
  let jogador = 'X';
  console.clear();
  console.log('=== Jogo da Velha ===');
  mostrarTabuleiro(tab);

  while (true) {
    const idx = pedirPosicao(tab, jogador);
    tab[idx] = jogador;
    console.clear();
    mostrarTabuleiro(tab);

    if (checarVitoria(tab, jogador)) {
      console.log(`Parabéns! Jogador ${jogador} venceu!`);
      break;
    }

    if (cheio(tab)) {
      console.log("Empate! O tabuleiro está cheio.");
      break;
    }

    // troca jogador
    jogador = (jogador === 'X') ? 'O' : 'X';
  }
}

function main() {
  while (true) {
    jogo();
    const r = readline.question('Deseja jogar novamente? (s/n): ').trim().toLowerCase();
    if (r !== 's' && r !== 'sim') {
      console.log('Obrigado por jogar! Até mais.');
      break;
    }
    console.clear();
  }
}

main();
