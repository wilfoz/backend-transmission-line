import { TaskOutput } from '@/task/application/dto/task-output';
import { TaskController } from '../task.controller';
import { CreateTaskUseCase } from '@/task/application/usecases/create-task.usecase';
import { CreateTaskDto } from '../dto/create-task.dto';
import {
  TaskPresenter,
  TasksCollectionPresenter,
} from '../presenters/task.presenter';
import { UpdateTaskUseCase } from '@/task/application/usecases/update-task.usecase';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { GetTaskUseCase } from '@/task/application/usecases/get-taks.usecase';
import { ListTasksUseCase } from '@/task/application/usecases/list-task.usecase';

describe('TaskController Unit Tests', () => {
  let sut: TaskController;
  let id: string;
  let props: TaskOutput;

  beforeEach(async () => {
    sut = new TaskController();
    id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      code: 1,
      stage: 'MONTAGEM',
      group: 'TOPOGRAFIA',
      name: 'Locação de torre',
      unit: 'torre',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a task', async () => {
    const output: CreateTaskUseCase.Output = props;
    const mockCreateTaskUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createTaskUseCase'] = mockCreateTaskUseCase as any;
    const input: CreateTaskDto = {
      code: 1,
      stage: 'MONTAGEM',
      group: 'TOPOGRAFIA',
      name: 'Locação de torre',
      unit: 'torre',
    };
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(TaskPresenter);
    expect(presenter).toStrictEqual(new TaskPresenter(output));
    expect(mockCreateTaskUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a task', async () => {
    const output: UpdateTaskUseCase.Output = props;
    const mockUpdateTaskUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateTaskUseCase'] = mockUpdateTaskUseCase as any;
    const input: UpdateTaskDto = {
      code: 1,
      stage: 'MONTAGEM',
      group: 'TOPOGRAFIA',
      name: 'Locação de torre',
      unit: 'torre',
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(TaskPresenter);
    expect(presenter).toStrictEqual(new TaskPresenter(output));
    expect(mockUpdateTaskUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should gets a task', async () => {
    const output: GetTaskUseCase.Output = props;
    const mockGetTaskUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getTaskUseCase'] = mockGetTaskUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(TaskPresenter);
    expect(presenter).toStrictEqual(new TaskPresenter(output));
    expect(mockGetTaskUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a task', async () => {
    const output = undefined;
    const mockDeleteTaskUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteTaskUseCase'] = mockDeleteTaskUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteTaskUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a tasks', async () => {
    const output: ListTasksUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListTasksUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listTasksUseCase'] = mockListTasksUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(TasksCollectionPresenter);
    expect(presenter).toEqual(new TasksCollectionPresenter(output));
    expect(mockListTasksUseCase.execute).toHaveBeenCalledWith(searchParams);
  });
});
