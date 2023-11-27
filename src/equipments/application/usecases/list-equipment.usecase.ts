import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import {
  EquipmentOutput,
  EquipmentOutputMapper,
} from '../dto/equipments-output';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';

export namespace ListEquipmentsUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<EquipmentOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EquipmentRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const params = new EquipmentRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: EquipmentRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return EquipmentOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
