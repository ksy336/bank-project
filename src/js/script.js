"use strict"
const newsTitle = document.querySelectorAll(".news-text");
const newsDescription = document.querySelectorAll(".description-text");
const imageUrl = document.querySelectorAll(".news-image");
const newsItem = document.querySelectorAll(".news-item");

// api request
const currencyNums = document.querySelectorAll(".currency__num");

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

const executeApiRequest = async () => {
  try {
    const results = await getCurrencies();
    for(let i = 0; i < currencyNums.length; i++) {
      currencyNums[i].textContent = Number(results[i]).toFixed(2);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded",  async () => {
  await executeApiRequest();
  setInterval(executeApiRequest,900000);
});

// newsRequest
const API_URL = "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=30&apiKey=7b5c94d160d64e8d8e352ed0706d333b";

const options  = {
  headers: {
    'X-Api-Key': '7b5c94d160d64e8d8e352ed0706d333b'
  }
}
const getNewsFromApi = async () => {
  const response = await fetch(API_URL, options);
  const data = await response.json();
  const transformedArticles =  data.articles.map((article) => {
    return {
      urlToImage: article.urlToImage,
      url: article.url,
      title: article.title,
      description: article.description,
    }
  });
  for(let i = 0; i < transformedArticles.length; i++) {
    if(newsTitle[i] || newsDescription[i] || imageUrl[i] || newsItem[i]) {
      newsTitle[i].textContent = transformedArticles[i]?.title.replaceAll(/<\/?[^>]+(>|$)/gi, "");
      newsDescription[i].textContent = transformedArticles[i]?.description.replaceAll(/<\/?[^>]+(>|$)/gi, "");
      imageUrl[i].src = transformedArticles[i].urlToImage;
      newsItem[i].href = transformedArticles[i].url;
    }
  }
  return transformedArticles;
}
getNewsFromApi();
// document.addEventListener("DOMContentLoaded", getNewsFromApi);

// slider
const slider = () => {
  const slides = document.querySelectorAll(".news-item");
  const slider = document.querySelector(".main__info-news");
  const track = document.querySelector(".layout-4-column");
  const newsBlock = document.querySelector(".news__block");
  const prev = document.querySelector(".button-left");
  const next = document.querySelector(".button-right");
  const width = newsBlock.offsetWidth;
  let index = 0;


next.addEventListener("click", () => {
  getNewsFromApi()
  index++;
  prev.classList.add("show");
  track.style.transform = `translateX(-${index * width}px)`;
  if (track.offsetWidth - (index * width) < width) {
    next.classList.add("hide");
  }
});
prev.addEventListener("click", () => {
  getNewsFromApi()
  index--;
  if (index === 0) {
    prev.classList.remove("show");
  }
  track.style.transform = `translateX(0)`;
});
}
slider();

