import { ProductionOutput } from '../../../application/dto/production-output';
import { CreateProductionUseCase } from '../../../application/usecases/create-production.usecase';
import { STATUS_PRODUCTION } from '../../../domain/entities/production.entity';
import { CreateProductionDto } from '../../dto/create-production.dto';
import { ProductionPresenter } from '../../presenters/production.presenter';
import { ProductionsController } from '../../productions.controller';

describe('ProductionController Unit Tests', () => {
  let sut: ProductionsController;
  let id: string;
  let props: ProductionOutput;

  beforeEach(async () => {
    sut = new ProductionsController();
    id = 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      status: 'EXECUTED',
      comments: 'Pré-montagem',
      teams: [],
      towers: [],
      taskId: 'ec11a450-fb24-48e8-9a2e-d717d623681d',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a Production', async () => {
    const output: CreateProductionUseCase.Output = props;
    const mockCreateProductionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createProductionUseCase'] = mockCreateProductionUseCase as any;
    const input: CreateProductionDto = {
      ...props,
      status: props.status as STATUS_PRODUCTION,
    };
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(ProductionPresenter);
    expect(presenter).toStrictEqual(new ProductionPresenter(output));
    expect(mockCreateProductionUseCase.execute).toHaveBeenCalledWith(input);
  });

  // it('should update a Production', async () => {
  //   const output: UpdateProductionUseCase.Output = props;
  //   const mockUpdateProductionUseCase = {
  //     execute: jest.fn().mockReturnValue(Promise.resolve(output)),
  //   };
  //   sut['updateProductionUseCase'] = mockUpdateProductionUseCase as any;
  //   const input: UpdateProductionDto = {
  //     name: 'Pré-montagem',
  //     employees: [],
  //     equipments: [],
  //   };
  //   const presenter = await sut.update(id, input);
  //   expect(presenter).toBeInstanceOf(ProductionPresenter);
  //   expect(presenter).toStrictEqual(new ProductionPresenter(output));
  //   expect(mockUpdateProductionUseCase.execute).toHaveBeenCalledWith({
  //     id,
  //     ...input,
  //   });
  // });

  // it('should update a Employee in Production', async () => {
  //   const output: AddEmployeeProductionUseCase.Output = props;
  //   const mockUpdateProductionUseCase = {
  //     execute: jest.fn().mockReturnValue(Promise.resolve(output)),
  //   };
  //   sut['addEmployeeProductionUseCase'] = mockUpdateProductionUseCase as any;
  //   const input: UpdateResourceProductionDto = {
  //     id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
  //     name: 'Lançamento',
  //     employees: [],
  //     equipments: [],
  //   };
  //   const presenter = await sut.addEmployee(id, input);
  //   expect(presenter).toBeInstanceOf(ProductionPresenter);
  //   expect(presenter).toStrictEqual(new ProductionPresenter(output));
  //   expect(mockUpdateProductionUseCase.execute).toHaveBeenCalledWith({
  //     id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
  //     name: 'Lançamento',
  //     employees: [],
  //     equipments: [],
  //     employeeId: id,
  //   });
  // });

  // it('should remove a employeeId in Production', async () => {
  //   const output: RemoveEmployeeProductionUseCase.Output = props;
  //   const mockRemoveEmployeeProductionUseCase = {
  //     execute: jest.fn().mockReturnValue(Promise.resolve(output)),
  //   };
  //   sut['removeEmployeeProductionUseCase'] = mockRemoveEmployeeProductionUseCase as any;
  //   const input: UpdateResourceProductionDto = {
  //     id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
  //     name: 'Lançamento',
  //     employees: ['6ae6e322-b1bf-4fda-abf7-e93758e0a8a7'],
  //     equipments: [],
  //   };
  //   const presenter = await sut.removeEmployee(id, input);
  //   expect(presenter).toBeInstanceOf(ProductionPresenter);
  //   expect(presenter).toStrictEqual(new ProductionPresenter(output));
  //   expect(mockRemoveEmployeeProductionUseCase.execute).toHaveBeenCalledWith({
  //     id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f',
  //     name: 'Lançamento',
  //     employees: ['6ae6e322-b1bf-4fda-abf7-e93758e0a8a7'],
  //     equipments: [],
  //     employeeId: id,
  //   });
  // });

  // it('should gets a Production', async () => {
  //   const output: GetProductionUseCase.Output = props;
  //   const mockGetProductionUseCase = {
  //     execute: jest.fn().mockReturnValue(Promise.resolve(output)),
  //   };
  //   sut['getProductionUseCase'] = mockGetProductionUseCase as any;
  //   const presenter = await sut.findOne(id);
  //   expect(presenter).toBeInstanceOf(ProductionPresenter);
  //   expect(presenter).toStrictEqual(new ProductionPresenter(output));
  //   expect(mockGetProductionUseCase.execute).toHaveBeenCalledWith({ id });
  // });

  // it('should delete a Production', async () => {
  //   const output = undefined;
  //   const mockDeleteProductionUseCase = {
  //     execute: jest.fn().mockReturnValue(Promise.resolve(output)),
  //   };
  //   sut['deleteProductionUseCase'] = mockDeleteProductionUseCase as any;
  //   const result = await sut.remove(id);
  //   expect(output).toStrictEqual(result);
  //   expect(mockDeleteProductionUseCase.execute).toHaveBeenCalledWith({ id });
  // });

  // it('should list a Productions', async () => {
  //   const output: ListProductionsUseCase.Output = {
  //     items: [props],
  //     currentPage: 1,
  //     lastPage: 1,
  //     perPage: 1,
  //     total: 1,
  //   };
  //   const mockListProductionsUseCase = {
  //     execute: jest.fn().mockReturnValue(Promise.resolve(output)),
  //   };
  //   sut['listProductionsUseCase'] = mockListProductionsUseCase as any;
  //   const searchParams = {
  //     page: 1,
  //     perPage: 1,
  //   };
  //   const presenter = await sut.search(searchParams);
  //   expect(presenter).toBeInstanceOf(ProductionCollectionPresenter);
  //   expect(presenter).toEqual(new ProductionCollectionPresenter(output));
  //   expect(mockListProductionsUseCase.execute).toHaveBeenCalledWith(searchParams);
  // });
});
