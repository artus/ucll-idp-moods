const { CustomError } = require("./custom-error");

class Moods {
  constructor(collectionFactory) {
    this.collectionFactory = collectionFactory;
  }

  async add(name, description, score) {
    const collection = await this.collectionFactory();

    if (score === null || score === undefined || score < 0 || score > 5)  {
      throw new CustomError("Please add a score between 0 and 5. The better your mood, the higher the score.");
    }

    if (!name || name.trim().length === 0) {
      throw new CustomError("Please add your name.");
    }

    if (!description || description.trim().length === 0) {
      throw new CustomError("Please add a description.");
    }

    await collection.insertOne({
      name,
      description,
      score,
      timestamp: Date.now(),
    });
  }

  async get(name) {
    const collection = await this.collectionFactory();
    return collection.find({ name }).toArray();
  }

  async delete(name) {
    const collection = await this.collectionFactory();
    return collection.deleteMany({ name });
  }
}

module.exports = {
  Moods,
};