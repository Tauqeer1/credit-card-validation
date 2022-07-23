// This function calculate product sum
sumOfProduct = (num) => {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.trunc(num / 10);
  }
  return sum;
};

// This functions implements luhn's algorithm for validating card number
validCardNumber = (cardNumber) => {
  let cardNo = cardNumber.split('');
  let totalSum = 0;
  for (let i = cardNo.length - 1; i >= 0; i--) {
    if (i % 2 === 1) {
      let product = cardNo[i] * 2;
      if (product > 9 && product < 100) {
        let sum = sumOfProduct(product);
        cardNo[i] = sum;
      } else {
        cardNo[i] = product;
      }
    }
    totalSum += parseInt(cardNo[i]);
  }
  return totalSum % 10 === 0;
};

module.exports = {
  validCardNumber,
};
