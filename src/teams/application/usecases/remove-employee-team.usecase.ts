import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TeamOutput, TeamOutputMapper } from '../dto/team-output';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import { TeamEntity } from '../../domain/entities/team.entity';
export namespace RemoveEmployeeTeamUseCase {
  export type Input = {
    team: TeamEntity;
    employeeId: string;
  };

  export type Output = TeamOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TeamRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.team.id);
      entity.removeEmployee(input.employeeId);

      this.repository.update(entity);
      return TeamOutputMapper.toOutput(entity);
    }
  }
}
