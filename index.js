const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const PORT = 3000;

app.use(bodyparser.json())

let notes = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

app.get('/cloudnotes',(req,res)=>{
    res.send('This is the official cloud notes Project. You can get, add, update and delete notes here!');
})

//extrass

app.post('/notes',(req,res)=>{
    const {title,content}=req.body;
    const note = {id:notes.length+1,title,content};
    notes.push(note);
    res.status(201).json(note);
});


app.get('/notes',(req,res)=>{
    res.json(notes);
})



app.get('/notes/:id',(req,res)=>{
    const note =notes.find(n=>n.id === parseInt(req.params.id))
    if(!note) return res.status(404).send('Note not found');
    res.json(note);
})


app.put('/notes/:id',(req,res)=>{
    const note = notes.find(n=>n.id === parseInt(req.params.id));
    if(!note) return res.status(404).send('Note not found');
    note.title=req.body.title || note.title;
    note.content=req.body.content || note.content;
    res.json(note);
})

app.delete('/notes/:id',(req,res)=>{
    const index = notes.findIndex(n=>n.id === parseInt(req.params.id))
    if (index=== -1) return res.status(404).send('Note not found');
    notes.splice(index, 1);
    res.status(204).send();
})

app.listen(PORT, ()=>console.log(`server running on http://localhost:${PORT}`))