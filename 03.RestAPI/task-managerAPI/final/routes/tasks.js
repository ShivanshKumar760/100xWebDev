const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)//chaining route-method which points to the same endpoint
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
