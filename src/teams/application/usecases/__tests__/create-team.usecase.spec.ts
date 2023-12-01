import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';
import { CreateTeamUseCase } from '../create-team.usecase';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import { TeamEntity, TeamProps } from '@/teams/domain/entities/team.entity';

describe('CreateTeamUseCase Unit Tests', () => {
  let sut: CreateTeamUseCase.UseCase;
  let repository: TeamInMemoryRepository;
  let props: TeamProps;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new CreateTeamUseCase.UseCase(repository);
    jest.restoreAllMocks();
    props = teamDataBuilder({});
  });
  describe('handleError method', () => {
    it('should throw a generic error', () => {
      const error = new Error('error test');
      expect(() => sut['handleError'](error)).toThrowError(error);
    });

    it('should throw an entity validation error', () => {
      const error = new EntityValidationError({ name: ['error test'] });
      expect(() => sut['handleError'](error)).toThrowError(error);
    });
  });

  describe('execute method', () => {
    it('should throw an generic error', async () => {
      const expectedError = new Error('generic error');
      jest.spyOn(repository, 'insert').mockRejectedValue(expectedError);
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);

      await expect(sut.execute(props)).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(TeamEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(sut.execute(props)).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a Team with employees and equipments undefined', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        name: 'Locação',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        name: repository.items[0].name,
        employees: [],
        equipments: [],
        createdAt: repository.items[0].createdAt,
      });
    });

    it('should create a Team with employees and equipments', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        ...props,
        employees: ['11eb64f2-e654-481e-8818-59e3065dbbc6'],
        equipments: ['11eb64f2-e654-481e-8818-59e3065dbbc6'],
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        name: repository.items[0].name,
        employees: repository.items[0].getEmployees(),
        equipments: repository.items[0].getEquipments(),
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
