import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { TaskPrismaRepository } from './database/prisma/prisma/tower-prisma.repository';
import { CreateTaskUseCase } from '../application/usecases/create-task.usecase';
import { TaskRepository } from '../domain/repositories/task.repository';
import { GetTaskUseCase } from '../application/usecases/get-taks.usecase';
import { UpdateTaskUseCase } from '../application/usecases/update-task.usecase';
import { ListTasksUseCase } from '../application/usecases/list-task.usecase';
import { DeleteTaskUseCase } from '../application/usecases/delete-task.usecase';

@Module({
  controllers: [TaskController],
  providers: [
    // {
    //   provide: 'TaskRepository',
    //   useClass: TaskInMemoryRepository,
    // },
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'TaskRepository',
      useFactory: (prismaService: PrismaService) => {
        return new TaskPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateTaskUseCase.UseCase,
      useFactory: (taskRepository: TaskRepository.Repository) => {
        return new CreateTaskUseCase.UseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: GetTaskUseCase.UseCase,
      useFactory: (taskRepository: TaskRepository.Repository) => {
        return new GetTaskUseCase.UseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: UpdateTaskUseCase.UseCase,
      useFactory: (taskRepository: TaskRepository.Repository) => {
        return new UpdateTaskUseCase.UseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: ListTasksUseCase.UseCase,
      useFactory: (taskRepository: TaskRepository.Repository) => {
        return new ListTasksUseCase.UseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: DeleteTaskUseCase.UseCase,
      useFactory: (taskRepository: TaskRepository.Repository) => {
        return new DeleteTaskUseCase.UseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
  ],
})
export class TaskModule { }
