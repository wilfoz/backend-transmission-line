import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  EquipmentOutput,
  EquipmentOutputMapper,
} from '../dto/team-output';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';

export namespace GetEquipmentUseCase {
  export type Input = {
    id: string;
  };

  export type Output = EquipmentOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EquipmentRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return EquipmentOutputMapper.toOutput(entity);
    }
  }
}
