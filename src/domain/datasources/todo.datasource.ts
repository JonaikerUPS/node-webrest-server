import { CreateTodoDto } from "../dtos/index.js";
import { TodoEntity } from "../entities/todo.entity.js";



export abstract class TodoDatasource {

    abstract create( createTodoDto: CreateTodoDto): Promise<TodoEntity>
    abstract getAll() : Promise<TodoEntity[]>
    abstract getById(id: number) : Promise<TodoEntity>
    abstract update( updateTodoDto: CreateTodoDto) : Promise<TodoEntity>
    abstract delete( id: number) : Promise<TodoEntity>


}
