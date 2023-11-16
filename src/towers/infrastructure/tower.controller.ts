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
import { CreateTowerUseCase } from '../application/usecases/create-tower.usecase';
import { UpdateTowerUseCase } from '../application/usecases/update-tower.usecase';
import { GetTowerUseCase } from '../application/usecases/get-tower.usecase';
import { ListTowersUseCase } from '../application/usecases/list-towers.usecase';
import { DeleteTowerUseCase } from '../application/usecases/delete-tower.usecase';
import { CreateTowerDto } from './dto/create-tower.dto';
import { TowerOutput } from '../application/dto/tower-output';
import {
  TowerPresenter,
  TowersCollectionPresenter,
} from './presenters/tower.presenter';
import { ListTowerDto } from './dto/list-tower.dto';
import { UpdateTowerDto } from './dto/update-tower.dto';

@Controller('tower')
export class TowerController {
  @Inject(CreateTowerUseCase.UseCase)
  private createTowerUseCase: CreateTowerUseCase.UseCase;

  @Inject(UpdateTowerUseCase.UseCase)
  private updateTowerUseCase: UpdateTowerUseCase.UseCase;

  @Inject(GetTowerUseCase.UseCase)
  private getTowerUseCase: GetTowerUseCase.UseCase;

  @Inject(ListTowersUseCase.UseCase)
  private listTowersUseCase: ListTowersUseCase.UseCase;

  @Inject(DeleteTowerUseCase.UseCase)
  private deleteTowerUseCase: DeleteTowerUseCase.UseCase;

  static towerToResponse(output: TowerOutput) {
    return new TowerPresenter(output);
  }

  static listTowersToResponse(output: ListTowersUseCase.Output) {
    return new TowersCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createTowerDto: CreateTowerDto) {
    const output = await this.createTowerUseCase.execute(createTowerDto);
    return TowerController.towerToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListTowerDto) {
    const output = await this.listTowersUseCase.execute(searchParams);
    return TowerController.listTowersToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getTowerUseCase.execute({ id });
    return TowerController.towerToResponse(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTowerDto: UpdateTowerDto,
  ) {
    const output = await this.updateTowerUseCase.execute({
      id,
      ...updateTowerDto,
    });
    return TowerController.towerToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteTowerUseCase.execute({ id });
  }
}
