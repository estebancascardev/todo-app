import User from '../../models/user.js';
import Todo from '../../models/todos.js';

export const todosController = async (_req, res) => {
    const user = _req.user;
    const todos = await Todo.find({user: user.id});
    return res.status(200).json(todos);  
}

export const createTodoController = async (_req, res) => {
    const user = _req.user;
    const {text} = _req.body;
    const newTodo = new Todo({ 
        text,
        checked: false,
        user: user._id
    });
    const savedTodo = await newTodo.save();
    user.todos = user.todos.concat(savedTodo._id);
    await user.save();

    return res.status(201).json(savedTodo);
}

export const deleteTodoController = async (_req, res) => {
    const user = _req.user;
    await Todo.findByIdAndDelete(_req.params.id);
    user.todos = user.todos.filter(todoId => todoId.toString() !== _req.params.id);
    await user.save();
    return res.sendStatus(204);
}

export const patchTodoController = async (_req, res) => {
    const user = _req.user;
    const {checked} = _req.body;
    await Todo.findByIdAndUpdate(_req.params.id, {checked});
    return res.sendStatus(200);
}

