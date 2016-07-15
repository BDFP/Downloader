/**
 * Created by raghav on 14/07/16.
 */
var AWS = require('aws-sdk');

//AWS.config.loadFromPath('/home/ubuntu/.aws/cred.json');


var s3 = new AWS.S3();

function uploadToS3(param,cb) {
    
    s3.upload(param, function (err) {
        if(err) {
            cb(err,null)
        } else {
            cb(null,{msg:"Uploaded"});
        }
    });
}

module.exports = {
    uploadToS3:uploadToS3
};