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

app.get("/get/:page",async(req,res)=>{
    let page = req.params.page
    let total = await User.findAndCountAll() 
    let count=total.count
    let pages = Math.ceil(count/10)
    if(page>0 && page<=pages){
        const users = await User.findAll({
            limit: 10,
            offset:(page-1)*10,
        });
        res.send(users)
    }
    else{
        res.send({
            "msg":"out of range"
        })
    }
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
