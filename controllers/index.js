const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const awesomeFunction = (req, res, next) => {
  res.json("Awesome Name!");
};

const tooeleTechFunction = (req, res, next) => {
  res.json("Tooele Tech is Awesome!");
};

const getAllStudents = async (req, res) => {
  console.log("e");
  try {
    const result = await mongodb.getDB().db().collection("students").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Typee", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET single student
const getSingleStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDB()
      .db()
      .collection("students")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// CREATE contact
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDB()
      .db()
      .collection("students")
      .insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while creating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update student
const updateStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occureed while updating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete student
const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDB()
      .db()
      .collection("students")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.acknowledged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  awesomeFunction,
  tooeleTechFunction,
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
