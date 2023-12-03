import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TeamOutput, TeamOutputMapper } from '../dto/team-output';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
export namespace RemoveEmployeeTeamUseCase {
  export type Input = {
    id: string;
    name: string;
    employees?: string[];
    equipments?: string[];
  } & Required<{ employeeId: string }>;

  export type Output = TeamOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TeamRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      entity.removeEmployee(input.employeeId);

      await this.repository.removeAndUpdateResource(entity);
      return TeamOutputMapper.toOutput(entity);
    }
  }
}
