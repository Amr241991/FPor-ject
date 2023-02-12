var models =require("../models");
var bcrypt = require('bcryptjs');


var store = async function (req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {}
    }
    function cryptPassword(plainTextPassword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash
    }
    var username = req.body.username.trim()
    var email = req.body.email.trim()
    var password = cryptPassword(req.body.password.trim())
    if (username.length < 3) {
        result.success = false
        result.messages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false,
            result.messages.push('Please check your email')
    }
    if (password.length < 3) {
        result.success = false,
            result.messages.push('Please check your password')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    var [user, created] = await models.User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            username: username,
            password: password
        }
    })
    if (created) {
        result.messages.push('Admin has been created successfully')
    } else {
        result.success = false
        result.messages.push('You are already registered')
    }
    result.data = user
    res.send(result)
  }
  var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var user = await models.User.findByPk(id)
    if (user) {
        result.data = user
    } else {
        res.status(404)
        result.success = false
        result.messages.push("Please provide a valid ID")
    }
    res.send(result)
}
var destroy = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var deleted = await models.User.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        res.status(200)
        result.messages.push('Admin has been deleted')
    } else {
        res.status(404)
        result.success = false
        result.messages.push("Please provid a valid ID")
    }
    res.send(result)
}
var index = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var User = await models.User.findAll()
    if (Array.isArray(User)) {
        result.data = User
    } else {
        res.status(404)
        res.success = false
        res.messages.push("Plase try again")
    }
    res.send(result)
}
var update = async function (req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {}
    }
    function cryptPassword(plainTextPassword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash
    }
    var username = req.body.username.trim()
    var email = req.body.email.trim()
    var password = cryptPassword(req.body.password.trim())
    if (username.length < 3) {
        result.success = false
        result.messages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false,
            result.messages.push('Please check your email')
    }
    if (password.length < 3) {
        result.success = false,
            result.messages.push('Please check your password')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    var id = req.params.id
    var updatedUser = await models.User.update({
        username: username,
        email: email,
        password: password
    }, {
        where: {
            id:id
        }
    })
    result.data = updatedUser
    result.messages.push("user has been created")
    res.send(result)
}

var login = async function (req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {}
    }
    var email = req.body.email.trim()
    var plainTextPassword = req.body.password.trim()
    var loggedMember = await models.User.findOne({
        where: {
            email: email,
        }
    }).then((user) => {
        if (!user) {
            return false
        } else {
            let passwordMach = bcrypt.compareSync(plainTextPassword, user.password)
            if (passwordMach) {
                return user
            } else {
                return false
            }
        }
    })
    if (loggedMember) {
        result.data = loggedMember.id
        result.messages.push("sign in successfully.")
    } else {
        result.success = false
        result.messages.push('wrong email or password')
    }
    res.send(result)
}


  module.exports = {
    store,
    show,
    destroy,
    index,
    update,
    login
}