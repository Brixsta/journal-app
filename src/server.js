require("dotenv").config();

const express = require('express');
const app = express();
const db = require('./db/db_configuration');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(express());
app.use(bodyParser.json());


app.get('/api/journal', (req,res)=>{
    db.query('SELECT * FROM posts;', (err,data)=>{
        if(err) {
            console.log('THIS IS THE ERROR: ', err);
            res.append('Content-Type', 'plain/text');
            res.status(404).send('An error has occurred!');
        } else {
            res.append('Content-Type', 'application/json');
            res.json(data.rows);
        }
    });
});

app.post('/api/journal', (req,res)=>{
    let {content} = req.body;
    db.query("INSERT INTO posts (content) VALUES ($1);", [content], (err,data)=>{
        if(err) {
            res.append("Content-Type", "plain/text");
            res.status(400).send("An error has occurred!");
        } else {
            res.append("Content-Type", "plain/text")
            res.status(200).send('It Worked!');
        }
    })
})

app.put('/api/journal/:id', (req,res)=>{
    let {id} = req.params;
    let {content} = req.body;
    
    console.log(content)

    db.query('UPDATE posts SET content=$1 WHERE id=$2', [content,id], (err,data)=>{
        if(err) {
            res.append("Content-Type", "plain/text");
            res.status(400).send("An error occurred, nothing was updated");
        } else {
            res.append("Content-Type", "plain/text");
            res.status(200).send("Good Job it was changed!");
        }
    })
});

app.delete('/api/journal/:id', (req,res)=>{
    let {id} = req.params;

    db.query('DELETE FROM posts WHERE id=$1', [id], (err,data)=>{
        if(err) {
            res.append("Content-type", "plain/text");
            res.status(400).send('sorry an error has occurred!');
        } else {
            res.append('Content-type', 'plain/text');
            res.status(200).send("Congrats your post was deleted!")
        }
    })
})


app.listen(process.env.PORT, () => {
    console.log('listening on Port 9001');
});