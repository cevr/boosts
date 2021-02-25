#!/usr/bin/env node
let [startRating, endRating, bracket] = process.argv.slice(2);

startRating = parseInt(startRating);
endRating = parseInt(endRating);

const totalBrackets = endRating - startRating;

if (startRating < 100) {
  startRating *= 100;
}
if (endRating < 100) {
  endRating *= 100;
}

const twos = [
  {
    rating: 1400,
    rate: 200,
  },
  {
    rating: 1500,
    rate: 250,
  },
  {
    rating: 1600,
    rate: 330,
  },
  {
    rating: 1700,
    rate: 480,
  },
  {
    rating: 1800,
    rate: 550,
  },
  {
    rating: 1900,
    rate: 700,
  },
  {
    rating: 2000,
    rate: 800,
  },
];

const threes = [
  {
    rating: 1400,
    rate: 350,
  },
  {
    rating: 1500,
    rate: 400,
  },
  {
    rating: 1600,
    rate: 500,
  },
  {
    rating: 1700,
    rate: 750,
  },
  {
    rating: 1800,
    rate: 900,
  },
  {
    rating: 1900,
    rate: 1000,
  },
  {
    rating: 2000,
    rate: 1300,
  },
  {
    rating: 2100,
    rate: 1600,
  },
  {
    rating: 2200,
    rate: 2000,
  },
  {
    rating: 2300,
    rate: 2500,
  },
];

const undercutPercentage = 0.9;

const log = (rate) => {
  if (rate < 1000) {
    console.log(`${Math.round(rate / 50) * 50}k`);
  } else {
    console.log(`${(Math.round(rate / 50) * 50) / 1000}mil`);
  }
};

const applyDiscounts = (rate) => {
  const bulkDeal = 1 - totalBrackets / 100;
  return rate * undercutPercentage * bulkDeal;
};

const reduceRates = (rates, startingRate) =>
  rates.reduce((newRate, bracket) => {
    if (startRating <= bracket.rating && endRating > bracket.rating) {
      return newRate + bracket.rate;
    }
    return newRate;
  }, startingRate);

const per100TwosRate = 80;
const per100ThreesRate = 150;

const getLessThan1000Rate = (startRating, per100Rate) => {
  const diffRating = 1400 - startRating;
  return (diffRating / 100) * per100Rate;
};

const calculate = () => {
  const isTwos = !bracket || bracket.includes("2");
  let rate = 0;
  if (startRating < 1400) {
    rate = getLessThan1000Rate(
      startRating,
      isTwos ? per100TwosRate : per100ThreesRate
    );
  }
  rate = reduceRates(isTwos ? twos : threes, rate);
  rate = applyDiscounts(rate);
  log(rate);
};

calculate();
