"use strict"

// api request

const currencyNum = document.querySelector(".currency__num");
// получить другие теги

const API_URL = 'https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=RUS&q=1.0';

document.addEventListener("DOMContentLoaded", async () => {
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': '9402e4f359mshe09f696f3527b5cp1981b5jsn9c1495c3046b',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
      // 'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      // 'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  }
  try {
    const response = await fetch(API_URL, options);
    const result = await response.text();
    console.log(result,response);
    currencyNum.textContent = result;
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

