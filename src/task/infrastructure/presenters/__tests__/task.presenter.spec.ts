import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { TaskPresenter, TasksCollectionPresenter } from '../task.presenter';
import { Stage } from '@/task/domain/entities/task.entity';

describe('TaskPresenter', () => {
  let sut: TaskPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    code: 1,
    stage: 'CIVIL' as Stage,
    group: 'Topografia',
    name: 'Locação de cavas',
    unit: 'torre',
    createdAt,
  };

  beforeEach(() => {
    sut = new TaskPresenter(props);
  });

  describe('Constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.code).toEqual(props.code);
      expect(sut.stage).toEqual(props.stage);
      expect(sut.group).toEqual(props.group);
      expect(sut.name).toEqual(props.name);
      expect(sut.unit).toEqual(props.unit);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
      code: 1,
      stage: 'CIVIL' as Stage,
      group: 'Topografia',
      name: 'Locação de cavas',
      unit: 'torre',
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('TasksCollectionPresenter', () => {
  let sut: TasksCollectionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    code: 1,
    stage: 'CIVIL' as Stage,
    group: 'Topografia',
    name: 'Locação de cavas',
    unit: 'torre',
    createdAt,
  };

  describe('Constructor', () => {
    it('should set values', () => {
      const sut = new TasksCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      });

      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
      expect(sut.meta).toStrictEqual(
        new PaginationPresenter({
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        }),
      );
      expect(sut.data).toStrictEqual([new TaskPresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new TasksCollectionPresenter({
      items: [props],
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
      total: 1,
    });
    let output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      data: [
        {
          id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
          code: 1,
          stage: 'CIVIL' as Stage,
          group: 'Topografia',
          name: 'Locação de cavas',
          unit: 'torre',
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    });

    sut = new TasksCollectionPresenter({
      items: [props],
      currentPage: '1' as any,
      perPage: '2' as any,
      lastPage: '1' as any,
      total: '1' as any,
    });
    output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      data: [
        {
          id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
          code: 1,
          stage: 'CIVIL' as Stage,
          group: 'Topografia',
          name: 'Locação de cavas',
          unit: 'torre',
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    });
  });
});
