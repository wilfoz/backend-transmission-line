import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { CreateTaskUseCase } from '../application/usecases/create-task.usecase';
import { UpdateTaskUseCase } from '../application/usecases/update-task.usecase';
import { GetTaskUseCase } from '../application/usecases/get-taks.usecase';
import { ListTasksUseCase } from '../application/usecases/list-task.usecase';
import { DeleteTaskUseCase } from '../application/usecases/delete-task.usecase';
import { TaskOutput } from '../application/dto/task-output';
import {
  TaskPresenter,
  TasksCollectionPresenter,
} from './presenters/task.presenter';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  @Inject(CreateTaskUseCase.UseCase)
  private createTaskUseCase: CreateTaskUseCase.UseCase;

  @Inject(UpdateTaskUseCase.UseCase)
  private updateTaskUseCase: UpdateTaskUseCase.UseCase;

  @Inject(GetTaskUseCase.UseCase)
  private getTaskUseCase: GetTaskUseCase.UseCase;

  @Inject(ListTasksUseCase.UseCase)
  private listTasksUseCase: ListTasksUseCase.UseCase;

  @Inject(DeleteTaskUseCase.UseCase)
  private deleteTaskUseCase: DeleteTaskUseCase.UseCase;

  static taskToResponse(output: TaskOutput) {
    return new TaskPresenter(output);
  }

  static listTasksToResponse(output: ListTasksUseCase.Output) {
    return new TasksCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const output = await this.createTaskUseCase.execute(createTaskDto);
    return TaskController.taskToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListTaskDto) {
    const output = await this.listTasksUseCase.execute(searchParams);
    return TaskController.listTasksToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getTaskUseCase.execute({ id });
    return TaskController.taskToResponse(output);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const output = await this.updateTaskUseCase.execute({
      id,
      ...updateTaskDto,
    });
    return TaskController.taskToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteTaskUseCase.execute({ id });
  }
}
