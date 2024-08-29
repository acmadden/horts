const coin = (sides) => {
  const flip = () => {
    return sides[Math.floor(Math.random() * 2)];
  };
  const reveal = () => {
    return sides[0] !== sides[1] ? "real" : "fake";
  };
  return { flip, reveal };
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const pull_from = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const simulations = 10000;
const number_of_coins = 9999;
const number_of_flips = 10;

const real_coins = new Array(number_of_coins)
  .fill("")
  .map(() => coin(["heads", "tails"]));
const fake_coin = coin(["heads", "heads"]);
const purse = shuffle([...real_coins, fake_coin]);

let completed_simulations = 0;
const results = [];
while (completed_simulations < simulations) {
  let selected_coin = pull_from(purse);
  let landed_on_heads = 0;
  while (landed_on_heads < number_of_flips) {
    for (let i = 0; i < number_of_flips; i++) {
      if (selected_coin.flip() === "heads") {
        landed_on_heads += 1;
      } else {
        selected_coin = pull_from(purse);
        landed_on_heads = 0;
        break;
      }
    }
  }
  results.push(selected_coin.reveal());
  completed_simulations += 1;
}

console.log(`Real: ${results.filter((result) => result === "real").length}`);
console.log(`Fake: ${results.filter((result) => result === "fake").length}`);
