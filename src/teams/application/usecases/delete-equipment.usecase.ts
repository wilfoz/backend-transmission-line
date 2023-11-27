import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';

export namespace DeleteEquipmentUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EquipmentRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
