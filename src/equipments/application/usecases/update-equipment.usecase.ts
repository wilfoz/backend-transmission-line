import { Status } from '@/equipments/domain/entities/equipments.entity';
import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  EquipmentOutput,
  EquipmentOutputMapper,
} from '../dto/equipments-output';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';

export namespace UpdateEquipmentUseCase {
  export type Input = {
    id: string;
    registration: string;
    model: string;
    manufacturer: string;
    licensePlate: string;
    provider: string;
    status: Status;
  };

  export type Output = EquipmentOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EquipmentRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      entity.update(input);
      this.repository.update(entity);
      return EquipmentOutputMapper.toOutput(entity);
    }
  }
}
