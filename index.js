const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const port = 5000

app.use(cors())
app.use(bodyParser.json())


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pzmxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLL}`);
  const volunteerCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLL2}`);

  app.get('/volunteerWork',(req,res)=>{
    collection.find({})
    .toArray((error,document)=>{
      res.send(document)
      
    })
  })

  app.post('/addVolunteer',(req,res)=>{
      const volunteerDetails = req.body
      volunteerCollection.insertOne(volunteerDetails)
      .then(result=>{
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/registerVolunteer',(req,res)=>{
    volunteerCollection.find({email: req.query.email})
    .toArray((error,document)=>{
      res.send(document)
    })
  })

});



app.get('/', (req, res) => {
  res.send('I am a software engineer')
})
app.listen(5000)