import {
  EquipmentEntity,
  Status,
} from '@/equipments/domain/entities/equipments.entity';

export type EquipmentOutput = {
  id: string;
  registration: string;
  model: string;
  manufacturer: string;
  licensePlate: string;
  provider: string;
  status: Status;
  createdAt?: Date;
};

export class EquipmentOutputMapper {
  static toOutput(entity: EquipmentEntity): EquipmentOutput {
    return entity.toJSON();
  }
}
