import express from 'express';
import {
  createTodoList,
  markTaskCompleted,
  deleteTask,
  getTodoListsByApp,
} from '../controllers/todoListController.js';

const router = express.Router();

router.get('/todoList/:appId', getTodoListsByApp);

router.put('/todoList', createTodoList);

router.put('/toggle/:taskId', markTaskCompleted);

router.delete('/delete/:taskId', deleteTask);


export default router;
