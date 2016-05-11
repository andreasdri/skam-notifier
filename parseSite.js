'use strict';

const cheerio = require('cheerio');
const moment = require('moment');
moment.locale('nb');


function parseSite(site) {
    return new Promise( (resolve, reject) => {
        const $ = cheerio.load(site);

        try {
            let latestPost = $('#main').children().first().find('article .byline a');
            let link = latestPost.attr('href');
            let date = moment(latestPost.text(), 'dddd DD.MM.YY [kl] HH.mm').format();
            resolve( {link: link, date: new Date(date)} );
        }
        catch (error) {
            reject(error);
        }
    });
}

module.exports = parseSite;
