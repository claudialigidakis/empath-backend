const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')
const userModel = require('./users')

function login(username, password){
  let user
  return userModel.getOneByUserName(username)
  .then(function(data){
    if(!data) throw { status: 400, message: "Bad Request"}
    user = data
    return bcrypt.compare(password, data.password)
  })
  .catch(bcrypt.MISMATCH_ERROR, function(){
    throw { status: 401, message: "Unauthorized"}
  })
  .then(function(){
    delete user.password
    return user
  })
}

module.exports = {
  login
}
