const express = require('express')
const {
    createPet,
    getPets,
    getSinglePet,
    deletePet,
    updatePet
} = require('../controllers/petsController')

const router = express.Router()

router.get('/', getPets)

router.get('/:id', getSinglePet)

router.post('/', createPet)

router.delete('/:id', deletePet)

router.patch('/:id', updatePet)

module.exports = router