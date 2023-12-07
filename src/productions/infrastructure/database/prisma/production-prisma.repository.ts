import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { ProductionRepository } from '../../../domain/repositories/production.repository';
import { ProductionModelMapper } from './model/production-model.mapper';
import { ProductionEntity } from '../../../domain/entities/production.entity';
import { STATUS_PRODUCTION } from '@prisma/client';

export class ProductionPrismaRepository
  implements ProductionRepository.Repository {
  sortableFields: string[] = ['status', 'comments', 'createdAT'];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: ProductionRepository.SearchParams,
  ): Promise<ProductionRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.production.count({
      ...(props.filter && {
        where: {
          comments: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.production.findMany({
      ...(props.filter && {
        where: {
          comments: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
      include: {
        teams: true,
        towers: true,
      },
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    });
    return new ProductionRepository.SearchResult({
      items: models.map(model => ProductionModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: ProductionEntity): Promise<void> {
    const { teams, towers, taskId, ...others } = entity.toJSON();
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    const teamsData = await Promise.all(
      teams.map(teamId => {
        return this.prismaService.team.findUnique({
          where: {
            id: teamId,
          },
        });
      }),
    );

    const towersData = await Promise.all(
      towers.map(towerId => {
        return this.prismaService.tower.findUnique({
          where: {
            id: towerId,
          },
        });
      }),
    );

    const productionInput = {
      ...others,
      status: others.status as STATUS_PRODUCTION,
      task: { connect: { id: task.id } },
      teams: { connect: teamsData.map(team => ({ id: team.id })) },
      towers: { connect: towersData.map(tower => ({ id: tower.id })) },
    };

    await this.prismaService.production.create({
      data: productionInput,
      include: {
        teams: true,
        towers: true,
        task: true,
      },
    });
  }

  async findById(id: string): Promise<ProductionEntity> {
    return this._get(id);
  }

  async findAll(): Promise<ProductionEntity[]> {
    const models = await this.prismaService.production.findMany({
      include: {
        teams: true,
        towers: true,
        task: true,
      },
    });
    return models.map(model => {
      return ProductionModelMapper.toEntity(model);
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.production.delete({
      where: {
        id,
      },
    });
  }

  async update(entity: ProductionEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.production.update({
      data: {
        status: entity.status as STATUS_PRODUCTION,
        comments: entity.comments,
        startTime: entity.startTime,
        finalTime: entity.finalTime,
      },
      where: {
        id: entity._id,
      },
    });
  }

  // async includeAndUpdateResource(entity: TeamEntity): Promise<void> {
  //   const { employees, equipments } = await this._getResources(entity);
  //   const employeeIds = employees
  //     .filter(emp => emp !== null)
  //     .map(emp => ({ id: emp }));

  //   const equipmentIds = equipments
  //     .filter(eq => eq !== null)
  //     .map(eq => ({ id: eq }));

  //   await this.prismaService.team.update({
  //     data: {
  //       name: entity.name,
  //       createdAt: entity.createdAt,
  //       employees: {
  //         connect: employeeIds,
  //       },
  //       equipments: {
  //         connect: equipmentIds,
  //       },
  //     },
  //     where: {
  //       id: entity._id,
  //     },
  //   });
  // }

  // async removeAndUpdateResource(entity: TeamEntity): Promise<void> {
  //   const { employees, equipments } = await this._getResources(entity);

  //   const employeeIds = employees
  //     .filter(emp => emp !== null)
  //     .map(emp => ({ id: emp }));

  //   const equipmentIds = equipments
  //     .filter(eq => eq !== null)
  //     .map(eq => ({ id: eq }));

  //   await this.prismaService.team.update({
  //     where: {
  //       id: entity._id,
  //     },
  //     data: {
  //       name: entity.name,
  //       createdAt: entity.createdAt,
  //       employees: {
  //         disconnect: employeeIds[0],
  //       },
  //       equipments: {
  //         disconnect: equipmentIds[0],
  //       },
  //     },
  //   });
  // }

  // protected async _getResources(entity: TeamEntity) {
  //   await this._get(entity._id);
  //   const { employees, equipments } = entity.toJSON();
  //   const employeesData = await Promise.all(
  //     employees.map(async employeeId => {
  //       const employee = await this.prismaService.employee.findUnique({
  //         where: {
  //           id: employeeId,
  //         },
  //       });
  //       return employee ? employee.id : null;
  //     }),
  //   );

  //   const equipmentsData = await Promise.all(
  //     equipments.map(async equipmentId => {
  //       const equipment = await this.prismaService.equipment.findUnique({
  //         where: {
  //           id: equipmentId,
  //         },
  //       });
  //       return equipment ? equipment.id : null;
  //     }),
  //   );
  //   return { employees: employeesData, equipments: equipmentsData };
  // }

  includeAndUpdateResource(production: ProductionEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeAndUpdateResource(production: ProductionEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected async _get(id: string): Promise<ProductionEntity> {
    try {
      const production = await this.prismaService.production.findUnique({
        where: { id },
        include: {
          teams: true,
          towers: true,
          task: true,
        },
      });
      return ProductionModelMapper.toEntity(production);
    } catch (error) {
      throw new NotFoundError(`ProductionModel not found ID ${id}`);
    }
  }
}
