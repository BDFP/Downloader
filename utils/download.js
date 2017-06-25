/**
 * Created by raghav on 21/06/16.
 */
const exec = require('child_process').exec;
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');
const downloaderConstants = require('../constants');
var aws = require('./awsUtil');
var async = require('async');

function downloadSong(param, flag, cb) {

    async.waterfall([
        function (callback) {
            request(downloaderConstants.youtubeSearchURL + param, function (error, response, html) {
                var $ = cheerio.load(html);
                const partialURL = $(downloaderConstants.youtubeSelector).children('a')['0'].attribs.href;
                const songTitle = $(downloaderConstants.youtubeSelector).children('a')['0'].attribs.title;
                var songURL = " https://www.youtube.com" + partialURL;
                var newPath = __dirname + "/../public/songs/" + songTitle + ".m4a";
                var song_url = "/songs/" + songTitle + ".m4a";
                var arrResult = [newPath,songURL,song_url];
                callback(error,arrResult)
            });
        },

        function (arrResult,callback) {
            var filePath = __dirname + "/../public/songs/song.m4a";
            console.log(downloaderConstants.youtubeCMD + filePath + arrResult[1]);
            exec(downloaderConstants.youtubeCMD + filePath + arrResult[1], function (error) {
                fs.rename(filePath, arrResult[0], function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        callback(error,arrResult[0]);
                    }
                });
            });
            
        }

    ], function (error, result) {
        console.log(result);
        cb(error,result)
    });
}

module.exports =  {
    downloadSong:downloadSong
};
