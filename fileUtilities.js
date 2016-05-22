'use strict';

const fs = require('mz/fs');

const FILENAME = 'lastEpi.txt';


exports.readLastEpisode = function() {
    return fs.readFile(FILENAME);
}

exports.writeNewEpisode = function(newEpisode) {
    return fs.writeFile(FILENAME, newEpisode);
}

exports.episodeExists = function() {
    return fs.exists(FILENAME);
}
