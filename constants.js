/**
 * Created by raghav on 22/06/16.
 */

const downloaderConstants = {
    youtubeSearchURL : "https://www.youtube.com/results?search_query=",
    youtubeCMD : "youtube-dl -f 140 -o ",
    youtubeURL : " https://www.youtube.com",
    youtubeSelector : "h3.yt-lockup-title",
    songSelector : "h2.chart-row__song",
    artistSelector : "a.chart-row__artist",
    awsS3URL: "https://s3-ap-southeast-1.amazonaws.com/",
    billiboard : "http://www.billboard.com/charts/hot-100"
};

module.exports = downloaderConstants;