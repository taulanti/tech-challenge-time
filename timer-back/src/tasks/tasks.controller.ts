import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './model/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../user/model/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @HttpCode(200)
  @Get('/week')
  getTasksByWeek(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasksByWeek(user);
  }

  @HttpCode(200)
  @Get('/month')
  getTasksByMonth(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasksByMonth(user);
  }

  @HttpCode(200)
  @Get('/day')
  async getTasksByDay(@GetUser() user: User): Promise<Task[]> {
    const result = await this.tasksService.getTasksByDay(user);
    return result;
  }

  @HttpCode(200)
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @HttpCode(200)
  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @HttpCode(200)
  @Get()
  getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(user);
  }

}
