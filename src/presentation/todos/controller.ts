import { Request, Response } from "express"
const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy juice', completedAt: new Date() }
]
export class TodosController {
    //* DI
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id
        const todo = todos.find(todo => todo.id === id)
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        return res.json(todo)
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) return res.status(400).json({ message: 'Text is required' })
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }
        todos.push(newTodo)
        return res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

        const todo = todos.find(todo => todo.id === id)
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        const { text, completedAt } = req.body
        // if (!text) return res.status(400).json({ message: 'Text is required' })

        todo.text = text || todo.text
        if (completedAt === null)
            todo.completedAt = null
        else todo.completedAt = new Date(completedAt || todo.completedAt)
        //! Ojo, Referencia

        // todos.forEach((todo, index) => {
        //     if(todo.id === id){
        //         todos[index] = todo
        //     }
        // })

        res.json(todo)
    }
    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
        const todo = todos.find(todo => todo.id === id)
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        todos.splice(todos.indexOf(todo), 1)
        res.json({ todo, message: 'Todo deleted successfully' })
    }
} 