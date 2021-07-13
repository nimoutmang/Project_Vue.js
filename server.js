const fs= require('fs');
const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => console.log("server is running on port: " + PORT))

app.use(express.static('public'));
// app.use(express.urlencoded());
app.use(express.json());

////...................UploadImage........................................
const storageImage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, callback)=>{
        return callback(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storageImage

})

//....................Readfile............................................

let posts = JSON.parse(fs.readFileSync('data/posts.json'));
console.log(posts.last_Id);


///....................................Get Method...........................
app.get('/post', (req, res)=> res.send(posts.postDatas));

///.....................................Post Method...........................
app.post('/post', upload.single('image'), (req, res) => {
    let anothername = req.body.anothername;
    let content = req.body.content;
    let img = req.file.filename;
    let today = new Date();
    let date = today.getDay() + ', ' + today.getMonth() + ', ' + today.getHours() + ':' + today.getMinutes();

    let countId = posts.last_Id +=1;

    let newPost = {
        "id": countId,
        "anothername": anothername,
        "content": content,
        "date": date,
        "image": img,
        "like": 0,
        "unlike": 0
    };
    console.log(newPost);
    posts.postDatas.push(newPost);
    console.log(posts.postDatas);

    res.send(posts.postDatas);
    fs.writeFileSync('data/posts.json', JSON.stringify(posts));
})

///............................put method......................................

app.put('/post',(req,res)=>{
    let id = parseInt(req.body.id);
    let content=req.body.content;
    let index = -1;
    for (let post of posts.postDatas) {
        if (post.id === id) {
            index = posts.postDatas.indexOf(post);
        }
    }
    posts.postDatas[index].content = content;
    res.send(posts.postDatas);
    fs.writeFileSync("data/posts.json", JSON.stringify(posts));
})
app.put('/like', (req,res)=>{
    let id = parseInt(req.body.id);
    let index = -1;
    for (let post of posts.postDatas) {
        if (post.id === id) {
            index = posts.postDatas.indexOf(post);
        }
    }
    posts.postDatas[index].like +=1;
    res.send(posts.postDatas);
    fs.writeFileSync("data/posts.json", JSON.stringify(posts));
})


///..................................delete method........................
app.delete("/post/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    let index = -1;
    for (let post of posts.postDatas) {
        if (post.id === parseInt(id)) {
            index = posts.postDatas.indexOf(post)
        }
    }
    posts.postDatas.splice(index, 1);
    res.send(posts.postDatas);
    fs.writeFileSync("data/posts.json", JSON.stringify(posts));
})

//..........................uplaod......................
app.post("/post", upload.single("image"), (req,res)=>{
    res.send({
        success: "uploaded!"
    })
})
