const model = require('../models/campaigns')

function getOne(req, res, next){
  model.getOne(parseInt(req.params.campaignsId))
  .then(function(data){
    if(data) {
      return res.status(200).send({ data })
    }
    else {
      throw { status: 404, message: 'Campaign Not Found' } }
  })
  .catch(next)
}

function getAll(req, res, next){
  model.getAll()
  .then(function(data){
    res.status(200).send({data})
  })
  .catch(next)
}

function create(req, res, next){
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }
  model.create(req.body.name)
  .then(function(data){
    res.status(201).send({ data })
  })
  .catch(next)
}

function remove(req, res, next){
  model.remove(parseInt(req.params.campaignsId))
  .then(function(data){
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {getOne, getAll, create, remove}
