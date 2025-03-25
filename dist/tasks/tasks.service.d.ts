import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../users/users.service';
export declare class TasksService {
    private tasksRepository;
    private usersService;
    constructor(tasksRepository: Repository<Task>, usersService: UsersService);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(createTaskDto: CreateTaskDto, userId: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task>;
    remove(id: number, userId: number): Promise<{
        message: string;
    }>;
}
