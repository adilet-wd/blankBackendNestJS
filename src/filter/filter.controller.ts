import { Body, Controller, Post } from '@nestjs/common';
import { FilterModel } from './entities/filter.model';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {

  constructor(private filterService: FilterService) {}

  @Post()
  async createFilter(
    @Body() filterData: { name: string, description: string },
  ): Promise<FilterModel> {
    return this.filterService.createFilter(filterData);
  }
}
