import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly taskService;
    constructor(taskService: TasksService);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    cretae(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
