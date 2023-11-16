import { instanceToPlain } from 'class-transformer';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { TowerPresenter, TowersCollectionPresenter } from '../tower.presenter';

describe('TowerPresenter', () => {
  let sut: TowerPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    code: 1,
    tower: '0/2',
    type: 'AT',
    coordinates: { latitude: '', longitude: '' },
    distance: 200,
    height: 30,
    weight: 1000,
    type_of_foundation_A: 'T',
    type_of_foundation_B: 'T',
    type_of_foundation_C: 'T',
    type_of_foundation_D: 'T',
    type_of_foundation_MC: 'T',
    embargo: 'RELEASE',
    createdAt,
  };

  beforeEach(() => {
    sut = new TowerPresenter(props);
  });

  describe('Constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.code).toEqual(props.code);
      expect(sut.tower).toEqual(props.tower);
      expect(sut.type).toEqual(props.type);
      expect(sut.coordinates).toEqual(props.coordinates);
      expect(sut.distance).toEqual(props.distance);
      expect(sut.height).toEqual(props.height);
      expect(sut.weight).toEqual(props.weight);
      expect(sut.type_of_foundation_A).toEqual(props.type_of_foundation_A);
      expect(sut.type_of_foundation_B).toEqual(props.type_of_foundation_B);
      expect(sut.type_of_foundation_C).toEqual(props.type_of_foundation_C);
      expect(sut.type_of_foundation_D).toEqual(props.type_of_foundation_D);
      expect(sut.type_of_foundation_MC).toEqual(props.type_of_foundation_MC);
      expect(sut.embargo).toEqual(props.embargo);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
      code: 1,
      tower: '0/2',
      type: 'AT',
      coordinates: { latitude: '', longitude: '' },
      distance: 200,
      height: 30,
      weight: 1000,
      type_of_foundation_A: 'T',
      type_of_foundation_B: 'T',
      type_of_foundation_C: 'T',
      type_of_foundation_D: 'T',
      type_of_foundation_MC: 'T',
      embargo: 'RELEASE',
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('TowersCollectionPresenter', () => {
  let sut: TowersCollectionPresenter;
  const createdAt = new Date();
  const props = {
    id: '9354d4ca-2142-4e54-adb4-53ec3c3540d4',
    code: 1,
    tower: '0/2',
    type: 'AT',
    coordinates: { latitude: '', longitude: '' },
    distance: 200,
    height: 30,
    weight: 1000,
    type_of_foundation_A: 'T',
    type_of_foundation_B: 'T',
    type_of_foundation_C: 'T',
    type_of_foundation_D: 'T',
    type_of_foundation_MC: 'T',
    embargo: 'RELEASE',
    createdAt,
  };

  describe('Constructor', () => {
    it('should set values', () => {
      const sut = new TowersCollectionPresenter({
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
      expect(sut.data).toStrictEqual([new TowerPresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new TowersCollectionPresenter({
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
          tower: '0/2',
          type: 'AT',
          coordinates: { latitude: '', longitude: '' },
          distance: 200,
          height: 30,
          weight: 1000,
          type_of_foundation_A: 'T',
          type_of_foundation_B: 'T',
          type_of_foundation_C: 'T',
          type_of_foundation_D: 'T',
          type_of_foundation_MC: 'T',
          embargo: 'RELEASE',
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

    sut = new TowersCollectionPresenter({
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
          tower: '0/2',
          type: 'AT',
          coordinates: { latitude: '', longitude: '' },
          distance: 200,
          height: 30,
          weight: 1000,
          type_of_foundation_A: 'T',
          type_of_foundation_B: 'T',
          type_of_foundation_C: 'T',
          type_of_foundation_D: 'T',
          type_of_foundation_MC: 'T',
          embargo: 'RELEASE',
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
