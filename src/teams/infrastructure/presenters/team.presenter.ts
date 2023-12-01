import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ListTeamsUseCase } from '@/teams/application/usecases/list-team.usecase';
import { Transform } from 'class-transformer';

export class TeamPresenter {
  id: string;
  name: string;
  employees?: string[];
  equipments?: string[];

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: TeamPresenter) {
    this.id = output.id;
    this.name = output.name;
    this.employees = output.employees;
    this.equipments = output.equipments;
    this.createdAt = output.createdAt;
  }
}

export class TeamCollectionPresenter extends CollectionPresenter {
  data: TeamPresenter[];
  constructor(output: ListTeamsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new TeamPresenter(item));
  }
}
