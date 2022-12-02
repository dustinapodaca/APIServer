'use strict';

const express = require('express');
// const { ClothesModel } = require('../models/index.js');
const { clothesInterface } = require('../models/index');

const router = express.Router();

const getClothes = async (req, res, next) => {
  try {
    let allClothes = await clothesInterface.read();
    res.status(200).send(allClothes);
  } catch (err) {
    next(err);
  }
};

const getOneClothes = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let oneClothes = await clothesInterface.read(id);
    res.status(200).send(oneClothes);
  } catch (err) {
    next(err);
  }
};

const createClothes = async (req, res, next) => {
  try {
    let clothesObject = req.body;
    let newClothes = await clothesInterface.create(clothesObject);
    res.status(201).send(newClothes);
  } catch (err) {
    next(err);
  }
};

const updateClothes = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let clothesObject = req.body;
    let updatedClothes =
      await clothesInterface.update(clothesObject, id);
    res.status(200).send(updatedClothes);
  } catch (err) {
    next(err);
  }
};

const deleteClothes = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    await clothesInterface.delete(id);
    res.status(204).send(null);
  } catch (err) {
    next(err);
  }
};

router.get('/clothes', getClothes);
router.get('/clothes/:id', getOneClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', updateClothes);
router.delete('/clothes/:id', deleteClothes);

module.exports = router;
