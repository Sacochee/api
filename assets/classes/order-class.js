
let db, config

module.exports = (_db, _config) =>{
    db = _db
    config = _config
    return Orders

}

let Orders  = class {
    static addOrder(obj){
        return new Promise((next)=>{
            db.query('INSERT INTO orders SET ?', [obj])
            .then(()=>next(true))
            .catch((err)=> next(err))
        })
    }
    static getOrdersStatus(avan){
        return new Promise((next)=>{
            db.query('SELECT * FROM Orders WHERE avancement = ?', [avan])
            .then((result)=>next(result))
            .catch((err)=>next(err))
        })
    }
    static getByName(name){
        return new Promise((next)=>{
            db.query('SELECT * FROM Orders WHERE name=?', [name])
            .then((r)=>{
                if(r == '')
                    next(new Error('No Name Found'))
                else
                    next(r)
            })
            .catch((err)=>next(err))
        })
    }
    static getAll(){
        return new Promise((next) =>{
            db.query('SELECT * FROM orders')
            .then((result)=>next(result))
            .catch((err)=>next(err))
        })
    }
    static getById(id){
        return new Promise((next)=>{
            db.query('SELECT * FROM Orders WHERE id = ?', [+id])
            .then((r)=>{
                if(r == '')
                    next(new Error('No ID FOUND'))
                else
                    next(r)
            })
            .catch((err)=>next(err))
        })
    }
    static deleteOrders(id){
        return new Promise((next)=>{
            db.query('DELETE FROM orders WHERE Id= ?', [+id])
            .then((r)=>{next(true)})
            .catch((err)=>next(err))
        })
    }
    static getByStripeId(id){
        return new Promise((next)=>{
            db.query('SELECT * FROM orders WHERE stripeId = ?', [id])
            .then((r)=>next(r))
            .catch((err)=>next(err))
        })
    }
}