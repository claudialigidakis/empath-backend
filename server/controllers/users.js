const userModel = require('../models/users')

// function getOne(req, res, next){
//   model.getOne(parseInt(req.params.usersId))
//   .then(function(data){
//     if(data) {
//       return res.status(200).send({ data })
//     }
//     else {
//       throw { status: 404, message: 'User Not Found' } }
//   })
//   .catch(next)
// }

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
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }
  model.update(parseInt(req.params.usersId), req.body)
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

function remove(req, res, next){
  model.remove(parseInt(req.params.usersId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {create, update, remove}
