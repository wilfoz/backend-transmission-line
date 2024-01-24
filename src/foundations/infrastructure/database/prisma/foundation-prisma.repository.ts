import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FoundationRepository } from '../../../domain/repositories/foundation.repository';
import { FoundationModelMapper } from './model/foundation-model.mapper';
import { FoundationEntity } from '../../../domain/entities/foundation.entity';

export class FoundationPrismaRepository
  implements FoundationRepository.Repository {
  sortableFields: string[] = [
    'project',
    'revision',
    'description',
    'createdAt',
  ];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: FoundationRepository.SearchParams,
  ): Promise<FoundationRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.foundation.count({
      ...(props.filter && {
        where: {
          description: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.foundation.findMany({
      ...(props.filter && {
        where: {
          description: {
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

    return new FoundationRepository.SearchResult({
      items: models.map(model => FoundationModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: FoundationEntity): Promise<void> {
    await this.prismaService.foundation.create({
      data: entity.toJSON(),
    });
  }

  async findById(id: string): Promise<FoundationEntity> {
    return this._get(id);
  }

  async findAll(): Promise<FoundationEntity[]> {
    const models = await this.prismaService.foundation.findMany();
    return models.map(model => {
      return FoundationModelMapper.toEntity(model);
    });
  }

  async update(entity: FoundationEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.foundation.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.foundation.delete({
      where: {
        id,
      },
    });
  }

  protected async _get(id: string): Promise<FoundationEntity> {
    try {
      const foundation = await this.prismaService.foundation.findUnique({
        where: { id },
      });
      return FoundationModelMapper.toEntity(foundation);
    } catch (error) {
      throw new NotFoundError(`FoundationModel not found ID ${id}`);
    }
  }
}
