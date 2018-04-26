const model = require('../models/campaigns')

function getOne(req, res, next){
  model.getOne(parseInt(req.params.campaignsId), parseInt(req.params.usersId))
  .then(function(data){
    if(data) {
      console.log("got my data back", data)
      return res.status(200).send({ data })
    }
    else {
      throw { status: 404, message: 'Campaign Not Found' } }
  })
  .catch(next)
}

function getAll(req, res, next){
  model.getAll(parseInt(req.params.usersId))
  .then(function(data){
    res.status(200).send({data})
  })
  .catch(next)
}

function create(req, res, next){
  console.log("made it to create")
  if(!req.body.title || !req.body.description){
    return next({ status: 400, message:'Bad Request'})
  }
    model.create(req.body, req.params)
    .then(function(data){
        console.log("made it back to create")
        res.status(201).send({ data })
    })
  .catch(err => {
    console.log(err);
    return next(err);
  })
}

function AddUser(req, res, next) {
  console.log("enteredAddUser controller")
  if(!req.params){
    return next({ status: 400, message:'Bad Request'})
  }
  model.AddUser(req.params)
  .then(data => {
    console.log("returned add user")
    res.status(201).send({ data })
  })
  .catch(err => {
    console.log(err);
    return next(err);
})
}

function remove(req, res, next){
  console.log("made it to controller")
  model.remove(parseInt(req.params.campaignsId), parseInt(req.params.usersId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {getOne, getAll, create, remove, AddUser}
