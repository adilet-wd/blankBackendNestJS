import { Injectable } from '@nestjs/common';
import { FilterModel } from './entities/filter.model';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilterService {

  constructor(private prisma: PrismaService) {}

  async createFilter(data: Prisma.FilterCreateInput): Promise<FilterModel> {
      return this.prisma.filter.create({
        data,
      })
  }

}
