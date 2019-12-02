import { Repository, EntityRepository, LessThanOrEqual, MoreThanOrEqual, Equal, MoreThan } from "typeorm";
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

  async getTasks(user: User): Promise<Task[]> {
    const found = await Task.find({ where: { user: user  } });
    if (!found) {
      throw new NotFoundException(`No tasks found`);
    }
    return found;
  }

  async getTasksByWeek(user: User): Promise<Task[]> {
    const today = new Date();
    const day = today.getDay();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (day == 0 ? -6 : 1) - day);

    const found = await Task.find({
      where: {
        user: user, date: LessThanOrEqual(today)
          && MoreThanOrEqual(startDate)
      }
    });
    if (!found) {
      throw new NotFoundException(`No tasks found`);
    }
    return found;
  }

  async getTasksByMonth(user: User): Promise<Task[]> {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);

    const found = await Task.find({
      where: {
        user: user, date: LessThanOrEqual(today)
          && MoreThanOrEqual(startDate)
      }
    });
    if (!found) {
      throw new NotFoundException(`No tasks found`);
    }
    return found;
  }

  async getTasksByDay(user: User): Promise<Task[]> {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate()-1));
    const found = await Task.find({
      where: {
        user: user , date: MoreThan(yesterday)
      }
    });
    if (!found) {
      throw new NotFoundException(`No tasks found`);
    }
    return found;
  }

}