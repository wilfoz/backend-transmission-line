import { teamDataBuilder } from '../../helpers/team-data-builder';
import { TeamEntity, TeamProps } from '../team.entity';

describe('TeamEntity Unit Tests', () => {
  let props: TeamProps;
  let sut: TeamEntity;

  beforeEach(() => {
    TeamEntity.validate = jest.fn();
    props = teamDataBuilder({});
    sut = new TeamEntity(props);
  });

  it('Constructor method', () => {
    expect(TeamEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.employees).toEqual(props.employees);
    expect(sut.props.equipments).toEqual(props.equipments);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  describe('Getters and Setters', () => {
    it('Getter of name fields', () => {
      expect(sut.name).toBeDefined();
      expect(sut.name).toEqual(props.name);
      expect(typeof sut.name).toBe('string');
    });

    it('Setter of name fields', () => {
      sut['name'] = 'Locação';

      expect(sut.props.name).toEqual('Locação');
      expect(typeof sut.props.name).toBe('string');
    });

    it('Getter of employees fields', () => {
      expect(sut.employees.length).toBe(0);
      expect(sut.employees).toEqual(props.employees);
    });

    it('Getter of equipments fields', () => {
      expect(sut.equipments.length).toBe(0);
      expect(sut.equipments).toEqual(props.equipments);
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('TeamEntity methods', () => {
    it('should update a name', () => {
      sut.update('Sondagem');
      expect(TeamEntity.validate).toHaveBeenCalled();
      expect(sut.props.name).toEqual('Sondagem');
    });
  });
});
