var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var XMLWriter = require('xml-writer');
var xw = new XMLWriter;
var fs = require('fs');

var visitingPage = "http://www.wiprodigital.com";

router.get('/', function (req, res) {
    request(visitingPage, function (error, response, body) {
        if (error) {
            res.status(404).send(error);
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);
        if (response.statusCode === 200) {

            var data = cheerio.load(body);
            var finalCollection = collectLinks(data);

            var file = fs.createWriteStream('./links.txt');
            file.on('error', function (err) {
                res.status(500).send(err);
            });
            finalCollection.forEach(function (obj) {
                file.write(obj + '\n');
            });
            file.end();
            res.send("Links extracted to links.txt");
        }
    });
});

function collectLinks(data) {
    var allRelativeLinks = [];
    var allAbsoluteLinks = [];
    var allImageLinks = [];

    var relativeLinks = data("a[href^='/']");
    relativeLinks.each(function () {
        //   console.log(data(this).attr('href'));
        allRelativeLinks.push(data(this).attr('href'));
    });

    var absoluteLinks = data("a[href^='http']");
    absoluteLinks.each(function () {
        if (data(this).attr('href').includes('https://wiprodigital.com')) {
            //     console.log(data(this).attr('href'));
            allAbsoluteLinks.push(data(this).attr('href'));
        }
    });

    var images = data("img[src^='/']");
    images.each(function () {
        console.log(data(this).attr('src'));
        allImageLinks.push(data(this).attr('src'));
    });
    // var imageLinks = data('img');
    // imageLinks.map(function () {
    //     allImageLinks.push(data(this).prop("src"));
    // });
    
    console.log(allRelativeLinks.length, allAbsoluteLinks.length, allImageLinks.length);
    return allRelativeLinks.concat(allAbsoluteLinks, allImageLinks);

    // xw.startDocument()
    //     .startElement('sitemap')
    //         .startElement('url')
    //             .writeElement('loc', '');

    // console.log(xw.toString());
}
module.exports = router;

