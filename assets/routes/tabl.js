

module.exports = function(db, config){
    const express = require('express')
    const route = express.Router()
    const Tableaux = require('../classes/tableaux-class')(db, config)
    const { check } = require('../fnc')

    route.get('/', async(req, res)=>{
        if(req.query.id){
            const a = await Tableaux.getById(req.query.id)
            res.json(check(a))
        }else{
            const a = await Tableaux.getAll()
            res.json(check(a))
        }
    })

    return route   
}