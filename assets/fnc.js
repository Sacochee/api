exports.check = (res) =>{
    if(isErr(res))
        return Err(res)
    else
        return Sucess(res)
}

function isErr(e){
    return e instanceof Error
}

function Sucess(e){
    return{
        status : "Sucess",
        result : e
    }
}

function Err(e){
    return{
        status : "Error",
        message : e.message
    }
}


