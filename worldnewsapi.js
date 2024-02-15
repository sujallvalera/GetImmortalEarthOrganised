const request = require('request');
let options = {
  'method': 'GET',
  'url': 'https://api.worldnewsapi.com/search-news?text=POLLUTION&news-sources=https://www.nytimes.com/&number=50&api-key=93468e80fe464766917125e425e60014',
  'headers': {
    'Accept': 'application/json'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
