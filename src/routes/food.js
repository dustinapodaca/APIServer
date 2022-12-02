'use strict';

const express = require('express');
// const { FoodModel } = require('../models/index.js');
const { foodInterface } = require('../models/index');

const router = express.Router();

const getFood = async (req, res, next) => {
  try {
    let allFood = await foodInterface.read();
    res.status(200).send(allFood);
  } catch (err) {
    next(err);
  }
};

const getOneFood = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let oneFood = await foodInterface.read(id);
    res.status(200).send(oneFood);
  } catch (err) {
    next(err);
  }
};

const createFood = async (req, res, next) => {
  try {
    let foodObject = req.body;
    let newFood = await foodInterface.create(foodObject);
    res.status(201).send(newFood);
  } catch (err) {
    next(err);
  }
};

const updateFood = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let foodObject = req.body;
    let updatedFood =
      await foodInterface.update(foodObject, id);
    res.status(200).send(updatedFood);
  } catch (err) {
    next(err);
  }
};

const deleteFood = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    await foodInterface.delete(id);
    res.status(204).send(null);
  } catch (err) {
    next(err);
  }
};

router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);

module.exports = router;
