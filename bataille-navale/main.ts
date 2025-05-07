const { launchSimpleMode } = require('./simple');
// import { launchSimpleMode } from './simple';

const args = process.argv.slice(2);

let mode = '';
let numberOfShips = 0;
let dataFile = '';
 
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mode') {
      mode = args[i + 1];
    } else if (args[i] === '--number') {
      numberOfShips = parseInt(args[i + 1], 10);
      console.log(`➡️ Bateaux demandés : ${numberOfShips}`);
    } else if (args[i] === '--data') {
      dataFile = args[i + 1];
    }
}

if (mode === 'simple') {
  if (!numberOfShips || isNaN(numberOfShips) || numberOfShips <1 || numberOfShips > 32) {
    console.log("❌ incorrecte, tape '--number <n> (entre 1 et 32)");
    process.exit(1);
  }
  console.log(`\n Mode : Simple | Nombre de bateaux/joueur : ${numberOfShips}\n`)
  launchSimpleMode(numberOfShips);
} else if (mode === 'normal') {
  console.log("Mode normal en construction...");
} else if (mode === 'avancé') {
  console.log("Mode avancé en construction...");
} else {
  console.error("Tape 'node main.js --mode (simple/normal/avancé) --number (entre 1 et 64)");
  process.exit(1);
}
