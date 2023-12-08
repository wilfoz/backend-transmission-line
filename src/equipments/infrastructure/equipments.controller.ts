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
import { CreateEquipmentUseCase } from '../application/usecases/create-equipment.usecase';
import { UpdateEquipmentUseCase } from '../application/usecases/update-equipment.usecase';
import { GetEquipmentUseCase } from '../application/usecases/get-equipment.usecase';
import { ListEquipmentsUseCase } from '../application/usecases/list-equipment.usecase';
import { DeleteEquipmentUseCase } from '../application/usecases/delete-equipment.usecase';
import { EquipmentOutput } from '../application/dto/equipments-output';
import {
  EquipmentPresenter,
  EquipmentsCollectionPresenter,
} from './presenters/equipment.presenter';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { ListEquipmentDto } from './dto/list-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('equipments')
@Controller('equipment')
export class EquipmentsController {
  @Inject(CreateEquipmentUseCase.UseCase)
  private createEquipmentUseCase: CreateEquipmentUseCase.UseCase;

  @Inject(UpdateEquipmentUseCase.UseCase)
  private updateEquipmentUseCase: UpdateEquipmentUseCase.UseCase;

  @Inject(GetEquipmentUseCase.UseCase)
  private getEquipmentUseCase: GetEquipmentUseCase.UseCase;

  @Inject(ListEquipmentsUseCase.UseCase)
  private listEquipmentsUseCase: ListEquipmentsUseCase.UseCase;

  @Inject(DeleteEquipmentUseCase.UseCase)
  private deleteEquipmentUseCase: DeleteEquipmentUseCase.UseCase;

  static equipmentToResponse(output: EquipmentOutput) {
    return new EquipmentPresenter(output);
  }

  static listEquipmentsToResponse(output: ListEquipmentsUseCase.Output) {
    return new EquipmentsCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto) {
    const output = await this.createEquipmentUseCase.execute(
      createEquipmentDto,
    );
    return EquipmentsController.equipmentToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListEquipmentDto) {
    const output = await this.listEquipmentsUseCase.execute(searchParams);
    return EquipmentsController.listEquipmentsToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getEquipmentUseCase.execute({ id });
    return EquipmentsController.equipmentToResponse(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    const output = await this.updateEquipmentUseCase.execute({
      id,
      ...updateEquipmentDto,
    });
    return EquipmentsController.equipmentToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteEquipmentUseCase.execute({ id });
  }
}
