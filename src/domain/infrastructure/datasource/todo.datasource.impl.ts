import { TodoDatasource, CreateTodoDto, TodoEntity } from "../../index.js"

export class TodoDatasourceImpl implements TodoDatasource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<TodoEntity[]> {
        throw new Error("Method not implemented.");
    }
    async getById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async update(updateTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }


} 