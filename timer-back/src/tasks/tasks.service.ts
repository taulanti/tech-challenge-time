import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './model/task.entity';
import { TaskRepository } from './repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/model/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }


  deleteTaskById(id: number): Promise<void> {
    return this.taskRepository.deleteTaskById(id);
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
}
