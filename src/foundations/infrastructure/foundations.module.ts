import { Module } from '@nestjs/common';
import { FoundationsController } from './foundations.controller';
import { PrismaService } from '../../shared/infrastructure/database/prisma/prisma.service';
import { FoundationPrismaRepository } from './database/prisma/foundation-prisma.repository';
import { CreateFoundationUseCase } from '../application/usecases/create-foundation.usecase';
import { FoundationRepository } from '../domain/repositories/foundation.repository';
import { GetFoundationUseCase } from '../application/usecases/get-foundation.usecase';
import { UpdateFoundationUseCase } from '../application/usecases/update-foundation.usecase';
import { ListFoundationsUseCase } from '../application/usecases/list-foundation.usecase';
import { DeleteFoundationUseCase } from '../application/usecases/delete-foundation.usecase';

@Module({
  controllers: [FoundationsController],
  providers: [
    // {
    //   provide: 'FoundationRepository',
    //   useClass: FoundationInMemoryRepository,
    // },
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'FoundationRepository',
      useFactory: (prismaService: PrismaService) => {
        return new FoundationPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateFoundationUseCase.UseCase,
      useFactory: (FoundationRepository: FoundationRepository.Repository) => {
        return new CreateFoundationUseCase.UseCase(FoundationRepository);
      },
      inject: ['FoundationRepository'],
    },
    {
      provide: GetFoundationUseCase.UseCase,
      useFactory: (FoundationRepository: FoundationRepository.Repository) => {
        return new GetFoundationUseCase.UseCase(FoundationRepository);
      },
      inject: ['FoundationRepository'],
    },
    {
      provide: UpdateFoundationUseCase.UseCase,
      useFactory: (FoundationRepository: FoundationRepository.Repository) => {
        return new UpdateFoundationUseCase.UseCase(FoundationRepository);
      },
      inject: ['FoundationRepository'],
    },
    {
      provide: ListFoundationsUseCase.UseCase,
      useFactory: (FoundationRepository: FoundationRepository.Repository) => {
        return new ListFoundationsUseCase.UseCase(FoundationRepository);
      },
      inject: ['FoundationRepository'],
    },
    {
      provide: DeleteFoundationUseCase.UseCase,
      useFactory: (FoundationRepository: FoundationRepository.Repository) => {
        return new DeleteFoundationUseCase.UseCase(FoundationRepository);
      },
      inject: ['FoundationRepository'],
    },
  ],
})
export class FoundationsModule { }
