'use strict';

const WebSocketServer = require('ws').Server;
const parseSite = require('./parseSite');
const io = require('./fileUtilities');
const fetch = require('node-fetch');

const wss = new WebSocketServer({ port: 8080 });

io.episodeExists()
    .then((exists) => {
        if (!exists) {
            io.writeNewEpisode(new Date());
        }
    });


wss.broadcast = function (data) {
    console.log('Number of connections: ' + wss.clients.length);
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(data), (error) => {
            if (error) {
                console.error(error);
            }
        });
    });
};


setInterval(() => {
    fetch('http://skam.p3.no/',
        { headers: { 'user-agent': 'https://github.com/andybb/skam-notifier'}})
        .then((res) => res.text())
        .then((site) => Promise.all([parseSite(site), io.readLastEpisode()]))
        .then((data) => {
            let episode = data[0];
            let oldEpisode = new Date(data[1].toString());

            if (episode.date > oldEpisode) {
                wss.broadcast(episode);
                return io.writeNewEpisode(episode.date);
            }
        })
        .catch((error) => {
            console.error(error);
        });

}, 120000);

