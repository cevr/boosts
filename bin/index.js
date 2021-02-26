#!/usr/bin/env node
const twos = [
  {
    rating: 1400,
    price: 200,
  },
  {
    rating: 1500,
    price: 250,
  },
  {
    rating: 1600,
    price: 330,
  },
  {
    rating: 1700,
    price: 480,
  },
  {
    rating: 1800,
    price: 550,
  },
  {
    rating: 1900,
    price: 700,
  },
  {
    rating: 2000,
    price: 800,
  },
];

const threes = [
  {
    rating: 1400,
    price: 350,
  },
  {
    rating: 1500,
    price: 400,
  },
  {
    rating: 1600,
    price: 500,
  },
  {
    rating: 1700,
    price: 750,
  },
  {
    rating: 1800,
    price: 900,
  },
  {
    rating: 1900,
    price: 1000,
  },
  {
    rating: 2000,
    price: 1300,
  },
  {
    rating: 2100,
    price: 1600,
  },
  {
    rating: 2200,
    price: 2000,
  },
  {
    rating: 2300,
    price: 2500,
  },
];

const undercutPercentage = 0.9;
const per100TwosPrice = 80;
const per100ThreesPrice = 150;

const log = (price) => {
  if (price < 1000) {
    console.log(`${Math.round(price / 50) * 50}k`);
  } else {
    console.log(`${(Math.round(price / 50) * 50) / 1000}mil`);
  }
};

const applyDiscounts = (price, startRating, endRating) => {
  const totalBrackets = (endRating - startRating) / 100;
  const bulkDeal = 1 - totalBrackets / 100;
  return price * undercutPercentage * bulkDeal;
};

const getPrice = (prices, currentPrice, startRating, endRating) =>
  prices.reduce((newPrice, bracket) => {
    if (startRating <= bracket.rating && endRating > bracket.rating) {
      return newPrice + bracket.price;
    }
    return newPrice;
  }, currentPrice);

const getLessThan1400Price = (startRating, per100Price) => {
  const diffRating = 1400 - startRating;
  return (diffRating / 100) * per100Price;
};

const calculate = (startRating, endRating, bracket) => {
  const isTwos = !bracket || bracket.includes("2");
  let price = 0;
  if (startRating < 1400) {
    price = getLessThan1400Price(
      startRating,
      isTwos ? per100TwosPrice : per100ThreesPrice
    );
  }
  price = getPrice(isTwos ? twos : threes, price, startRating, endRating);
  price = applyDiscounts(price, startRating, endRating);
  log(price);
};

function run(args) {
  let [startRating, endRating, bracket] = args;

  startRating = parseInt(startRating);
  endRating = parseInt(endRating);

  if (startRating < 100) {
    startRating *= 100;
  }
  if (endRating < 100) {
    endRating *= 100;
  }
  calculate(startRating, endRating, bracket);
}
run(process.argv.slice(2));
