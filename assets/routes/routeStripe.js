module.exports = function(_db, _config){
    const db = _db
    const express = require('express')
    const route = express.Router()
    const config = _config
    const stripe = require('stripe')(config.stripe.PrivateKey)
    const order = require('../classes/order-class')(db, config)
    const send = require('../mail')(config)

    route.post('/checkoutsession', async(req, res)=>{
        const data = req.body;
        const item = {
            price_data : {
                currency : 'eur',
                unit_amount : (data.price),
                product_data : {
                    images : [data.image],
                    name : data.tableauxName, 
                    description: data.description ,
                },
            },
            quantity : 1,
        }
        const sessions = await stripe.checkout.sessions.create({
            line_items: [item],
            phone_number_collection:{enabled:true},
            shipping_address_collection: {
                allowed_countries : ["FR"],
            },
            mode : "payment",
            success_url : `${config.stripe.host}/stripe/verif?id={CHECKOUT_SESSION_ID}&tablname=${data.tableauxName}`,
            cancel_url : `${config.stripe.host}/error?id={CHECKOUT_SESSION_ID}`
        })
    })


    route.get('verif', async(req, res)=>{
        const URL = `${config.stripe.host}/error`
        if(req.query.id){
        const session = await stripe.checkout.sessions.retrieve(req.query.id)
        if(session != ""){
                if(session.payment_status === "paid"){
                    const customer = {
                        email : session.customer_details.email,
                        phone : session.customer_details.phone,
                        tableauxName : req.query.tablname,
                        addresse : session.customer_details.address,
                        name : session.customer_details.name,
                        avancement: "Non vue",
                        stripeId: session.id
                    }
                    const a = await order.addOrder(customer)
                    if(typeof(a) == Error)
                        res.json(a)
                    else{
                        send(customer)
                        res.redirect(config.stripe.host)
                    }
                }
        }else
                res.redirect(URL)
        }else
            res.redirect(URL)
        
    })

    return route
}