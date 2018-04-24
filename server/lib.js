const fs = require('fs');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: "AAAAAAAAAAAAAAAAAAAAACDV5gAAAAAABVhatHP%2BB6vXsYs8Uf1FIztjHp4%3Dd5M62JIR1G5MCLYEwwIrFRNtlx4G5QVOGqZcM2E3wpwNWz5kTV"
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personality_insights = new PersonalityInsightsV3({
  "url": "https://gateway.watsonplatform.net/personality-insights/api",
  "username": "0b81da3f-e347-4a88-8e3c-b11634261333",
  "password": "bHGx41K4rFTT",
  "version_date": "2017-12-01"
});


function twitterSearchUser(screenName) {

  return new Promise((resolve, reject) => {
    let userName = screenName
    client.get('statuses/user_timeline', {
      screen_name: userName
    }, function(error, tweets, response) {
      if (!error) {
        let contentItems = [];
        // Loop through the tweets
        for (let i = 0; i < tweets.length; i++) {
          let tweet = tweets[i];
          contentItems.push({
            "content": tweet.text,
            "contenttype": "text/plain",
            "created": new Date(tweet.created_at).getTime(),
            "id": tweet.id,
            "language": tweet.lang,
          })
        }
        // Call Watson with the tweets
        personality_insights.profile({
          "contentItems": contentItems,
          "consumption_preferences": true
        }, (err, response) => {
          if (err) reject(err);
          resolve({
            target: screen_name,
            response
          })
        })
      }
      if (error) {
        reject(error)
      }
    })

  })
}


function twitterSearchHashtag(searchParam) {
  return new Promise((resolve, reject) => {
      let search = searchParam;
      client.get('search/tweets', {
          q: `#${search}`
        }, function(error, tweets, response) {
          if (error) reject(error);
          let contentItems = [];
          // Loop through the tweets
          for (let i = 0; i < tweets.statuses.length; i++) {
            let tweet = tweets.statuses[i];
            contentItems.push({
              "content": tweet.text,
              "contenttype": "text/plain",
              "created": new Date(tweet.created_at).getTime(),
              "id": tweet.id,
              "language": tweet.metadata.iso_language_code
            });
          }
          // Call Watson with the tweets
          personality_insights.profile({
            "contentItems": contentItems,
            "consumption_preferences": true
          }, (err, response) => {
            if (err) reject(err);
            resolve({
              target: searchParam,
              response
            })
          })
        if (error) {
          reject(error)
        }
      })
  })
}



module.exports = {
  twitterSearchHashtag,
  twitterSearchUser
}
