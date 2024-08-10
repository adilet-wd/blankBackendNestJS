import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FilterService, PrismaService],
  controllers: [FilterController]
})
export class FilterModule {}
