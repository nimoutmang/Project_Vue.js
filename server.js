const express = require("express");
const fs = require("fs");
const app = express();
app.listen(3000);


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
let post = JSON.parse(fs.readFileSync("./data/post.json"));



///....................................Get Method...........................
app.get("/post", (req, res)=>{
    res.send(post);
});


///.....................................Post Method...........................
app.post("/post", (req, res) =>{
    if(!req.body.authorname){
        res.status(400);
        res.send({error: "Username Required"})
    }
    let user ={
        id: post.length + 1,
        authorname: req.body.authorname,
        content: req.body.content
    }
    post.push(user);
    res.send(post);
    
})

///............................put method......................................

app.put("/post/:id", (req, res)=>{
    let id = req.params.id;
    let userName = req.body.authorname;
    let pass = req.body.content
    let index = -1;
    for (let user of post){
        if (user.id === parseInt(id)){
            index = user.id -1;
        }
    }
    if (index >= 0){
        let user = post[index];
        user.authorname = userName;
        user.content = pass;
        res.send(user)
    }else{
        res.status(404)
        res.send({error: "User id not correct!"})
    }
})

///..................................delete method........................

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
        
    } else {
        res.status(404)
        res.send({ error: "Not correct!" })
    }
});
