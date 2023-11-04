const express = require('express')
const mysql = require('promise-mysql')
const morgan = require('morgan')
const config = require("./assets/config.json")
const {check} = require('./assets/fnc')


mysql.createConnection({
    host: config.db.host,
    database: config.db.db,
    user: config.db.user,
    password:  config.db.password
})
.then((db)=>{
    console.log("connected")
    const stripe  = require('./assets/routes/routeStripe')(db, config)
    const TableauxAdmin = require('./assets/routes/tableaux')(db, config)
    const TableauxRouter = require('./assets/routes/tabl')(db, config)
    const OrdersAdmin = require('./assets/routes/ordersRouter')(db, config)
    let pngAdmin = express.Router()
    
    const app = express()
    const upload = require('./assets/multer')
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('image'))
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key');
        console.log("middle check")
        console.log(req.headers.Key)
        next()
    }) 


    pngAdmin.route('/')
    .post(upload.single('image'),async(req, res)=>{
        res.json(req.file)
    })
    
    pngAdmin.route("/:id")
    .delete(async(req, res)=>{
        const fs = require('fs')
        console.log("req.quer")
        console.log(req.query.name)
        fs.unlink(__dirname +"/image/"+req.query.name, (err)=>{
            if(err)
                res.json(check(err))
            else    
                res.json(check(true))
        })
    
    }) 
    
    app.use('/api/rest/png',pngAdmin)
    app.use('/tableaux', TableauxRouter)
    app.use('/api/v1/admin', TableauxAdmin)
    app.use('/api/v1/orders', OrdersAdmin)
    app.use('/stripe/pay', stripe)

    app.listen(8080, ()=>console.log('started ... on 8080'))
}) 










