import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newTask = await taskService.createTask(name);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const toggleTaskCompletion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTask = await taskService.toggleTaskCompletion(Number(id));
    res.status(200).json(updatedTask);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage === 'Task not found') {
      res.status(404).json({ error: errorMessage });
    } else {
      console.error('Error toggling task completion:', error);
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await taskService.deleteTask(Number(id));
    if (result) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTaskOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderedTasks = req.body.orderedTasks;

    if (!Array.isArray(orderedTasks)) {
      res.status(400).json({ message: 'orderedTasks should be an array' });
      return;
    }

    await taskService.updateTaskOrder(orderedTasks);
    
    res.status(200).json({ message: 'Task order updated successfully' });
  } catch (error) {
    console.error('Error updating task order:', error);
    res.status(500).json({ message: 'Error updating task order' });
  }
};
