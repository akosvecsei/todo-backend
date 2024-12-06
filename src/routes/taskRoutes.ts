import express from 'express';
import { getTasks, addTask, toggleTaskCompletion, deleteTask, updateTaskOrder } from '../controllers/taskController';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/task', addTask);

router.patch('/task/:id/toggle', toggleTaskCompletion);
router.put('/tasks/order', updateTaskOrder);

router.delete('/task/:id', deleteTask);

export default router;
