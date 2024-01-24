import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { FoundationRepository } from '../../../foundations/domain/repositories/foundation.repository';

export namespace GetTowerUseCase {
  export type Input = {
    id: string;
  };

  export type Output = TowerOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private repository: TowerRepository.Repository,
      private foundationRepo: FoundationRepository.Repository,
    ) { }

    async execute(input: Input): Promise<Output> {
      const tower = await this.repository.findById(input.id);
      const foundations = await Promise.all(
        tower.foundations.map(id => this.foundationRepo.findById(id)),
      );
      return TowerOutputMapper.toOutput(tower, foundations);
    }
  }
}
