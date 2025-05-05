import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

function target_value(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function justeprix() {
  const rl = createInterface({ input, output });
  const val1 = await rl.question('Choisis un intervalle min entre 1 et 500 :\n')
  const val2 = await rl.question('Choisis un intervalle max (500 est le max) :\n')
  const min = Number(val1);
  const max = Number(val2);

  if (!isNaN(min) && !isNaN(max) && min >= 1 && min <= 500 && max >= 1 && max <= 500 && min < max) {
    console.log(`Ton intervalle de jeu est entre ${min} et ${max}.`)
    const target = target_value(min, max);
    
    let found = false;

    // const timer = setTimeout(() => {
    //   console.log("Temps écoulé ! Tu n'as pas trouvé le bon nombre à temps.");
    //   rl.close();
    // }, 30000);

    while(!found) {
      const response = await rl.question('Essaie de deviner le nombre ! :\n');
      const answer = Number(response);

      if (isNaN(answer)) {
        console.log('Veuillez entrer un nombre valide !');
      } else if (target === answer) {
        console.log('Bravo !');
        found = true;
        rl.close();
      } else if (target < answer) {
        console.log('Trop haut');
      } else if (target > answer) {
        console.log('Trop bas');
      }
    }
    rl.close();
  } else {
    console.log('Veuillez entrer 2 nombres valides entre 1 et 500');
    rl.close();
    justeprix();
  }
};

justeprix();
