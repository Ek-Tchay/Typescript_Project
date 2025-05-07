import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const MATRIX_SIZE = 8;
const EMPTY_CELL = ' ';
const SHIP_CELL = 'B';
const HIT_CELL = 'X';
const MISS_CELL = '~';

interface Player {
    name: string;
    ownBoard: string[][];
    shotsBoard: string[][];
    shipsRemaining: number;
}

function createEmptyBoard(): string[][] {
    return Array.from({ length : MATRIX_SIZE}, () => Array(MATRIX_SIZE).fill(EMPTY_CELL));
}

function placeShipsRandomly (board: string[][], numberOfShips: number): void {
    let placed = 0;
    while (placed < numberOfShips) {
        const row = Math.floor(Math.random() * MATRIX_SIZE);
        const col = Math.floor(Math.random() * MATRIX_SIZE);
        if (board[row][col] === EMPTY_CELL) {
          board[row][col] = SHIP_CELL;
          placed++;
        }
    }
}

function printBoard(board: string[][], hideShips: boolean = true): void {
  const header = '   ' + Array.from({ length: MATRIX_SIZE }, (_, i) => String.fromCharCode(65 + i)).join(' ');
  console.log(header);
  board.forEach((row, i) => {
    const rowString = row.map(cell => (hideShips && cell === SHIP_CELL ? EMPTY_CELL : cell)).join(' ');
    console.log((i + 1).toString().padStart(2) + ' ' + rowString);
  });
}

function parseInput(input: string): [number, number] | null {
    const match = input.trim().toUpperCase().match(/^([A-H])(\d)$/);
    if (!match) return null;
    const col = match[1].charCodeAt(0)-65;
    const row = parseInt(match[2], 10) - 1;
    if (row < 0 || row >= MATRIX_SIZE || col < 0 || col >= MATRIX_SIZE) return null;
    return [row, col];
}

function isGameOver(player: Player): boolean {
    return player.shipsRemaining === 0;
}

async function playTurn(current: Player, opponent: Player, rl): Promise<void> {
    // console.clear();
    console.log(`\n${current.name}, voici votre grille de tirs :`);
    printBoard(current.shotsBoard, false);

    let valid = false;
    let target: [number, number] | null = null ;
    let row: number = 0;
    let col: number = 0;

    while (!valid) {
      const input = await rl.question(`${current.name}, entrez une position à attaquer (ex: D5): `);
      target = parseInput(input);
      if (target) {
        [row, col] = target;
        if (current.shotsBoard[row][col] === EMPTY_CELL) {
          valid = true;
        } else {
          console.log('Vous avez déjà tiré ici !');
        }
      } else {
        console.log('Entrée invalide. Réessayez.');
      }
    }

    if(opponent.ownBoard[row][col] === SHIP_CELL) {
      console.log('Touché !');
      current.shotsBoard[row][col] = HIT_CELL;
      opponent.ownBoard[row][col] = HIT_CELL;
      opponent.shipsRemaining--;
      console.log(opponent.shipsRemaining);
    } else {
        console.log('Loupé !');
        current.shotsBoard[row][col] = MISS_CELL;
        // opponent.shotsBoard[row][col] = MISS_CELL;
        console.log(opponent.shipsRemaining);
    }
}

export async function launchSimpleMode(numberOfShips: number) {
  const rl = createInterface({ input, output });

  const player1 : Player = {
    name: 'Joueur1',
    ownBoard: createEmptyBoard(),
    shotsBoard: createEmptyBoard(),
    shipsRemaining: numberOfShips,
  };

  const player2: Player = {
    name: 'Joueur2',
    ownBoard: createEmptyBoard(),
    shotsBoard: createEmptyBoard(),
    shipsRemaining: numberOfShips,
  };
  
  placeShipsRandomly(player1.ownBoard, numberOfShips);
  placeShipsRandomly(player2.ownBoard, numberOfShips);

  console.log("Grille de Joueur1 (avec bateaux) :");
  printBoard(player1.ownBoard, false);
  
  console.log("Grille de Joueur2 (avec bateaux) :");
  printBoard(player2.ownBoard, false);

  let currentPlayer = player1;
  let opponent = player2;

  while (true) {
    await playTurn(currentPlayer, opponent, rl);

    if(isGameOver(opponent)) {
      console.log(`\n🎉 ${currentPlayer.name} a gagné ! 🎉`);
      break;
    }

    [currentPlayer, opponent] = [opponent, currentPlayer];
  }

  await rl.close();
}
