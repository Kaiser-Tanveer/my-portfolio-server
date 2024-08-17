const express = require("express");
const routes = express.Router();

// ----- Project Routes ----- //
routes.get('/', async (req, res) => {
    const query = {};
    const projects = await projectsCollection.find(query).toArray();
    res.send(projects);
})

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await projectsCollection.find(filter).toArray();
    res.send(result);
})