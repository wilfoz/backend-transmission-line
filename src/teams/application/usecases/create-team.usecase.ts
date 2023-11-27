import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { TeamOutput, TeamOutputMapper } from '../dto/team-output';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import {
  Employee,
  Equipment,
  TeamEntity,
} from '@/teams/domain/entities/team.entity';

export namespace CreateTeamUseCase {
  export type Input = {
    name: string;
    employees?: Map<string, Employee>;
    equipments?: Map<string, Equipment>;
    createdAt?: Date;
  };

  export type Output = TeamOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TeamRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      try {
        const entity = new TeamEntity(input);
        await this.repository.insert(entity);
        return TeamOutputMapper.toOutput(entity);
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
