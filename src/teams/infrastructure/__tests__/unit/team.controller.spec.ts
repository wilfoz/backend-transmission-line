import { TeamOutput } from '../../../application/dto/team-output';
import { AddEmployeeTeamUseCase } from '../../../application/usecases/add-employee-team.usecase';
import { CreateTeamUseCase } from '../../../application/usecases/create-team.usecase';
import { GetTeamUseCase } from '../../../application/usecases/get-team.usecase';
import { ListTeamsUseCase } from '../../../application/usecases/list-team.usecase';
import { UpdateTeamUseCase } from '../../../application/usecases/update-team.usecase';
import { UpdateResourceTeamDto } from '../../dto/update-resource-team.dto';
import { CreateTeamDto } from '../../dto/create-team.dto';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import {
  TeamCollectionPresenter,
  TeamPresenter,
} from '../../presenters/team.presenter';
import { TeamsController } from '../../teams.controller';
import { RemoveEmployeeTeamUseCase } from '../../../application/usecases/remove-employee-team.usecase';

describe('TeamController Unit Tests', () => {
  let sut: TeamsController;
  let id: string;
  let props: TeamOutput;

  beforeEach(async () => {
    sut = new TeamsController();
    id = 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      name: 'Pré-montagem',
      employees: [],
      equipments: [],
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a Team', async () => {
    const output: CreateTeamUseCase.Output = props;
    const mockCreateTeamUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createTeamUseCase'] = mockCreateTeamUseCase as any;
    const input: CreateTeamDto = {
      name: 'Pré-montagem',
      employees: [],
      equipments: [],
    };
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(TeamPresenter);
    expect(presenter).toStrictEqual(new TeamPresenter(output));
    expect(mockCreateTeamUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a Team', async () => {
    const output: UpdateTeamUseCase.Output = props;
    const mockUpdateTeamUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateTeamUseCase'] = mockUpdateTeamUseCase as any;
    const input: UpdateTeamDto = {
      name: 'Pré-montagem',
      employees: [],
      equipments: [],
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(TeamPresenter);
    expect(presenter).toStrictEqual(new TeamPresenter(output));
    expect(mockUpdateTeamUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should update a Employee in Team', async () => {
    const output: AddEmployeeTeamUseCase.Output = props;
    const mockUpdateTeamUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['addEmployeeTeamUseCase'] = mockUpdateTeamUseCase as any;
    const input: UpdateResourceTeamDto = {
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      name: 'Lançamento',
      employees: [],
      equipments: [],
    };
    const presenter = await sut.addEmployee(id, input);
    expect(presenter).toBeInstanceOf(TeamPresenter);
    expect(presenter).toStrictEqual(new TeamPresenter(output));
    expect(mockUpdateTeamUseCase.execute).toHaveBeenCalledWith({
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      name: 'Lançamento',
      employees: [],
      equipments: [],
      employeeId: id,
    });
  });

  it('should remove a employeeId in Team', async () => {
    const output: RemoveEmployeeTeamUseCase.Output = props;
    const mockRemoveEmployeeTeamUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['removeEmployeeTeamUseCase'] = mockRemoveEmployeeTeamUseCase as any;
    const input: UpdateResourceTeamDto = {
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      name: 'Lançamento',
      employees: ['6ae6e322-b1bf-4fda-abf7-e93758e0a8a7'],
      equipments: [],
    };
    const presenter = await sut.removeEmployee(id, input);
    expect(presenter).toBeInstanceOf(TeamPresenter);
    expect(presenter).toStrictEqual(new TeamPresenter(output));
    expect(mockRemoveEmployeeTeamUseCase.execute).toHaveBeenCalledWith({
      id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
      name: 'Lançamento',
      employees: ['6ae6e322-b1bf-4fda-abf7-e93758e0a8a7'],
      equipments: [],
      employeeId: id,
    });
  });

  it('should gets a Team', async () => {
    const output: GetTeamUseCase.Output = props;
    const mockGetTeamUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getTeamUseCase'] = mockGetTeamUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(TeamPresenter);
    expect(presenter).toStrictEqual(new TeamPresenter(output));
    expect(mockGetTeamUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a Team', async () => {
    const output = undefined;
    const mockDeleteTeamUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteTeamUseCase'] = mockDeleteTeamUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteTeamUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a Teams', async () => {
    const output: ListTeamsUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListTeamsUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listTeamsUseCase'] = mockListTeamsUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(TeamCollectionPresenter);
    expect(presenter).toEqual(new TeamCollectionPresenter(output));
    expect(mockListTeamsUseCase.execute).toHaveBeenCalledWith(searchParams);
  });
});
