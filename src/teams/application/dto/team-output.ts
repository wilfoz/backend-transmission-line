import { TeamEntity } from '@/teams/domain/entities/team.entity';

export type TeamOutput = {
  id: string;
  name: string;
  employees?: string[];
  equipments?: string[];
  createdAt: Date;
};

export class TeamOutputMapper {
  static toOutput(entity: TeamEntity): TeamOutput {
    return entity.toJSON();
  }
}
