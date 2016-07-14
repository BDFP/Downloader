/**
 * Created by raghav on 21/06/16.
 */
const exec = require('child_process').exec;
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');
const downloaderConstants = require('../constants');
var async = require('async');
var aws = require('./awsUtil');

function downloadSong(param, cb) {

    async.waterfall([
        function (callback) {
            request(downloaderConstants.youtubeSearchURL + param, function (error, response, html) {
                var $ = cheerio.load(html);
                const partialURL = $(downloaderConstants.youtubeSelector).children('a')['0'].attribs.href;
                const songTitle = $(downloaderConstants.youtubeSelector).children('a')['0'].attribs.title;
                console.log(partialURL,songTitle);
                var songURL = " https://www.youtube.com" + partialURL;
                var newPath = __dirname + "/../public/songs/" + songTitle + ".m4a";
                var song_url = "/songs/" + songTitle + ".m4a";
                var arrResult = [newPath,songURL,song_url];
                callback(error,arrResult)
            });
        },

        function (arrResult,callback) {
            var filePath = __dirname + "/../public/songs/song.m4a";
            exec(downloaderConstants.youtubeCMD + filePath + arrResult[1], function (error, result) {
                fs.rename(filePath, arrResult[0], function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        callback(error,arrResult[2]);
                    }
                });
            });
            
        },

        function (songURL, callback) {
            var songName = songURL.split('/')[2];
            var songPath = __dirname + "/../public" + songURL;
            var fileContent = fs.createReadStream(songPath);
            var param = {songName:songName,config:{Bucket:"vcrmusic",Key:songName,Body:fileContent,ACL:"public-read"}};
            aws.uploadToS3(param.config, function (err,data) {
                if(err) {
                    console.log(err);
                } else {
                    fs.unlink(songPath, function (err) {
                        if(err){
                            console.log(err);
                        } else {
                            var songURL = downloaderConstants.awsS3URL + param.config.Bucket + "/" + param.config.Key;
                            callback(err,songURL);
                        }
                    });
                }
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
