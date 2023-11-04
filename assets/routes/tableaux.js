const { check } = require('../fnc')

module.exports = function(db , config){
    const express = require('express')
    const route = express.Router()
    const Tableaux = require('../classes/tableaux-class')(db, config)

    route.post('/', async(req, res)=>{
        const b = req.body
        const tableaux = {
            name : b.name,
            description : b.description,
            price : b.price,
            width : b.width,
            heigth : b.heigth, 
            images : b.images,
        }

        const a = await Tableaux.add(tableaux)
        res.json(check(a))
    })

    route.route('/:id')
        .put(async(req, res)=>{
            if(await Tableaux.getById(req.params.id) != undefined){
                const b = req.body
                const n = {}
                b.name ? Object.assign(b, {name : b.name}) : undefined
                b.price ? Object.assign(n, {price : b.price}) : undefined
                b.width ? Object.assign(n, {width : b.width}) : undefined
                b.heigth ? Object.assign(n, {heigth : b.heigth}) : undefined
                b.images ? Object.assign(n, {images : b.images}) : undefined
                b.description ? Object.assign(n, {description : b.description}) : undefined
                b.status ? Object.assign(n, {status : b.status}) : undefined
                let  a = await Tableaux.edit(req.params.id, n)
                res.json(check(a))
            }
        })
        .delete(async(req, res)=>{
            let a = await Tableaux.delete(req.params.id)
            res.json(check(a))
        })

    return route
}