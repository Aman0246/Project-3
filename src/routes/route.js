const express = require('express')
const router = express.Router()
const {createCollegeDoc} = require('../controllers/collegeController')
const {createIntern,getIntern} = require('../controllers/internController')

router.post('/functionup/colleges', createCollegeDoc )

router.post('/functionup/interns',createIntern )

router.get('/functionup/collegeDetails',getIntern )

module.exports = router