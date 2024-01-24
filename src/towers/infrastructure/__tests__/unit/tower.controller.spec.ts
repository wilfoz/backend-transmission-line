import { TowerOutput } from '@/towers/application/dto/tower-output';
import { TowerController } from '../../tower.controller';
import { CreateTowerUseCase } from '@/towers/application/usecases/create-tower.usecase';
import { CreateTowerDto } from '../../dto/create-tower.dto';
import {
  TowerPresenter,
  TowersCollectionPresenter,
} from '../../presenters/tower.presenter';
import { UpdateTowerUseCase } from '@/towers/application/usecases/update-tower.usecase';
import { UpdateTowerDto } from '../../dto/update-tower.dto';
import { GetTowerUseCase } from '@/towers/application/usecases/get-tower.usecase';
import { ListTowersUseCase } from '@/towers/application/usecases/list-towers.usecase';

describe('TowerController Unit Tests', () => {
  let sut: TowerController;
  let id: string;
  let props: TowerOutput;

  beforeEach(async () => {
    sut = new TowerController();
    id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      code: 1,
      tower: '0/2',
      type: 'AT',
      coordinates: { latitude: '', longitude: '' },
      distance: 200,
      height: 30,
      weight: 1000,
      foundations: [
        {
          id: 'fbff4845-de4a-4073-90d5-bad38822b4f9',
          project: 'AT-FUN-MCA-0001',
          revision: '0A',
          description: 'AT-TCB-AFL-0.5',
          excavation_volume: 20,
          concrete_volume: 15,
          backfill_volume: 18,
          steel_volume: 1000,
          createdAt: new Date(),
        },
      ],
      embargo: 'RELEASE',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const output: CreateTowerUseCase.Output = props;
    const mockCreateTowerUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createTowerUseCase'] = mockCreateTowerUseCase as any;
    const input: CreateTowerDto = {
      code: 1,
      tower: '0/2',
      type: 'AT',
      coordinates: { latitude: '', longitude: '' },
      distance: 200,
      height: 30,
      weight: 1000,
      foundations: ['fbff4845-de4a-4073-90d5-bad38822b4f9'],
      embargo: 'RELEASE',
    };
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(TowerPresenter);
    expect(presenter).toStrictEqual(new TowerPresenter(output));
    expect(mockCreateTowerUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a tower', async () => {
    const output: UpdateTowerUseCase.Output = props;
    const mockUpdateTowerUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateTowerUseCase'] = mockUpdateTowerUseCase as any;
    const input: UpdateTowerDto = {
      code: 1,
      tower: '0/2',
      type: 'AT',
      coordinates: { latitude: '123', longitude: '456' },
      distance: 200,
      height: 30,
      weight: 1000,
      foundations: ['fbff4845-de4a-4073-90d5-bad38822b4f9'],
      embargo: 'RELEASE',
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(TowerPresenter);
    expect(presenter).toStrictEqual(new TowerPresenter(output));
    expect(mockUpdateTowerUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should gets a tower', async () => {
    const output: GetTowerUseCase.Output = props;
    const mockGetTowerUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getTowerUseCase'] = mockGetTowerUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(TowerPresenter);
    expect(presenter).toStrictEqual(new TowerPresenter(output));
    expect(mockGetTowerUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a tower', async () => {
    const output = undefined;
    const mockDeleteTowerUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteTowerUseCase'] = mockDeleteTowerUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteTowerUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a towers', async () => {
    const output: ListTowersUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListTowersUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listTowersUseCase'] = mockListTowersUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(TowersCollectionPresenter);
    expect(presenter).toEqual(new TowersCollectionPresenter(output));
    expect(mockListTowersUseCase.execute).toHaveBeenCalledWith(searchParams);
  });
});
