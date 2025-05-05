import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process'
import { evaluate } from 'mathjs';

function get_random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cible: number = get_random(1, 100)
console.log(cible);

let my_array = []; 

for (let i = 0; i < 5; i++) {
  my_array.push((get_random(1, 20)));
}

console.log(my_array);

const rl = readline.createInterface({ input, output });
let essais = 5;

function valid_exp(expression: string): boolean {
  const regex = /^[0-9+\-*/().\s]*$/;
  return regex.test(expression);
}
  

function askQuestion() {
  if (essais > 0) {
    rl.question('LaGaff: Utilise des opérations mathématiques et les nombres pour arriver au juste prix !\n', (answer: string) => {
      if (!valid_exp(answer)) {
        console.log(`❌ Saisie invalide, utilise uniquement les 5 nombres dans le tableau et les opé. de maths (*,/,-,+) ❌`)
        askQuestion();
        console.log(my_array);
        return;
      }
      try {
        const results = evaluate(answer);
        console.log(`Voici le résultat : ${results}`);
        if (results === cible) {
          console.log(`✅ Le Compte est Bon, Bien joué ! ✅`)
          rl.close();
        } else {
          essais--;
          console.log(`🧠 Incorrect, tu as encore ${essais} essais. 🧠`);
          askQuestion();
        } 
      } catch (error) {
        console.log(`❌ Saisie invalide, retry ❌`)
        askQuestion();
      }
    });
  } else {
      console.log(`❌ tu n'as plus d'essais, relance une partie ! ❌`)
      rl.close();
  }   
}

askQuestion();
