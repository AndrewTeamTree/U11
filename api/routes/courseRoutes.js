'use strict'
const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authUser')
const { User, Course } = require('../models')
const { check, validationResult } = require('express-validator')

// POST /api/courses (Create a new course)
router.post('/courses', authUser, [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      materialsNeeded: req.body.materialsNeeded,
      estimatedTime: req.body.estimatedTime,
      userId: req.currentUser.id
    })
    res.status(201).location(`/courses/${course.id}`).end()
  } catch (error) {
    console.error('Error creating course:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// GET /api/courses route
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: User,
      }
    })

    res.status(200).json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})


// GET /api/courses/:id route
router.get('/courses/:id', async (req, res) => {
  const courseId = req.params.id
  try {
    const course = await Course.findByPk(courseId, {
      include: {
        model: User,
      }
    })
    if (course) {
      res.json(course)
    } else {
      res.status(404).json({ error: 'Course not found' })
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})



// PUT /api/courses/:id (Update an existing course)
router.put('/courses/:id', authUser, [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const course = await Course.findByPk(req.params.id)
    if (course) {
      if (course.userId !== req.currentUser.id) {
        return res.status(403).json({ message: 'You are not authorized to update this course' })
      }

      await course.update(req.body)
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    console.error('Error updating course:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// DELETE /api/courses/:id route
router.delete('/courses/:id', authUser, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (course) {
      await course.destroy()
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    console.error('Error deleting course:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
