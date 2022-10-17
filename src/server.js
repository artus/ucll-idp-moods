const express = require("express");
const { MongoClient } = require("mongodb");
const { Moods } = require("./mood");

const mongoConnectionString =
  process.env.MONGO_CONNECTION_STRING || "mongodb://mongo:27017";
const port = process.env.PORT || 8080;

const mongoDbName = "mood";
let collection;

async function getCollection() {
  if (!collection) {
    const client = new MongoClient(mongoConnectionString);
    await client.connect();
    const db = client.db(mongoDbName);
    collection = db.collection("documents");
  }
  return collection;
}

const moods = new Moods(getCollection);

// App
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/moods/:name", async (req, res) => {
  try {
    const { description, score } = req.body;
    const { name } = req.params;
    await moods.add(name, description, score);
    const allMoods = await moods.get(name);
    res.status(201).json(allMoods);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
});

app.get("/moods/:name", async (req, res) => {
  try {
    const allMoods = await moods.get(req.params.name);
    res.status(200).json(allMoods);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
});

app.delete("/moods/:name", async (req, res) => {
  try {
    const {
      name
    } = req.params;
      await moods.delete(name);
      const allMoods = await moods.get(name)
      res.status(201).json(allMoods);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message
    });
  }
})

app.get('/ping', (req, res) => {
  res.send("ok");
})

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

