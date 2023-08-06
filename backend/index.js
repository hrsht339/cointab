const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./models")
const {User} = require("./models")

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to harshit's user management system")
})

app.get("/get",(req,res)=>{
    User.findAll().then((result)=>{
        res.send(result)
    })
})

app.post("/create",(req,res)=>{
    let data = req.body
    User.bulkCreate(data).then((res)=>{
        res.send(res)
    }).catch((err)=>{
        res.send(err)
    })
})

app.delete("/delete",(req,res)=>{
    User.destroy({
        where: {},
      }).then((res)=>{
        res.send(res)
      }).catch((err)=>{
        res.send(err)
    })
})


db.sequelize.sync().then((req)=>{
    app.listen(4500,()=>{
        console.log("server connected")
    })
})
