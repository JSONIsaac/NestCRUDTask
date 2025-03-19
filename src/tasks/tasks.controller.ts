import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService){}
    
    @Get()
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Post()
    cretae(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskService.create(createTaskDto);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.taskService.remove(id);
    }
}
