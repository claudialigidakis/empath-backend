const userModel = require('../models/users')


function getOne(req, res, next){
 if(!req.params.usersId) {
   return next({ status: 400, message:'Bad Request'})
 }
 userModel.getOne(req.params.usersId)
 .then(data =>{
   delete data.password
   res.status(200).send({ data })
 })
 .catch(next)
}


function getUserbyUsername(req, res, next){
  if(!req.params.reqUser) {
  return next({ status: 400, message:'Bad Request'})
}
  userModel.getUserbyUsername(req.params.reqUser)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function create(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.fname || !req.body.lname || !req.body.email){
    return next({ status: 400, message: 'Missing user creation fields'})
  }

  userModel.create(req.body)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function update(req, res, next){
  if(!req.body){
    return next({ status: 400, message:'Bad Request'})
  }
  userModel.update(parseInt(req.params.usersId), req.body)
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function remove(req, res, next){
    console.log("made it to controller")
  userModel.remove(parseInt(req.params.usersId))
  .then(function(data){
    console.log("back to controllers")
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {getOne, create, update, remove, getUserbyUsername}
