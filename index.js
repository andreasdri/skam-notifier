'use strict';

const WebSocketServer = require('ws').Server;
const parseSite = require('./parseSite');
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
    fetch('http://skam.p3.no/',
        { headers: { 'user-agent': 'https://github.com/andybb/skam-notifier'}})
        .then((res) => {
            return res.text();
        })
        .then((site) => {
            return parseSite(site);
        })
        .then((post) => {
            if (post.date > date) {
                date = post.date
                wss.broadcast(post);
            }
        })
        .catch((error) => {
            console.error(error);
        });

}, 180000);

