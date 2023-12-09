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
import { CreateProductionUseCase } from '../application/usecases/create-production.usecase';
import { UpdateProductionUseCase } from '../application/usecases/update-production.usecase';
import { GetProductionUseCase } from '../application/usecases/get-production.usecase';
import { ListProductionsUseCase } from '../application/usecases/list-production.usecase';
import { DeleteProductionUseCase } from '../application/usecases/delete-production.usecase';
import { AddTeamToProductionUseCase } from '../application/usecases/add-team-production.usecase';
import { RemoveTeamToProductionUseCase } from '../application/usecases/remove-team-production.usecase';
import { AddTowerToProductionUseCase } from '../application/usecases/add-tower-production.usecase';
import { RemoveTowerToProductionUseCase } from '../application/usecases/remove-tower-production.usecase';
import { ProductionOutput } from '../application/dto/production-output';
import {
  ProductionCollectionPresenter,
  ProductionPresenter,
} from './presenters/production.presenter';
import { CreateProductionDto } from './dto/create-production.dto';
import { ListProductionDto } from './dto/list-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { UpdateResourceProductionDto } from './dto/update-resource-production.dto';

@Controller('production')
export class ProductionsController {
  @Inject(CreateProductionUseCase.UseCase)
  private createProductionUseCase: CreateProductionUseCase.UseCase;

  @Inject(UpdateProductionUseCase.UseCase)
  private updateProductionUseCase: UpdateProductionUseCase.UseCase;

  @Inject(GetProductionUseCase.UseCase)
  private getProductionUseCase: GetProductionUseCase.UseCase;

  @Inject(ListProductionsUseCase.UseCase)
  private listProductionsUseCase: ListProductionsUseCase.UseCase;

  @Inject(DeleteProductionUseCase.UseCase)
  private deleteProductionUseCase: DeleteProductionUseCase.UseCase;

  @Inject(AddTeamToProductionUseCase.UseCase)
  private addTeamToProductionUseCase: AddTeamToProductionUseCase.UseCase;

  @Inject(RemoveTeamToProductionUseCase.UseCase)
  private removeTeamToProductionUseCase: RemoveTeamToProductionUseCase.UseCase;

  @Inject(AddTowerToProductionUseCase.UseCase)
  private addTowerToProductionUseCase: AddTowerToProductionUseCase.UseCase;

  @Inject(RemoveTowerToProductionUseCase.UseCase)
  private removeTowerToProductionUseCase: RemoveTowerToProductionUseCase.UseCase;

  static productionToResponse(output: ProductionOutput) {
    return new ProductionPresenter(output);
  }

  static listProductionsToResponse(output: ListProductionsUseCase.Output) {
    return new ProductionCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createProductionDto: CreateProductionDto) {
    const output = await this.createProductionUseCase.execute(
      createProductionDto,
    );
    return ProductionsController.productionToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: ListProductionDto) {
    const output = await this.listProductionsUseCase.execute(searchParams);
    return ProductionsController.listProductionsToResponse(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getProductionUseCase.execute({ id });
    return ProductionsController.productionToResponse(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    const output = await this.updateProductionUseCase.execute({
      id,
      ...updateProductionDto,
    });
    return ProductionsController.productionToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteProductionUseCase.execute({ id });
  }

  @Put('add-team/:id')
  async addTeam(
    @Param('id') id: string,
    @Body() updateResourceProductionDto: UpdateResourceProductionDto,
  ) {
    const output = await this.addTeamToProductionUseCase.execute({
      ...updateResourceProductionDto,
      teamId: id,
    });
    return ProductionsController.productionToResponse(output);
  }

  @Put('del-team/:id')
  async removeTeam(
    @Param('id') id: string,
    @Body() updateResourceProductionDto: UpdateResourceProductionDto,
  ) {
    const output = await this.removeTeamToProductionUseCase.execute({
      ...updateResourceProductionDto,
      teamId: id,
    });
    return ProductionsController.productionToResponse(output);
  }

  @Put('add-tower/:id')
  async addTower(
    @Param('id') id: string,
    @Body() updateResourceProductionDto: UpdateResourceProductionDto,
  ) {
    const output = await this.addTowerToProductionUseCase.execute({
      ...updateResourceProductionDto,
      towerId: id,
    });
    return ProductionsController.productionToResponse(output);
  }

  @Put('del-tower/:id')
  async removeTower(
    @Param('id') id: string,
    @Body() updateResourceProductionDto: UpdateResourceProductionDto,
  ) {
    const output = await this.removeTowerToProductionUseCase.execute({
      ...updateResourceProductionDto,
      towerId: id,
    });
    return ProductionsController.productionToResponse(output);
  }
}
