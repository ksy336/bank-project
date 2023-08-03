"use strict"

// api request


const currencyNums = document.querySelectorAll(".currency__num");
// получить другие теги

const getCurrencies = () => {
  const currencies = ["USD", "EUR", "SGD", "MYR", "AUD", "JPY"];
  const requestUrls = currencies.map((from) => {
    return `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=RUB&q=1.0`
  })
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': '1ac1266c4emsh7c93fe2cf610d0ap14e915jsnbbfcf02933df',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  }

  return Promise.all(requestUrls.map(async url => {
    const resp = await fetch(url, options);
    return resp.text();
  }));
};

document.addEventListener("DOMContentLoaded", async () => {

  try {
    const results = await getCurrencies();
    // currencyNums.forEach((currencyNum) => {
    //   currencyNum.textContent = ;
    // })
    for(let i = 0; i < currencyNums.length; i++) {
      currencyNums[i].textContent = results[i];
    }
  } catch (error) {
    console.error(error);
  }

  // fetch(`${API_URL}`, {
  //   method: "GET",
  //   headers: {
  //     'X-RapidAPI-Key': '9402e4f359mshe09f696f3527b5cp1981b5jsn9c1495c3046b',
  //     'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
  //     // 'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
  //     // 'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
  //   }
  // })
  //   .then(function (response) {
  //   if(response.ok) {
  //     const data = response.json();
  //     // console.log(data);
  //     // currencyNum.textContent = `${data}`;
  //     const result = data.text();
  //     console.log(result);
  //   }
  // })
  //   .catch(err => console.error(err));
})
// Распределить эти данные по каждой колонке с валютой

