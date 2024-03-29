const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({status: 500, error: err});
      });
  });

  router.post("/", (req, res) => {
    const newData = req.body;
    collection.insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection.deleteOne({_id: ObjectID(id)})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });

  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    collection.findOneAndUpdate(
    {_id: ObjectID(id)},
    {$set: updateData},
    {returnOriginal: false}
    )
  .then((result) => {
    res.json(result.value)
    })
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({status: 500, error: err});
    });
  });

  return router;

};

module.exports = createRouter;
