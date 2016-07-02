var express = require('express');
var router = express.Router();
var downloader = require('../utils/download');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/download/:query',function (req, res) {
  downloader.downloadSong(req.params.query,function (err, result) {
    if(err) {
      res.status(404).json({success:false,msg:"some error"});
    } else {
      res.status(200).json({success:true,url:result});
    }
  });
});

module.exports = router;
