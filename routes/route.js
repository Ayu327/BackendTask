const express = require('express');
const router = express.Router()
const Task = require('../modals/Schema')
const {getTask,getSingleTask,createTasks,updateTasks,deleteTask,createMultipleTask,deleteMultipleTask} = require('../controllers/controller')





router.get("/tasks",getTask)

router.get("/tasks/:id",getSingleTask)

router.post("/tasks",createTasks)

router.patch("/tasks/:id",updateTasks)

router.delete("/tasks/:id",deleteTask)

router.post("/tasks/bulk",createMultipleTask)

router.delete("/tasks/bulk",deleteMultipleTask)






module.exports = router ;