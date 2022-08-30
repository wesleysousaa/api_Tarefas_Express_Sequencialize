const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require("./db/conn")
const Tarefa = require("./models/Tarefa")

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.post("/add", async (req, res) =>{
    let nome = req.body.name
    console.log(nome)
    await Tarefa.create({name:nome})
    res.redirect("/")
})

app.get("/add", (req, res) => {
    res.render("add")
})

app.get("/tarefa/:id", async (req, res) => {
    let obj = await Tarefa.findByPk(req.params.id, {raw: true})
    res.render("tarefa", { tarefa: obj })
})

app.get("/delete/:id", async (req, res) => {
    const valor = await Tarefa.destroy({where:{id:req.params.id}})
    console.log(`Valor deletado ${valor}`)
    res.redirect('/')
})

app.get("/", async (req, res) => {
    let dados = await Tarefa.findAll({raw : true})
    res.render("home", { dados })
    return
})

conn.sync().then(() => {
    app.listen(3000)
}).catch((err) =>{
    console.log(`Erro ${err}`)
})