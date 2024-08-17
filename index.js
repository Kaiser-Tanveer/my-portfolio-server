const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 
});

async function run() {
    try {
        await client.connect();
        const projectsCollection = client.db("portfolioKT").collection("projects");

        app.get('/projects', async (req, res) => {
            const query = {};
            const allProjects = await projectsCollection.find(query).toArray();
            res.send(allProjects);  // Send the actual data as JSON
        });

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await projectsCollection.findOne(filter);
            res.json(result);  // Send the specific project as JSON
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).send("Internal Server Error");
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("KAISER TANVEER'S Portfolio server is running...");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
