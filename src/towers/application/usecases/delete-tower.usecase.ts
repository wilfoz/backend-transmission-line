import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';

export namespace DeleteTowerUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TowerRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
