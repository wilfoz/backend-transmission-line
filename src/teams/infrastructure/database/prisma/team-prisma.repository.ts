import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import { TeamModelMapper } from './model/team-model.mapper';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { Employee, STATUS_EMPLOYEE, STATUS_EQUIPMENT } from '@prisma/client';

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
      }),
      include: {
        employees: true,
        equipments: true,
      },
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
    const { employees, equipments, ...others } = entity.toJSON();
    const employeesData = await Promise.all(
      employees.map(employeeId => {
        return this.prismaService.employee.findUnique({
          where: {
            id: employeeId,
          },
        });
      }),
    );

    const equipmentsData = await Promise.all(
      equipments.map(equipmentId => {
        return this.prismaService.equipment.findUnique({
          where: {
            id: equipmentId,
          },
        });
      }),
    );

    await this.prismaService.team.create({
      data: {
        ...others,
        employees: { connect: employeesData.map(emp => ({ id: emp.id })) },
        equipments: { connect: equipmentsData.map(eq => ({ id: eq.id })) },
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

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.team.delete({
      where: {
        id,
      },
    });
  }

  async update(entity: TeamEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.team.update({
      data: {
        name: entity.name,
        createdAt: entity.createdAt,
      },
      where: {
        id: entity._id,
      },
    });
  }

  async includeAndUpdateResource(entity: TeamEntity): Promise<void> {
    const { employees, equipments } = await this._getResources(entity);
    const employeeIds = employees
      .filter(emp => emp !== null)
      .map(emp => ({ id: emp }));

    const equipmentIds = equipments
      .filter(eq => eq !== null)
      .map(eq => ({ id: eq }));

    await this.prismaService.team.update({
      data: {
        name: entity.name,
        createdAt: entity.createdAt,
        employees: {
          connect: employeeIds,
        },
        equipments: {
          connect: equipmentIds,
        },
      },
      where: {
        id: entity._id,
      },
    });
  }

  async removeAndUpdateResource(entity: TeamEntity): Promise<void> {
    const { employees, equipments } = await this._getResources(entity);

    const employeeIds = employees
      .filter(emp => emp !== null)
      .map(emp => ({ id: emp }));

    const equipmentIds = equipments
      .filter(eq => eq !== null)
      .map(eq => ({ id: eq }));

    await this.prismaService.team.update({
      where: {
        id: entity._id,
      },
      data: {
        name: entity.name,
        createdAt: entity.createdAt,
        employees: {
          disconnect: employeeIds[0],
        },
        equipments: {
          disconnect: equipmentIds[0],
        },
      },
    });
  }

  protected async _getResources(entity: TeamEntity) {
    await this._get(entity._id);
    const { employees, equipments } = entity.toJSON();
    const employeesData = await Promise.all(
      employees.map(async employeeId => {
        const employee = await this.prismaService.employee.findUnique({
          where: {
            id: employeeId,
          },
        });
        return employee ? employee.id : null;
      }),
    );

    const equipmentsData = await Promise.all(
      equipments.map(async equipmentId => {
        const equipment = await this.prismaService.equipment.findUnique({
          where: {
            id: equipmentId,
          },
        });
        return equipment ? equipment.id : null;
      }),
    );
    return { employees: employeesData, equipments: equipmentsData };
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
