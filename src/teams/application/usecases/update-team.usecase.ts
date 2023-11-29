import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TeamOutput, TeamOutputMapper } from '../dto/team-output';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import {
  EmployeesProps,
  EquipmentsProps,
} from '../../domain/entities/team.entity';

export namespace UpdateTeamUseCase {
  export type Input = {
    id: string;
    name: string;
    employees?: EmployeesProps[];
    equipments?: EquipmentsProps[];
  };

  export type Output = TeamOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TeamRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      entity.update(input.name);

      this.repository.update(entity);
      return TeamOutputMapper.toOutput(entity);
    }
  }
}
