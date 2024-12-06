import client from '../utils/db';
import pool from '../utils/db';

export const getAllTasks = async () => {
  try {
    const result = await client.query('SELECT * FROM tasks ORDER BY "order" ASC, id ASC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (name: string) => {
  try {
    const minOrderResult = await client.query('SELECT MIN("order") as minOrder FROM tasks');
    const minOrder = minOrderResult.rows[0]?.minorder || 0;

    const result = await client.query(
      'INSERT INTO tasks (name, "order") VALUES ($1, $2) RETURNING *',
      [name, minOrder - 1]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};


export const toggleTaskCompletion = async (id: number) => {
    const result = await pool.query('SELECT iscompleted FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        throw new Error('Task not found');
    }
  
    const currentStatus = result.rows[0].iscompleted;
    const newStatus = !currentStatus;
  
    await pool.query('UPDATE tasks SET iscompleted = $1 WHERE id = $2', [newStatus, id]);
  
    const updatedTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return updatedTask.rows[0];
};

export const deleteTask = async (id: number): Promise<boolean> => {
    try {
      const result = await client.query('DELETE FROM tasks WHERE id = $1', [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Error deleting task');
    }
};

export const updateTaskOrder = async (orderedTasks: { id: number; order: number }[]) => {
  try {
    const query = `
      UPDATE tasks
      SET "order" = CASE id
        ${orderedTasks.map(task => `WHEN ${task.id} THEN ${task.order}`).join(' ')}
      END
      WHERE id IN (${orderedTasks.map(task => task.id).join(', ')});
    `;
    await client.query(query);
  } catch (error) {
    console.error('Error updating task order:', error);
    throw new Error('Error updating task order');
  }
};