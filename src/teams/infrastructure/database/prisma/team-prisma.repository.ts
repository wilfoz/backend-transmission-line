import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import { TeamModelMapper } from './model/team-model.mapper';
import { TeamEntity } from '@/teams/domain/entities/team.entity';

export class TeamPrismaRepository implements TeamRepository.Repository {
  sortableFields: string[] = ['name', 'createdAT'];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: TeamRepository.SearchParams,
  ): Promise<TeamRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.team.count({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.team.findMany({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
        include: {
          employees: true,
          equipments: true,
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    });
    return new TeamRepository.SearchResult({
      items: models.map(model => TeamModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: TeamEntity): Promise<void> {
    const { id, name, createdAt } = entity.toJSON();
    await this.prismaService.team.create({
      data: {
        id,
        name,
        createdAt,
      },
    });
  }

  async findById(id: string): Promise<TeamEntity> {
    return this._get(id);
  }

  async findAll(): Promise<TeamEntity[]> {
    const models = await this.prismaService.team.findMany({
      include: {
        employees: true,
        equipments: true,
      },
    });
    return models.map(model => {
      return TeamModelMapper.toEntity(model);
    });
  }

  async update(entity: TeamEntity): Promise<void> {
    await this._get(entity._id);
    const { employees, equipments, ...others } = entity.toJSON();
    await this.prismaService.team.update({
      data: {
        ...others,
      },
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.team.delete({
      where: {
        id,
      },
    });
  }

  protected async _get(id: string): Promise<TeamEntity> {
    try {
      const team = await this.prismaService.team.findUnique({
        where: { id },
        include: {
          equipments: true,
          employees: true,
        },
      });
      return TeamModelMapper.toEntity(team);
    } catch (error) {
      throw new NotFoundError(`TeamModel not found ID ${id}`);
    }
  }
}
