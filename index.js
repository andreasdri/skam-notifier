'use strict';

const WebSocketServer = require('ws').Server;
const parseFeed = require('./parseFeed');
const fetch = require('node-fetch');

const wss = new WebSocketServer({ port: 8080 });
var date = new Date();


wss.broadcast = function broadcast(data) {
    console.log('Number of connections: ' + wss.clients.length);
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data), function(error) {
            if (error) {
                console.error(error);
            }
        });
    });
};


setInterval(() => {
    fetch('http://skam.p3.no/feed/', 
        { headers: { 'user-agent': 'https://github.com/andybb/skam-notifier'}})
        .then((res) => {
            return parseFeed(res.body);
        })
        .then((data) => {
            let lastPost = data[0];
            let newDate = new Date(lastPost.date);

            if (newDate > date) {
                date = newDate;
                let response = {
                    title: lastPost.title,
                    link: lastPost.link,
                    date: lastPost.date
                };
                wss.broadcast(response);
            }
        })
        .catch((error) => {
            console.error(error);
        });

}, 60000);

