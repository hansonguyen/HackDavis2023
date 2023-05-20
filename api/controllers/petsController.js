const Pet = require('../models/petModel')
const mongoose = require('mongoose')

// GET all
const getPets = async (req, res) => {
    const pets = await Pet.find({}).sort({createdAt: -1})
    res.status(200).json(pets)
}

// GET 1
const getSinglePet = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such pet" })
    }

    const pet = await Pet.findById(id)
    if (!pet) {
        return res.status(404).json({ error: "No such pet" })
    }
    res.status(200).json(pet)
}

// POST new
const createPet = async (req, res) => {
    const { name, description, species, breed, age, owner, location, availability, images } = req.body

    try {
        const pet = await Pet.create({ name, description, species, breed, age, owner, location, availability, images })
        res.status(200).json(pet)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE 1
const deletePet = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such pet" })
    }

    const pet = await Pet.findOneAndDelete({ _id: id })
    if (!pet) {
        return res.status(404).json({ error: "No such pet" })
    }
    res.status(200).json(pet)
}

// PATCH 1
const updatePet = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such pet" })
    }

    const pet = await Pet.findOneAndUpdate(
        { _id: id }, 
        { ...req.body }, 
        { returnOriginal: false }
    )
    if (!pet) {
        return res.status(404).json({ error: "No such pet" })
    }
    res.status(200).json(pet)
}

module.exports = {
    createPet,
    getPets,
    getSinglePet,
    deletePet,
    updatePet
}