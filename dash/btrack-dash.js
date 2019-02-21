var request = require('request');
var config = require('../config');

function nap(res) {
    console.log("Leeya's Nap time! Data is flying to lambda!!!");
    request.get({
        url: config.lambda.napUrl,
        // qs: data,
        // headers: headers
    }, function (err, response, body) {
        if (!!err) {
            console.log('ERROR while getting the products list', err)
        }
        if (res) {
            res.json(JSON.parse(body));
        }
    });
}

function feeding(res) {
    console.log("Leeya's Feeding time! Data is flying to lambda!!!");
    request.get({
        url: config.lambda.feedingUrl,
    }, function (err, response, body) {
        if (!!err) {
            console.log('ERROR while getting the products list', err)
        }
        if (res) {
            res.json(JSON.parse(body));
        }
    });
}


module.exports = {
    nap: nap,
    feeding: feeding,
};
