import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';
import { EmployeeModelMapper } from './model/employee-model.mapper';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';

export class EmployeePrismaRepository implements EmployeeRepository.Repository {
  sortableFields: string[] = ['registration', 'fullName', 'createdAT'];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: EmployeeRepository.SearchParams,
  ): Promise<EmployeeRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.employee.count({
      ...(props.filter && {
        where: {
          fullName: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.employee.findMany({
      ...(props.filter && {
        where: {
          fullName: {
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

    return new EmployeeRepository.SearchResult({
      items: models.map(model => EmployeeModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: EmployeeEntity): Promise<void> {
    await this.prismaService.employee.create({
      data: entity.toJSON(),
    });
  }

  async findById(id: string): Promise<EmployeeEntity> {
    return this._get(id);
  }

  async findAll(): Promise<EmployeeEntity[]> {
    const models = await this.prismaService.employee.findMany();
    return models.map(model => {
      return EmployeeModelMapper.toEntity(model);
    });
  }

  async update(entity: EmployeeEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.employee.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.employee.delete({
      where: {
        id,
      },
    });
  }

  protected async _get(id: string): Promise<EmployeeEntity> {
    try {
      const employee = await this.prismaService.employee.findUnique({
        where: { id },
      });
      return EmployeeModelMapper.toEntity(employee);
    } catch (error) {
      throw new NotFoundError(`EmployeeModel not found ID ${id}`);
    }
  }
}
