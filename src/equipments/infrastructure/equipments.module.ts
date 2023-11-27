import { Module } from '@nestjs/common';
import { EquipmentsController } from './equipments.controller';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { EquipmentPrismaRepository } from './database/prisma/equipment-prisma.repository';
import { CreateEquipmentUseCase } from '../application/usecases/create-equipment.usecase';
import { EquipmentRepository } from '../domain/repositories/equipment.repository';
import { GetEquipmentUseCase } from '../application/usecases/get-equipment.usecase';
import { UpdateEquipmentUseCase } from '../application/usecases/update-equipment.usecase';
import { ListEquipmentsUseCase } from '../application/usecases/list-equipment.usecase';
import { DeleteEquipmentUseCase } from '../application/usecases/delete-equipment.usecase';

@Module({
  controllers: [EquipmentsController],
  providers: [
    // {
    //   provide: 'EquipmentRepository',
    //   useClass: EquipmentInMemoryRepository,
    // },
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'EquipmentRepository',
      useFactory: (prismaService: PrismaService) => {
        return new EquipmentPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateEquipmentUseCase.UseCase,
      useFactory: (EquipmentRepository: EquipmentRepository.Repository) => {
        return new CreateEquipmentUseCase.UseCase(EquipmentRepository);
      },
      inject: ['EquipmentRepository'],
    },
    {
      provide: GetEquipmentUseCase.UseCase,
      useFactory: (EquipmentRepository: EquipmentRepository.Repository) => {
        return new GetEquipmentUseCase.UseCase(EquipmentRepository);
      },
      inject: ['EquipmentRepository'],
    },
    {
      provide: UpdateEquipmentUseCase.UseCase,
      useFactory: (EquipmentRepository: EquipmentRepository.Repository) => {
        return new UpdateEquipmentUseCase.UseCase(EquipmentRepository);
      },
      inject: ['EquipmentRepository'],
    },
    {
      provide: ListEquipmentsUseCase.UseCase,
      useFactory: (EquipmentRepository: EquipmentRepository.Repository) => {
        return new ListEquipmentsUseCase.UseCase(EquipmentRepository);
      },
      inject: ['EquipmentRepository'],
    },
    {
      provide: DeleteEquipmentUseCase.UseCase,
      useFactory: (EquipmentRepository: EquipmentRepository.Repository) => {
        return new DeleteEquipmentUseCase.UseCase(EquipmentRepository);
      },
      inject: ['EquipmentRepository'],
    },
  ],
})
export class EquipmentsModule { }
