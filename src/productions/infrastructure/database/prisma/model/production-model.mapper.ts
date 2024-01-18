import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Production, Task, Team, Tower } from '@prisma/client';
import { ProductionEntity } from '../../../../domain/entities/production.entity';

export class ProductionModelMapper {
  static toEntity(
    model: Required<
      {
        teams: Team[];
        towers: Tower[];
        task: Task;
      } & Production
    >,
  ) {
    const data = {
      status: model.status,
      comments: model.comments,
      startTime: model.startTime,
      finalTime: model.finalTime,
      teams: model.teams,
      towers: model.towers,
      task: model.task,
      createdAt: model.createdAt,
    };

    try {
      const { teams, towers, task, ...others } = data;
      const production = {
        ...others,
        teams: teams.map(team => team.id),
        towers: towers.map(tower => tower.id),
        taskId: task.id,
      };
      return new ProductionEntity(production, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
