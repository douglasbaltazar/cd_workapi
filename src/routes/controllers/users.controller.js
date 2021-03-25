const User = require('../../models').User
const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response')
const ResourceController = require("./resource.controller")

class UsersController extends ResourceController {
    constructor() {
        super()
        this.setModel(User)
    }

    async login(req, res, next) {
        try {
            const {email, password } = req.body
            const result = await User.verifyLogin(email, password)
            console.log(req.body, email, password)
            successResponse(res, 200, "Usuario autenticado com sucesso", result)
        } catch(error) {
            console.log(error)
            errorResponse(res, 500, `Não foi possivel autenticar.`)
        }
    }
}

module.exports = new UsersController