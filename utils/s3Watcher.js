/**
 * Created by raghav on 16/07/16.
 */
var AWS = require('aws-sdk');

AWS.config.loadFromPath('/Users/raghav/.aws/cred.json');


var cloudwatch = new AWS.CloudWatch();

var params = {
    EndTime: '2016-07-16T23:00:00Z',
    Namespace:"AWS/S3",
    MetricName:"BucketSizeBytes",
    Period: 86400*30,
    StartTime: '2016-07-10T23:00:00Z',
    Statistics: [ /* required */
        'Maximum'
        /* more items */
    ],
    Dimensions: [
        {
            Name: 'BucketName', /* required */
            Value: 'vcrmusic' /* required */
        },
        { Name: 'StorageType', Value: 'StandardStorage' }
        /* more items */
    ],
     Unit: 'Bytes'
    };
var param = {
    Namespace:"AWS/S3",
    MetricName:"BucketSizeBytes"
};
cloudwatch.getMetricStatistics(params, function (err,data) {
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
});

cloudwatch.listMetrics(param, function (err ,data) {
    console.log(data.Metrics[0].Dimensions);
})
