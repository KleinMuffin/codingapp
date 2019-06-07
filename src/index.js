const cheerio = require('cheerio');
const axios = require('axios');
const initialUrl = 'https://thecodinglove.com/page/1?s=';
const settings = require('electron-settings');
const pageUrl = 'https://thecodinglove.com/page/';

let nextUrl = initialUrl;

console.log("hello");

function getTime() {
  return settings.get('time', 30 * 1000)
}

function reload() {
  console.log("reaload");
  axios.get(nextUrl)
    .then((response) => {
      let random = Math.floor(Math.random() * Math.floor(8));
      const $ = cheerio.load(response.data);
      let randomEl = $('.blog-post:not(.results-return)')[random];
      let image = $(randomEl).children('.blog-post-content').children().children().children('object').attr('data');
      if (!image) {
        image = $(randomEl).children('.blog-post-content').children().children().children('img').attr('src');
      }

      document.querySelector('#image').src = image;
      document.querySelector('#text').innerHTML = $(randomEl).children('.blog-post-title').text();

      random = Math.floor(Math.random() * Math.floor(50)) + 1;

      nextUrl = pageUrl + random + '?s=';
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  setTimeout(reload, getTime())
}

reload()
