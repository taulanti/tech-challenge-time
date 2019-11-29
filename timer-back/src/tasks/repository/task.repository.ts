import { Repository, EntityRepository } from "typeorm";
import { Task } from "../model/task.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { NotFoundException } from "@nestjs/common";
import { User } from "src/user/model/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
    ): Promise<Task> {
    const { title, project, duration } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.project = project;
    task.duration = duration;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await Task.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await Task.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}