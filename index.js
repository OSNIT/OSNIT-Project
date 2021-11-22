const Twit = require('twit');
const jsonfile = require('jsonfile');
const fs = require('fs');
var jsonFormat = require('json-format');

const apikey = "6euuOH5u43q9fABmaHzHBdo9c";
const apisecret = "FEwXEkHyh4kkYCQeVNhJcN7asqFkY6ll8CjBEzpQCSHeHmhXj5";
const tokenkey = "1356770346616172546-9khlFVMN4YIwrw0ApW3m8fUqHDnyg5";
const tokensecret = "7kYTyg4A7uJbzRuCd1oy3t3tAZPPZWXZZ6QvNHThlY7YX";
const counts = 40;
const file = 'data.json';

var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apisecret,
    access_token: tokenkey,
    access_token_secret: tokensecret
});
T.get('search/tweets', {q: '#stopthesteal since:2020-11-15', count:counts}, function (err, data, response){
    const tweet = data;
    for (let i = 0; i < counts; i++){
        if (i===2){
            i=3;
        }
        var obj = {
            text:tweet.statuses[i].text,
            timestamp:tweet.statuses[i].created_at,
            username:tweet.statuses[i].user.screen_name,
            lang:tweet.statuses[i].lang
        }

        if (fs.existsSync(file)){
            jsonfile.writeFile(file, jsonFormat(obj), { flag: 'a' }, function (err) {
                if (err) console.error(err)
              })
        }
        else{
            jsonfile.writeFile(file, jsonFormat(obj), function (err) {
                if (err) console.error(err)
              })
        }
    }
 })