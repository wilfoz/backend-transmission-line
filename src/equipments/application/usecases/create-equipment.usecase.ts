import {
  EquipmentEntity,
  Status,
} from '@/equipments/domain/entities/equipments.entity';
import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  EquipmentOutput,
  EquipmentOutputMapper,
} from '../dto/equipments-output';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export namespace CreateEquipmentUseCase {
  export type Input = {
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
      try {
        const entity = new EquipmentEntity(input);
        await this.repository.insert(entity);
        return EquipmentOutputMapper.toOutput(entity);
      } catch (e) {
        this.handleError(e);
      }
    }

    private handleError(e: Error) {
      if (e instanceof EntityValidationError) {
        throw new EntityValidationError(e.error);
      }
      throw e;
    }
  }
}
