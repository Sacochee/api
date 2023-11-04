module.exports= function(config) {
    const nodemailer = require('nodemailer')

    const mail = nodemailer.createTransport({
        host : config.mail.host,
        service : config.mail.service,
        port: config.mail.port,
        auth : {
            user : config.mail.auth.user,
            pass : config.mail.auth.pass
        }
    })

    function sendMail(data){
        return mail.sendMail({
            from : config.mail.auth.user,
            to: config.mail.to,
            subject : "New Orders !",
            text : JSON.stringify(data)
        })
    }

    return sendMail ;
}