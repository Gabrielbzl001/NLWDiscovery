const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')


//configurar nunjucsks(template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
//configurar servidor
server
// receber dados do req.body
.use(express.urlencoded({extended: true}))
.use(express.static("public")) // configurar arquivos estáticos
.get("/",pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses) // rotas
.post("/save-class", saveClasses)
//start server
.listen(5500)