const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = () => {
    try {
        const projectsCollection = client.db("Portfolio").collection("projects");

        app.get('/projects', async (req, res) => {
            const query = {};
            const projects = await projectsCollection.find(query).toArray();
            res.send(projects);
        })

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await projectsCollection.find(filter).toArray();
            res.send(result);
        })
    }
    finally {

    }
}
run()


app.get('/', (req, res) => {
    res.send('Portfolio server is running');
});

app.listen(port, (req, res) => {
    console.log('Server is on ', port);
})