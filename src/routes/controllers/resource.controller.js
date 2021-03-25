const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response')
const invalidResponse = require('../responses/invalid.response')

class ResourceController {
    constructor() {
        this.model = null
    }

    setModel(model) {
        this.model = model 
    }

    bindMethod(method) {
        return this[method].bind(this)
    }
    async index (req, res, next) {
        try {
            const { entities, meta }  = await this.model.search(req.query) 
            return successResponse(res, 200, null, entities, meta)
        } catch(error) {
            return errorResponse(res, 500, `Não foi possivel listar entidades de ${this.model.getTableName()}`, error)
        }
    }
    async show (req, res, next) {
        try {
           const entity = await this.model.get(req.params.id)
           return successResponse(res, 200, null, entity)
        } catch(error) {
            return errorResponse(res, 500, `Não foi possivel recuperar os dados da entidade de ${this.model.getTableName()} por Id`, error)
        }
    }
    async store (req, res, next) {
        try {
            const entity = await this.model.create(req.body)
            return successResponse(res, 200, `Nova entidade incluida com sucesso`, entity)
         } catch(error) {
             if(error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados não são válidos.`, error)
             }
             return errorResponse(res, 500, `Erro ao incluir entidade em ${this.model.getTableName()}`, error)
         }
    }
    async update (req, res, next) {
        try {
            const entityOld = await this.model.get(req.params.id)
            const entityNew = await entityOld.update(req.body)
            return successResponse(res, 200, `Entidade atualizada com sucesso em ${this.model.getTableName()}.`, entityNew)
         } catch(error) {
             if(error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados não são válidos.`, error)
             }
             return errorResponse(res, 500, `Error ao atualizar entidade em ${this.model.getTableName()}`, error)
         }
    }
    async remove (req, res, next) {
        try {
            const entity = await this.model.get(req.params.id)
            if(!entity) {
                return errorResponse(res, 404, `Não foi possivel recuperar os dados da entidade pelo Id`)
            }
            entity.destroy()
            return successResponse(res, 204, `Entidade excluida com sucesso em ${this.model.getTableName()}`)
         } catch(error) {
             return errorResponse(res, 500, `Não foi possivel recuperar os dados da entidade de ${this.model.getTableName()} por Id`, error)
         }
    }
}

module.exports = ResourceController