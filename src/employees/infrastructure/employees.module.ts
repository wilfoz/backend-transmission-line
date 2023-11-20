import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { EmployeePrismaRepository } from './database/prisma/employee-prisma.repository';
import { CreateEmployeeUseCase } from '../application/usecases/create-employee.usecase';
import { EmployeeRepository } from '../domain/repositories/employee.repository';
import { GetEmployeeUseCase } from '../application/usecases/get-employee.usecase';
import { UpdateEmployeeUseCase } from '../application/usecases/update-employee.usecase';
import { ListEmployeesUseCase } from '../application/usecases/list-employee.usecase';
import { DeleteEmployeeUseCase } from '../application/usecases/delete-employee.usecase';

@Module({
  controllers: [EmployeesController],
  providers: [
    // {
    //   provide: 'EmployeeRepository',
    //   useClass: EmployeeInMemoryRepository,
    // },
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'EmployeeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new EmployeePrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateEmployeeUseCase.UseCase,
      useFactory: (EmployeeRepository: EmployeeRepository.Repository) => {
        return new CreateEmployeeUseCase.UseCase(EmployeeRepository);
      },
      inject: ['EmployeeRepository'],
    },
    {
      provide: GetEmployeeUseCase.UseCase,
      useFactory: (EmployeeRepository: EmployeeRepository.Repository) => {
        return new GetEmployeeUseCase.UseCase(EmployeeRepository);
      },
      inject: ['EmployeeRepository'],
    },
    {
      provide: UpdateEmployeeUseCase.UseCase,
      useFactory: (EmployeeRepository: EmployeeRepository.Repository) => {
        return new UpdateEmployeeUseCase.UseCase(EmployeeRepository);
      },
      inject: ['EmployeeRepository'],
    },
    {
      provide: ListEmployeesUseCase.UseCase,
      useFactory: (EmployeeRepository: EmployeeRepository.Repository) => {
        return new ListEmployeesUseCase.UseCase(EmployeeRepository);
      },
      inject: ['EmployeeRepository'],
    },
    {
      provide: DeleteEmployeeUseCase.UseCase,
      useFactory: (EmployeeRepository: EmployeeRepository.Repository) => {
        return new DeleteEmployeeUseCase.UseCase(EmployeeRepository);
      },
      inject: ['EmployeeRepository'],
    },
  ],
})
export class EmployeesModule { }
