const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')

function getOneByUserName(username){
  return (
    db('users')
    .where({ username })
    .first()
  )
}

function getOne(usersId){
  return (
    db('users')
    .where({ id: usersId })
    .first()
  )
}

function create(body){
  let username = body.username
  let password = body.password
  let fname = body.fname
  let lname = body.lname
  let email = body.email

  return getOneByUserName(username)
  .then(function(data){
    if(data) throw { status: 400, message:'Already exists'}
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){
    return (
      db('users')
      .insert({ fname, lname, email, username, password: hashedPassword, })
      .returning('*')
    )
  })
  .then(function([ {password, ...data} ]){
    return data
  })
}

function remove(usersId){
  console.log("made it to remove models")
  let usersid = usersId
  console.log(usersid)
  return (
    db('users')
    .where({
      id: usersid
    })
    .del()
  )
}

module.exports = {getOne, getOneByUserName, create, remove}
