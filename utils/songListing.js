/**
 * Created by raghav on 15/07/16.
 */

var cheerio =  require('cheerio');
var request = require('request');
var downloaderConst = require('../constants');

function getTopSongs(cb) {
    var songsList = [];
    request(downloaderConst.billiboard, function (error, response, html) {
        var $ = cheerio.load(html);
        const songName = $(downloaderConst.songSelector);
        const artist = $(downloaderConst.artistSelector);

        for(var i = 0;i < 100;i++) {
            var songObj = {};
            songObj.name = songName[i].children[0].data;
            songObj.artist = artist[i].children[0].data;
            songsList.push(songObj);
        }
        cb(error, songsList);
    })
}

module.exports = {
    getTopSongs:getTopSongs
};