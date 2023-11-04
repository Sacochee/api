module.exports = function(db , config){
    const express = require('express')
    const route  = express.Router()
    const {check} = require('../fnc')
    const Orders = require('../classes/order-class')(db, config)

    route.get('/', async(req, res)=>{
        if(req.query.name){
            const a = await Orders.getByName(req.query.name)
            res.json(check(a))
        }
        else if(req.query.stripeId){
            const a = await Orders.getByStripeId(req.query.stripeId)
            res.json(check(a))
        }
        else{
            const a = await Orders.getAll()
            res.json(check(a))
        }
        
    })

    route.route('/:id')
        .get(async(req, res)=>{
            const a = await Orders.getById(req.params.id)
            res.json(check(a))
        })
        .delete(async(req, res)=>{
            const a = await Orders.deleteOrders(req.params.id)
            res.json(check(a))
        })
    
    return route
}