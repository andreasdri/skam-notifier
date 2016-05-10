'use strict';

const Feedparser = require('feedparser');

// Adapted from:
// https://github.com/lynnaloo/feedparser-promised
function parseFeed(stream) {
    return new Promise( (resolve, reject) => {
        const items = [];
        const feedparser = new Feedparser();

        feedparser.on('error', (err) => {
            reject(err);
        });

        feedparser.on('readable', () => {
            let item;
            while(item = feedparser.read()) { items.push(item); }
            return items;
        });

        feedparser.on('end', () => {
            return resolve(items);
        });

        stream.pipe(feedparser)

    });
}

module.exports = parseFeed;
