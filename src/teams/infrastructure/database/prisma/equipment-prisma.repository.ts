import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';
import { EquipmentModelMapper } from './model/equipment-model.mapper';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';

export class EquipmentPrismaRepository
  implements EquipmentRepository.Repository {
  sortableFields: string[] = ['registration', 'model', 'createdAT'];

  constructor(private prismaService: PrismaService) { }

  async search(
    props: EquipmentRepository.SearchParams,
  ): Promise<EquipmentRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.equipment.count({
      ...(props.filter && {
        where: {
          model: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.equipment.findMany({
      ...(props.filter && {
        where: {
          model: {
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

    return new EquipmentRepository.SearchResult({
      items: models.map(model => EquipmentModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: EquipmentEntity): Promise<void> {
    await this.prismaService.equipment.create({
      data: entity.toJSON(),
    });
  }

  async findById(id: string): Promise<EquipmentEntity> {
    return this._get(id);
  }

  async findAll(): Promise<EquipmentEntity[]> {
    const models = await this.prismaService.equipment.findMany();
    return models.map(model => {
      return EquipmentModelMapper.toEntity(model);
    });
  }

  async update(entity: EquipmentEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.equipment.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.equipment.delete({
      where: {
        id,
      },
    });
  }

  protected async _get(id: string): Promise<EquipmentEntity> {
    try {
      const equipment = await this.prismaService.equipment.findUnique({
        where: { id },
      });
      return EquipmentModelMapper.toEntity(equipment);
    } catch (error) {
      throw new NotFoundError(`EquipmentModel not found ID ${id}`);
    }
  }
}
