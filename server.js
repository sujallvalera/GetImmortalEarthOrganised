const express = require('express');
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require('cors');
var fs = require('fs');
app.use(cors());
app.use(express.static(__dirname));

const port = 5500;

app.get('/', (req, res) => {
    res.send("I am alive!")
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/homePage/index.html');    
});

app.get('/latestnews/:newsID', (req, resp) => {
	const newsID = req.params.newsID;

	const currentDate = new Date();
	const tomorrowDate = new Date(currentDate);
	tomorrowDate.setDate(currentDate.getDate() + 1);
	currentDate.setHours(0, 0, 0, 0);
	tomorrowDate.setHours(23, 59, 59, 0);
	const todayUnixEpochTimestamp = currentDate.getTime();
	const tomorrowUnixEpochTimestamp = tomorrowDate.getTime();

	const fetchNewsURLs = async () => {
		let res = await axios.get(`https://timesofindia.indiatimes.com/topic/environment?dateFilter=${todayUnixEpochTimestamp},${tomorrowUnixEpochTimestamp}`);

		let $ = await cheerio.load(res.data);
		const anchorTags = $('div.uwU81 > a');

		const hrefValues = [];

		anchorTags.each((index, element) => {
			const hrefValue = $(element).attr('href');
			hrefValues.push(hrefValue);
		});

		const fetchNewsInfo1 = async () => {
			let json = { 'title': '', 'lastUpdatedOn': '', 'url': '', 'keywords': '' };

			let response = await axios.get(hrefValues[newsID]);
			let $ = await cheerio.load(response.data);

			let title = $('title').text();
			json.title = title;
			let lastUpdatedOn = $(' div.xf8Pm.byline > span').text();
			json.lastUpdatedOn = lastUpdatedOn;
			let keywords = $('meta[name="keywords"]').attr('content');
			json.keywords = keywords;
			json.url = hrefValues[newsID];
			console.log("logged in");
			resp.send(json);
		}
		fetchNewsInfo1();
	}
	fetchNewsURLs();
});

app.get('/news/:newsID', (req, resp) => {
    const newsID = req.params.newsID;
    console.log(newsID);
    if (newsID == 'all') {
        const fetchNewsURLs = async () => {
            let res = await axios.get('https://timesofindia.indiatimes.com/home/environment', {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            });

            let $ = await cheerio.load(res.data);
            const anchorTags = $('span.w_tle > a');

            const hrefValues = [];

            anchorTags.each((index, element) => {
                const hrefValue = $(element).attr('href');
                hrefValues.push(hrefValue);
            });

            const min = 0;
            const max = hrefValues.length - 1;

            const randomNum1 = Math.floor(Math.random() * (max - min + 1)) + min;

            let link1 = "https://timesofindia.indiatimes.com" + hrefValues[randomNum1];

            const fetchNewsInfo1 = async () => {
                let json = { 'title': '', 'lastUpdatedOn': '', 'url': '', 'keywords': '', 'img': ''};

                let response = await axios.get(link1);
                let $ = await cheerio.load(response.data);

                let title = $('title').text();
                json.title = title;
                let lastUpdatedOn = $(' div.xf8Pm.byline > span').text();
                json.lastUpdatedOn = lastUpdatedOn;
                let keywords = $('meta[name="keywords"]').attr('content');
                json.keywords = keywords;
                json.url = link1;
                let image = $('div.wJnIp > img').attr('src');
                json.img = image;
                console.log("logged in");
                console.log(json);
                resp.send(json);
            }
            fetchNewsInfo1();
        }
        fetchNewsURLs();
    }

    // first news
    else if (newsID == '0') {
        const fetchNewsURLs = async () => {
            let res = await axios.get('https://timesofindia.indiatimes.com/home/environment', {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            });

            let $ = await cheerio.load(res.data);
            const anchorTags = $('span.w_tle > a');

            const hrefValues = [];

            anchorTags.each((index, element) => {
                const hrefValue = $(element).attr('href');
                hrefValues.push(hrefValue);
            });

            let link1 = "https://timesofindia.indiatimes.com" + hrefValues[0];

            const fetchNewsInfo1 = async () => {
                let json = { 'title': '', 'lastUpdatedOn': '', 'url': '', 'keywords': '', 'img': ''};

                let response = await axios.get(link1);
                let $ = await cheerio.load(response.data);

                let title = $('title').text();
                json.title = title;
                let lastUpdatedOn = $(' div.xf8Pm.byline > span').text();
                json.lastUpdatedOn = lastUpdatedOn;
                let keywords = $('meta[name="keywords"]').attr('content');
                json.keywords = keywords;
                json.url = link1;
                let image = $('div.wJnIp > img').attr('src');
                json.img = image;
                console.log("logged in");
                console.log(json);
                resp.send(json);
            }
            fetchNewsInfo1();
        }
        fetchNewsURLs();
    }

    // news 2
    else if (newsID == '1') {
        const fetchNewsURLs = async () => {
            let res = await axios.get('https://timesofindia.indiatimes.com/home/environment', {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }
            });

            let $ = await cheerio.load(res.data);
            const anchorTags = $('span.w_tle > a');

            const hrefValues = [];

            anchorTags.each((index, element) => {
                const hrefValue = $(element).attr('href');
                hrefValues.push(hrefValue);
            });

            let link1 = "https://timesofindia.indiatimes.com" + hrefValues[1];

            const fetchNewsInfo1 = async () => {
                let json = { 'title': '', 'lastUpdatedOn': '', 'url': '', 'keywords': '' };

                let response = await axios.get(link1);
                let $ = await cheerio.load(response.data);

                let title = $('title').text();
                json.title = title;
                let lastUpdatedOn = $(' div.xf8Pm.byline > span').text();
                json.lastUpdatedOn = lastUpdatedOn;
                let keywords = $('meta[name="keywords"]').attr('content');
                json.keywords = keywords;
                json.url = link1;
                console.log("logged in");
                resp.send(json);
            }
            fetchNewsInfo1();
        }
        fetchNewsURLs();
    }

});






app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
