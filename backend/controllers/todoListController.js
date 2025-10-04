import TodoList from '../models/TodoList.js';
import SocialMediaApp from '../models/SocialMediaApp.js';

async function createTodoList(req, res) {
  try {
    const appId = req.headers.authorization.split(' ')[1];

    if (!appId) {
      return res.status(400).json({ error: 'appId is required.' });
    }

    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: 'Task is required.' });
    }

    const socialMediaApp = await SocialMediaApp.findById(appId);
    if (!socialMediaApp) {
      return res.status(404).json({ error: 'Social media app not found.' });
    }

    let todoList = await TodoList.findOne({ app: appId });

    let newTask;
    if (todoList) {
      newTask = { task, completed: false };
      todoList.tasks.push(newTask);
      await todoList.save();

      // Get the newly added task by fetching the last item in the array
      newTask = todoList.tasks[todoList.tasks.length - 1];
    } else {
      newTask = { task, completed: false };
      todoList = new TodoList({
        app: appId,
        tasks: [newTask],
      });
      await todoList.save();

      socialMediaApp.todoLists.push(todoList._id);
      await socialMediaApp.save();

      // Since it's the first task, it will be at index 0
      newTask = todoList.tasks[0];
    }

    res.status(200).json({ message: 'Task added successfully', task: newTask });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: error.message });
  }

}

async function markTaskCompleted(req, res) {
  try {
    const { taskId } = req.params;

    const todoList = await TodoList.findOne({ 'tasks._id': taskId });
    if (!todoList) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = todoList.tasks.id(taskId);
    task.completed = !task.completed; // Toggle completed state
    await todoList.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;

    const todoList = await TodoList.findOne({ 'tasks._id': taskId });
    if (!todoList) {
      return res.status(404).json({ error: 'Task not found' });
    }

    todoList.tasks = todoList.tasks.filter((task) => task._id.toString() !== taskId);
    await todoList.save();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

async function getTodoListsByApp(req, res) {
  try {
    const todoLists = await TodoList.find({ app: req.params.appId });

    if (todoLists.length === 0) {
      return res.json([]);
    }

    res.json(todoLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createTodoList,
  markTaskCompleted,
  deleteTask,
  getTodoListsByApp,
};
