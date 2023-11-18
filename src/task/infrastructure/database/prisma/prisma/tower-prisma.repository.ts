import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TaskRepository } from '@/task/domain/repositories/task.repository';
import { TaskModelMapper } from './model/task-model.mapper';
import { TaskEntity } from '@/task/domain/entities/task.entity';

export class TaskPrismaRepository implements TaskRepository.Repository {
  sortableFields: string[] = ['code', 'stage', 'group', 'name', 'createdAt'];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: TaskRepository.SearchParams,
  ): Promise<TaskRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.task.count({
      ...(props.filter && {
        where: {
          stage: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.task.findMany({
      ...(props.filter && {
        where: {
          stage: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    });

    return new TaskRepository.SearchResult({
      items: models.map(model => TaskModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: TaskEntity): Promise<void> {
    await this.prismaService.task.create({
      data: entity.toJSON(),
    });
  }

  async findById(id: string): Promise<TaskEntity> {
    return this._get(id);
  }

  async findAll(): Promise<TaskEntity[]> {
    const models = await this.prismaService.task.findMany();
    return models.map(model => {
      return TaskModelMapper.toEntity(model);
    });
  }

  async update(entity: TaskEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.task.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }

  protected async _get(id: string): Promise<TaskEntity> {
    try {
      const task = await this.prismaService.task.findUnique({
        where: { id },
      });
      return TaskModelMapper.toEntity(task);
    } catch (error) {
      throw new NotFoundError(`TaskModel not found ID ${id}`);
    }
  }
}
