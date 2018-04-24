const db = require('../../db')
const lib = require('../lib')


function getOne(campaignsId, usersId) {
  let campaignsid = campaignsId
  let usersid = usersId
  return (
    db('followed_campaigns')
    .where({
      campaigns_id: campaignsId,
      user_id: usersId
    })
    .first()
  )
}

function getAll(usersId) {
  let usersid = usersId
  return (
    db('followed_campaigns')
    .innerJoin('campaigns', 'campaigns.id', 'followed_campaigns.campaigns_id')
    .where({
      user_id: usersId
    })
  )
}


function remove(campaignsId, usersId) {
  let campaignsid = campaignsId
  let usersid = usersId
  return (
    db('followed_campaigns')
    .where({
      campaigns_id: campaignsid,
      user_id: usersid
    })
    .del()
  )
}


function create(body, params) {
  let title = body.title
  let description = body.description
  let usernames = body.usernames || []
  let hashtags = body.hashtags || []
  let userID = params.usersId
  let campaignsId;
  return db('campaigns')
    .insert({
      title,
      description
    })
    .returning('*')
    .then(function([campaign]) {
      campaignsId = campaign.id
      if (hashtags) {
        var hashtagsPromise = hashtags.map(hashtag => lib.twitterSearchHashtag(hashtag))
        return Promise.all(hashtagsPromise)
          .then(function(analyzeHashtagsMoods) {
              const toInsert = analyzeHashtagsMoods.map(ele => ({
                campaigns_id: campaignsId,
                hashtagAnalysis: ele.response,
                hashtag: ele.target
              }))
              // return analyzeHashtagsMoods
              return db('hashtags').insert(toInsert)
          })
        }
        else {
          return Promise.resolve()
        }
    })
    .then(function() {
      if (usernames) {
        var userNamePromise = usernames.map(username => lib.twitterSearchUser(username))
        return Promise.all(userNamePromise)
          .then(function(analyzeUsernameMoods) {
              const toInsert = analyzeUsernameMoods.map(ele => ({
                campaigns_id: campaignsId,
                usernameAnalysis: ele.response,
                username: ele.target
              }))
              // return analyzeHashtagsMoods
              return db('usernames').insert(toInsert)
          })
        }
        else {
          return Promise.resolve()
        }
    })
    .then(function() {
      console.log("made it to the end of models")
      return db('followed_campaigns')
        .insert({
          is_owner: true,
          user_id: userID,
          campaigns_id: campaignsId
        })
        .returning('*')
    })
}


module.exports = {
  getOne,
  getAll,
  create,
  remove
}
