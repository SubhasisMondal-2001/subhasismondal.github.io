const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const LogInCollection = require("./mongodb")
const ContactUs = require("./mongodb")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))



app.get("/", (req, res) => {
    res.render("index")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})

app.post("/signup", async (req, res) => {
    
        const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
})
        await data.save()
        res.render("reg_success")
})



app.post("/login", async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("login_successful", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})
app.post("/contact", async (req, res) => {
    
    const data = new ContactUs({
    name: req.body.name,
    subject: req.body.subject
})
    await data.save()
    res.render("accepted")
})


app.listen(port, () => {
    console.log('port connected');
})