var express = require('express');
var router = express.Router();
var downloader = require('../utils/download');
var songList = require('../utils/songListing');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*
API version 2.0
 */
router.get('/v2/download/:query', function (req, res) {
  const f = 1;
  downloader.downloadSong(req.params.query, f, function (err, result) {
    if(err) {
      res.status(404).json({success:false,msg:"some error"});
    } else {
      res.status(200).json({success:true,url:result});
    }
  });
});

/*
API version 1.0
 */
router.get('/download/:query',function (req, res) {
  const f = 0;
  downloader.downloadSong(req.params.query, f, function (err, result) {
    if(err) {
      res.status(404).json({success:false,msg:"some error"});
    } else {
      res.status(200).json({success:true,url:result});
    }
  });
});

router.get('/getTopSongs', function (req, res) {
    songList.getTopSongs(function (err, result) {
      if(err) {
        res.status(404).json({msg:"some error occurred"})
      } else {
        res.status(200).json(result);
      }
    })
});

module.exports = router;
