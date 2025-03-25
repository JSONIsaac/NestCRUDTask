"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const users_service_1 = require("../users/users.service");
let TasksService = class TasksService {
    tasksRepository;
    usersService;
    constructor(tasksRepository, usersService) {
        this.tasksRepository = tasksRepository;
        this.usersService = usersService;
    }
    findAll() {
        return this.tasksRepository.find({ relations: ['user'] });
    }
    async findOne(id) {
        const task = await this.tasksRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async create(createTaskDto, userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const task = this.tasksRepository.create(createTaskDto);
        task.user = user;
        return this.tasksRepository.save(task);
    }
    async update(id, updateTaskDto, userId) {
        const task = await this.findOne(id);
        if (task.user && task.user.id !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to update this task');
        }
        this.tasksRepository.merge(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }
    async remove(id, userId) {
        const task = await this.findOne(id);
        if (task.user && task.user.id !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this task');
        }
        await this.tasksRepository.remove(task);
        return { message: `Task with ID ${id} deleted successfully` };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map