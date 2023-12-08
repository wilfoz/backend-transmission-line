import { Module } from '@nestjs/common';
import { ProductionsController } from './productions.controller';

@Module({
  controllers: [ProductionsController],
  providers: [],
})
export class ProductionsModule { }
