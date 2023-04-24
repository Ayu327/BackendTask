const Task = require('../modals/Schema')
const mongoose = require('mongoose')

const getTask =async(req,res)=>{
    try{
        const workouts = await Task.find({})
        res.status(200).json(workouts)
    }catch(err){
        res.status(400).json({err:err.message})
    }
}




  const getSingleTask = async(req,res)=>{
    const {id} = req.params
    try{
        const workout = await Task.findById(id)
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({err:err.message})
    }
  }




  const createTasks = async(req,res)=>{
    try {
        const task = new Task({
          title: req.body.title,
          completed: false
        });
        await task.save();
        res.status(201).json(task);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  }

 


  const updateTasks = async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        task.title = req.body.title || task.title;
        task.completed = req.body.completed || task.completed;
        await task.save();
        res.json(task);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  }



  const deleteTask = async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  }



  const createMultipleTask = async(req,res)=>{
    try {
        const tasks = req.body.map((data) => ({
          title: data.title,
          completed: false
        }));
        const createdTasks = await Task.insertMany(tasks);
        res.status(201).json(createdTasks);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  }



  const deleteMultipleTask = async(req,res)=>{
    try {
        const ids = req.body.map((id) => mongoose.Types.ObjectId(id));
        const deletedTasks = await Task.deleteMany({ _id: { $in: ids } });
        if (deletedTasks.deletedCount === 0) {
          return res.status(404).json({ error: 'Tasks not found' });
        }
        res.json({ message: 'Tasks deleted successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  }
 // Delete multiple tasks



  
  module.exports = {getTask,getSingleTask,createTasks,updateTasks,deleteTask,createMultipleTask,deleteMultipleTask}