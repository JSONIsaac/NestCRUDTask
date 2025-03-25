import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>, // Cambia TaskRepository por Repository<Task>
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = this.tasksRepository.create(createTaskDto);
    task.user = user;
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.findOne(id);
    
    // Verificar si la tarea pertenece al usuario
    if (task.user && task.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this task');
    }
    
    this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<{message: string}> {
    const task = await this.findOne(id);
    
    // Verificar si la tarea pertenece al usuario
    if (task.user && task.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this task');
    }
    
    await this.tasksRepository.remove(task);
    return { message: `Task with ID ${id} deleted successfully` };
  }
}