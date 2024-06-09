const {TypeEvent}  = require('../models/models')
const ApiError = require('../error/ApiError')


class EventsTypeController{

    async getAllTypesEvents(req, res,next){
        // const types = await Type.findAll()
        // return res.json(types)
        try {
            const types = await TypeEvent.findAll();
            return res.json(types);
        } catch (err) {
            next(ApiError.internal('Failed to get types of events'));
        }
    }

    async createTypeEvent(req, res,next){
        // const {name} = req.body
        // const type = await TypeEvent.create({name})
        // return res.json(type)
        try {
            const {name} = req.body;
            if (!name) {
                throw ApiError.badRequest('Name is required');
            }
            const type = await TypeEvent.create({name});
            return res.json(type);
        } catch (err) {
            next(ApiError.internal('Failed to create type of event'));
        }
    }

    async deleteTypeEvent(req, res,next){
        try {
            const { type_event_id } = req.params;
            const type = await TypeEvent.findByPk(type_event_id);
            if (!type) {
                throw ApiError.notFound('Type not found');
            }
            await type.destroy();
            return res.json({ message: 'Type deleted successfully' });
        } catch (err) {
            next(ApiError.internal('Failed to delete type of event'));
        }
    }
}

module.exports = new EventsTypeController()