

module.exports = function(db, config){
    const express = require('express')
    const route = express.Router()
    const Tableaux = require('../classes/tableaux-class')(db, config)
    const { check } = require('../fnc')

    route.get('/', async(req, res)=>{
         const a = await Tableaux.getAll()
        res.json(check(a))
    })
    route.get("/:id", async(req, res)=>{
        const a = await Tableaux.getById(req.params.id)
        res.json(check(a))
    })

    return route   
}