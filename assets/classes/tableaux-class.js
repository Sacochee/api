let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Tableaux
}

let Tableaux = class {
    static getAll(){
        return new Promise((next)=>{
            db.query('SELECT * From Tableaux')
            .then((r)=>next(r))
            .catch((err)=>next(err))
        })
    }
    static getById(id){
        return new Promise((next)=>{
            db.query('SELECT * From Tableaux WHERE id = ?',[+id])
            .then((r)=>next(r))
            .catch((err)=>next(err))
        })
    }
    static add(obj){
        return new Promise((next)=>{
            db.query('INSERT INTO Tableaux SET ?', [obj])
            .then((r)=>next(true))
            .catch((err)=>next(err))
        })
    }
    static delete(id){
        return new Promise((next)=>{
            db.query('DELETE FROM Tableaux WHERE id =  ?', [id])
            .then((r)=>next(true))
            .catch((err)=>next(err))
        })
    }
    static edit(id, obj){
        return new Promise((next)=>{
            db.query('UPDATE Tableaux SET ? WHERE id =  ?', [obj, id])
            .then((r)=>next(true))
            .catch((err)=>next(err))
        })
    }
}

