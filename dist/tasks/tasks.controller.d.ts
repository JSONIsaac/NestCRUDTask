import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(createTaskDto: CreateTaskDto, req: any): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, req: any): Promise<Task>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
}
