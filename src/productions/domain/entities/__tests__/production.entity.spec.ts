import { productionDataBuilder } from '../../helpers/production-data-builder';
import { ProductionEntity, ProductionProps } from '../production.entity';

describe('ProductionEntity Unit Tests', () => {
  let props: ProductionProps;
  let sut: ProductionEntity;

  beforeEach(() => {
    ProductionEntity.validate = jest.fn();
    props = productionDataBuilder({});
    sut = new ProductionEntity(props);
  });

  it('Constructor method', () => {
    expect(ProductionEntity.validate).toHaveBeenCalled();
    expect(sut.props.status).toEqual(props.status);
    expect(sut.props.comments).toEqual(props.comments);
    expect(sut.props.startTime).toEqual(props.startTime);
    expect(sut.props.finalTime).toEqual(props.finalTime);
    expect(sut.props.teams).toEqual(props.teams);
    expect(sut.props.towers).toEqual(props.towers);
    expect(sut.props.taskId).toEqual(props.taskId);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  describe('Getters and Setters', () => {
    it('Getter of status fields', () => {
      expect(sut.status).toBeDefined();
      expect(sut.status).toEqual(props.status);
      expect(typeof sut.status).toBe('string');
    });

    it('Setter of status fields', () => {
      sut['status'] = 'EXECUTED';

      expect(sut.props.status).toEqual('EXECUTED');
      expect(typeof sut.props.status).toBe('string');
    });

    it('Getter of comments fields', () => {
      expect(sut.comments).toBeDefined();
      expect(sut.comments).toEqual(props.comments);
      expect(typeof sut.comments).toBe('string');
    });

    it('Setter of comments fields', () => {
      sut['comments'] = 'test';

      expect(sut.props.comments).toEqual('test');
      expect(typeof sut.props.comments).toBe('string');
    });

    it('Getter of teams fields', () => {
      expect(sut.teams).toBeDefined();
      expect(sut.teams).toEqual(props.teams);
      expect(typeof sut.teams).toBe('object');
    });

    it('Setter of teams fields', () => {
      sut['teams'] = props.teams;

      expect(sut.props.teams).toEqual(props.teams);
      expect(typeof sut.props.teams).toBe('object');
    });

    it('Getter of towers fields', () => {
      expect(sut.towers).toBeDefined();
      expect(sut.towers).toEqual(props.towers);
      expect(typeof sut.towers).toBe('object');
    });

    it('Setter of towers fields', () => {
      sut['towers'] = props.towers;

      expect(sut.props.towers).toEqual(props.towers);
      expect(typeof sut.props.towers).toBe('object');
    });

    it('Getter of taskId fields', () => {
      expect(sut.taskId).toBeDefined();
      expect(sut.taskId).toEqual(props.taskId);
      expect(typeof sut.taskId).toBe('string');
    });

    it('Setter of taskId fields', () => {
      sut['taskId'] = props.taskId;

      expect(sut.props.taskId).toEqual(props.taskId);
      expect(typeof sut.props.taskId).toBe('string');
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('domain methods', () => {
    it('should update a Production', () => {
      sut.update({
        ...props,
        status: 'PROGRAMMED',
        comments: 'comentando qualquer coisa',
      });
      expect(ProductionEntity.validate).toHaveBeenCalled();
      expect(sut.props.status).toEqual('PROGRAMMED');
      expect(sut.props.comments).toEqual('comentando qualquer coisa');
    });

    it('should throw an error when add an exited team', () => {
      const teamId = '9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a';
      sut.addTeam(teamId);
      expect(() => sut.addTeam(teamId)).toThrowError('Team already exists!');
    });

    it('should add a team', () => {
      sut.addTeam('9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a');
      expect(sut.props.teams.length).toBe(2);
    });

    it('should not remove a non-existing team', () => {
      expect(() => sut.removeTeam('fake-id')).toThrowError(
        'Team does not exist!',
      );
    });

    it('should throw an error when add an exited tower', () => {
      const towerId = '9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a';
      sut.addTower(towerId);
      expect(() => sut.addTower(towerId)).toThrowError('Tower already exists!');
    });

    it('should add a tower', () => {
      sut.addTower('9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a');
      expect(sut.props.towers.length).toBe(2);
    });

    it('should not remove a non-existing tower', () => {
      expect(() => sut.removeTower('fake-id')).toThrowError(
        'Tower does not exist!',
      );
    });

    it('should return default start time (8 hours)', () => {
      const defaultTime = sut.setStartTimeDefault();
      expect(defaultTime.getHours()).toBe(7);
    });

    it('should return default final time (17 hours)', () => {
      const defaultTime = sut.setFinalTimeDefault();
      expect(defaultTime.getHours()).toBe(17);
    });
  });
});
