const express = require("express");
const fs = require("fs");
const app = express();
app.listen(3000);

app.use(express.json());
app.use(express.urlencoded());
let post = JSON.parse(fs.readFileSync("./data/post.json"));



///....................................Get Method...........................
app.get("/post", (req, res)=>{
    res.send(post);
});


///.....................................Post Method...........................
app.post("/post", (req, res) =>{
    let user ={
        id: post.length + 1,
        username: req.body.username,
        password: req.body.password
    }
    post.push(user);
    res.send(post);
    
})

///............................put method......................................

app.put("/post/:id", (req, res)=>{
    let id = req.params.id;
    let userName = req.body.username;
    let pass = req.body.password
    let index = -1;
    for (let user of post){
        if (user.id === parseInt(id)){
            index = user.id -1;
        }
    }
    if (index >= 0){
        let user = post[index];
        user.username = userName;
        user.password = pass;
        res.send(user)
    }else{
        res.status(404)
        res.send({error: "User id not correct!"})
    }
})

///..................................delete method........................


//DELETE/post(remove)
app.delete("/post/:id", (req, res) => {
    let id = req.params.id;

    let index = -1;
    for (let user of post) {
        if (user.id === parseInt(id)) {
            index = user.id - 1;
        }
    }
    if (index >= 0) {
        let user= post[index];
        post.splice(index, 1)
        res.send(user);
        // console.log(value)
    } else {
        res.status(404)
        res.send({ error: "Not correct!" })
    }
});
