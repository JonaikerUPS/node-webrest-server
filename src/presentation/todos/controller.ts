import { Request, Response } from "express"
import { prisma } from "../../data/postgres/index.js"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js"




export class TodosController {
    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        return res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
        if (!todo) return res.status(404).json({ message: 'Todo not found' })
        return res.json(todo)
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ error })
        const todo = await prisma.todo.create({
            data: {
                text: createTodoDto!.text
            }
        })
        return res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create(req.body)
        if (error) return res.status(400).json({ error })

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDto!.values
        })
        res.json(updatedTodo)
    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
        const deletedTodo = await prisma.todo.delete({
            where: {
                id: id
            }
        })
        return res.json({ todo, deletedTodo, message: 'Todo deleted successfully' })
    }
}  