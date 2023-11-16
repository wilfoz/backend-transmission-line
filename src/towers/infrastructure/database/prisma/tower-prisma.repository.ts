import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { TowerModelMapper } from './model/tower-model.mapper';

export class TowerPrismaRepository implements TowerRepository.Repository {
  sortableFields: string[] = ['type', 'createdAT'];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: TowerRepository.SearchParams,
  ): Promise<TowerRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.tower.count({
      ...(props.filter && {
        where: {
          type: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.tower.findMany({
      ...(props.filter && {
        where: {
          type: {
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

    return new TowerRepository.SearchResult({
      items: models.map(model => TowerModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: TowerEntity): Promise<void> {
    await this.prismaService.tower.create({
      data: entity.toJSON(),
    });
  }

  async findById(id: string): Promise<TowerEntity> {
    return this._get(id);
  }

  async findAll(): Promise<TowerEntity[]> {
    const models = await this.prismaService.tower.findMany();
    return models.map(model => {
      return TowerModelMapper.toEntity(model);
    });
  }

  async update(entity: TowerEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.tower.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.tower.delete({
      where: {
        id,
      },
    });
  }

  protected async _get(id: string): Promise<TowerEntity> {
    try {
      const tower = await this.prismaService.tower.findUnique({
        where: { id },
      });
      return TowerModelMapper.toEntity(tower);
    } catch (error) {
      throw new NotFoundError(`TowerModel not found ID ${id}`);
    }
  }
}
