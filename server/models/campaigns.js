const db = require('../../db')
const lib = require('../lib')


function getOne(campaignsId, usersId) {
  let campaignsid = campaignsId
  let usersid = usersId
  let data = {}
  return (
    db('followed_campaigns')
    .innerJoin('campaigns', 'campaigns.id', 'followed_campaigns.campaigns_id')
    .where({
      'followed_campaigns.campaigns_id': campaignsid,
      'followed_campaigns.user_id': usersid
    })
    .then(function([campaign]){

      data.campaign = campaign

      const hashtags = db('hashtags').where({campaigns_id: campaignsId})
      const usernames = db('usernames').where({campaigns_id: campaignsId})
      return Promise.all([hashtags, usernames])
    })
    .then(function([hashtags, usernames]){
      data.hashtags = hashtags
      data.usernames = usernames
      return data
    })
  )
}

function getAll(usersId) {
  let usersid = usersId
  return (
    db('followed_campaigns')
    .innerJoin('campaigns', 'campaigns.id', 'followed_campaigns.campaigns_id')
    .where({
      'followed_campaigns.user_id': usersid
    })
  )
}


function remove(campaignsId, usersId) {
  let campaignsid = campaignsId
  let usersid = usersId
  return (
    db('followed_campaigns')
    .where({
      'followed_campaigns.campaigns_id': campaignsid,
      'followed_campaigns.user_id': usersid
    })
    .del()
  )
}


function AddUser(params){
  console.log("entered models")
  console.log(params)
  let userid = params.userId
  let campaignsId = params.campaignsId
    console.log(userid, campaignsId)
  return db('followed_campaigns')
    .insert({
      is_owner: false,
      user_id: userid,
      campaigns_id: campaignsId
    })
    .returning('*')
}


function create(body, params) {
  let title = body.title
  let description = body.description
  let usernames = body.usernames || []
  let hashtags = body.hashtags || []
  let userID = params.usersId
  let campaignsId;

  hashtags = hashtags.filter(e => e.length > 0)
  usernames = usernames.filter(e => e.length > 0)

  return db('campaigns')
    .insert({
      title,
      description
    })
    .returning('*')
    .then(function([campaign]) {
      campaignsId = campaign.id
      if (hashtags && hashtags.length !== 0) {
        var hashtagsPromise = hashtags.map(hashtag => lib.twitterSearchHashtag(hashtag.trim()))
        return Promise.all(hashtagsPromise)
          .then(function(analyzeHashtagsMoods) {
              const toInsert = analyzeHashtagsMoods.map(ele => ({
                campaigns_id: campaignsId,
                hashtagAnalysis: ele.response,
                hashtag: ele.target
              }))
              return db('hashtags').insert(toInsert)
          })
        }
        else {
          return Promise.resolve()
        }
    })
    .then(function() {
      if (usernames && usernames.length !== 0) {
        var userNamePromise = usernames.map(username => lib.twitterSearchUser(username.trim()))
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
  remove,
  AddUser
}
