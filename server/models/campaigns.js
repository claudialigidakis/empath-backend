const db = require('../../db')
const lib = require('../lib')


function getOne(campaignsId, usersId) {
  let campaignsid = campaignsId
  let usersid = usersId
  return (
    db('campaigns')
    .where({
      campaignsid
    })
    .first()
  )
}

function getAll(usersId) {
  return (
    db('campaigns')
  )
}

function remove(campaignsId, usersId) {

}

function create(body, params) {
  let title = body.title
  let description = body.description
  let usernames = body.usernames || []
  let hashtags = body.hashtags || []
  let userID = params.usersId
  let campaignsId;
  db('campaigns')
    .insert({
      title,
      description
    })
    .returning('*')
    .then(function([campaign]){
      console.log("made it inside of campaign")
        campaignsId = campaign.id
        // if (usernames) {
        //   var userNamePromise = usernames.map(username => lib.twitterSearchUser(username))
        // }
        if (hashtags) {
          var hashtagsPromise = hashtags.map(hashtag => lib.twitterSearchHashtag(hashtag))
        }
        console.log(Promise.all(hashtagsPromise))
      return Promise.all(hashtagsPromise)
    })
    .return(function(analyzeHashtagsMoods){
        console.log("made it back inside of campaign")
      // const toInsert = analyzeUsernameMoods.map(ele => ({
      //   campaigns_id: campaignsId,
      //   analysis: ,
      //   username:
      // }))
      console.log(analyzeHashtagsMoods);
      return analyzeHashtagsMoods
    })
    .catch(console.error)
}

function followedCamp(campId, userId) {
  let is_owner = true
  return db('followed_campaigns')
  .insert({
    is_owner,
    userId,
    campId
  })
  returning('*')
}


module.exports = {
  followedCamp,
  getOne,
  getAll,
  create,
  remove
}
