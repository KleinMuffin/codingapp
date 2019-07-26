const cheerio = require('cheerio');
const axios = require('axios');
const pageUrl = 'https://thecodinglove.com/page/';
const searchQuery = '?s=';
const initialUrl = pageUrl + '1' + searchQuery;

let nextUrl = initialUrl;

function reload() {
  console.log("reaload");
  axios.get(nextUrl)
    .then((response) => {
      let random = Math.floor(Math.random() * Math.floor(8));
      const $ = cheerio.load(response.data);
      let randomEl = $('.blog-post:not(.results-return)')[random];

      // need help
      let image = $(randomEl).children('.blog-post-content').children().children().children('object').attr('data');
      if (!image) {
        image = $(randomEl).children('.blog-post-content').children().children().children('img').attr('src');

        if (!image) {
          image = $(randomEl).children('.blog-post-content').children().children('img').attr('src');
        }
      }

      document.querySelector('#image').src = image;
      document.querySelector('#text').innerHTML = $(randomEl).children('.blog-post-title').text();

      random = Math.floor(Math.random() * Math.floor(50)) + 1;

      nextUrl = pageUrl + random + searchQuery;
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  setTimeout(reload, 30000)
}

reload()
