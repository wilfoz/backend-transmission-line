import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';

export namespace GetTowerUseCase {
  export type Input = {
    id: string;
  };

  export type Output = TowerOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TowerRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return TowerOutputMapper.toOutput(entity);
    }
  }
}
