const Task = require('../models/Task');
import sequelize from '../utils/db';

export const getAllTasks = async () => {
  try {
    const tasks = await Task.findAll({
      order: [
        ['order', 'ASC'],
        ['id', 'ASC']
      ]
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (name: string) => {
  try {
    const minOrderTask = await Task.findOne({
      attributes: [[sequelize.fn('MIN', sequelize.col('order')), 'minOrder']],
    });

    const minOrder = minOrderTask?.get('minOrder') as number || 0;

    const newTask = await Task.create({
      name,
      order: minOrder - 1,
    });

    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};


export const toggleTaskCompletion = async (id: number): Promise<any> => {
  const task = await Task.findByPk(id);

  if (!task) {
    throw new Error('Task not found');
  }

  const updatedTask = await task.update({
    iscompleted: !task.iscompleted,
  });

  return updatedTask;
};

export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    const task = await Task.findOne({ where: { id } });

    if (!task) {
      throw new Error('Task not found');
    }

    await task.destroy();
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Error deleting task');
  }
};

export const updateTaskOrder = async (orderedTasks: { id: number; order: number; name: string }[]): Promise<boolean> => {
  try {
    for (const task of orderedTasks) {
      const existingTask = await Task.findOne({ where: { id: task.id } });

      if (!existingTask) {
        throw new Error(`Task with id ${task.id} not found`);
      }

      existingTask.order = task.order;
      await existingTask.save();
    }
    
    return true;
  } catch (error) {
    console.error('Error updating task order:', error);
    throw new Error('Error updating task order');
  }
};




