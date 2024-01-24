import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFoundationUseCase } from '../application/usecases/create-foundation.usecase';
import { UpdateFoundationUseCase } from '../application/usecases/update-foundation.usecase';
import { GetFoundationUseCase } from '../application/usecases/get-foundation.usecase';
import { ListFoundationsUseCase } from '../application/usecases/list-foundation.usecase';
import { DeleteFoundationUseCase } from '../application/usecases/delete-foundation.usecase';
import { FoundationOutput } from '../application/dto/foundation-output';
import {
  FoundationPresenter,
  FoundationsCollectionPresenter,
} from './presenters/foundation.presenter';
import { CreateFoundationDto } from './dto/create-foundation.dto';
import { ListFoundationDto } from './dto/list-foundation.dto';
import { UpdateFoundationDto } from './dto/update-foundation.dto';

@ApiTags('Foundations')
@Controller('foundation')
export class FoundationsController {
  @Inject(CreateFoundationUseCase.UseCase)
  private createFoundationUseCase: CreateFoundationUseCase.UseCase;

  @Inject(UpdateFoundationUseCase.UseCase)
  private updateFoundationUseCase: UpdateFoundationUseCase.UseCase;

  @Inject(GetFoundationUseCase.UseCase)
  private getFoundationUseCase: GetFoundationUseCase.UseCase;

  @Inject(ListFoundationsUseCase.UseCase)
  private listFoundationsUseCase: ListFoundationsUseCase.UseCase;

  @Inject(DeleteFoundationUseCase.UseCase)
  private deleteFoundationUseCase: DeleteFoundationUseCase.UseCase;

  static FoundationToResponse(output: FoundationOutput) {
    return new FoundationPresenter(output);
  }

  static listFoundationsToResponse(output: ListFoundationsUseCase.Output) {
    return new FoundationsCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createFoundationDto: CreateFoundationDto) {
    const output = await this.createFoundationUseCase.execute(
      createFoundationDto,
    );
    return FoundationsController.FoundationToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListFoundationDto) {
    const output = await this.listFoundationsUseCase.execute(searchParams);
    return FoundationsController.listFoundationsToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getFoundationUseCase.execute({ id });
    return FoundationsController.FoundationToResponse(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFoundationDto: UpdateFoundationDto,
  ) {
    const output = await this.updateFoundationUseCase.execute({
      id,
      ...updateFoundationDto,
    });
    return FoundationsController.FoundationToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteFoundationUseCase.execute({ id });
  }
}
