const User = require('../../models').User
const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response')
const ResourceController = require("./resource.controller")

class UsersController extends ResourceController {
    constructor() {
        super()
        this.setModel(User)
    }
}

module.exports = new UsersController