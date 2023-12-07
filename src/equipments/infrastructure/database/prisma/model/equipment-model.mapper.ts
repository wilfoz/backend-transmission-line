import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Equipment } from '@prisma/client';

type Status = 'ACTIVE' | 'MAINTENANCE' | 'DEMOBILIZED';

export class EquipmentModelMapper {
  static toEntity(model: Equipment) {
    const data = {
      registration: model.registration,
      model: model.model,
      manufacturer: model.manufacturer,
      licensePlate: model.licensePlate,
      provider: model.provider,
      status: model.status,
      teamId: model.teamId,
      createdAt: model.createdAt,
    };

    try {
      const transformedData = {
        ...data,
        status: data.status as Status,
      };
      return new EquipmentEntity(transformedData, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
