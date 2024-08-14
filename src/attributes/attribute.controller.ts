import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { AttributeService } from './attribute.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAttributeByNameDto } from './dto/get-attribute-byName.dto';

@ApiTags("Характеристики")
@Controller('attributes')
export class AttributeController {
  constructor(private attributeService: AttributeService) {
  }

  @ApiOperation({summary: "Создание характеристик"})
  @Post()
  async createAttribute(@Body() attributeDto: CreateAttributeDto){
    return this.attributeService.createAttribute(attributeDto);
  }

  @ApiOperation({summary: "Получение всех характеристик"})
  @Get("/")
  async getAllAttributes(){
    return this.attributeService.getAllAttributes();
  }

  @ApiOperation({summary: "Получение характеристики по названию"})
  @Get("/name")
  async getAttributeByName(@Body() attributeDto: GetAttributeByNameDto){
    return this.attributeService.getAttributeByName(attributeDto);
  }

  @ApiOperation({summary: "Получение характеристики по id"})
  @Get("/:id")
  async getAttributeById(@Param('id')id: number){
    return this.attributeService.getAttributeById(id);
  }

  @ApiOperation({summary: "Удаление характеристики по названию"})
  @Delete("/name")
  async deleteAttributeByName(@Body() attributeDto: GetAttributeByNameDto){
    return this.attributeService.deleteAttributeByName(attributeDto);
  }

  @ApiOperation({summary: "Удаление характеристики по id"})
  @Delete("/:id")
  async deleteAttributeById(@Param('id')id: number){
    return this.attributeService.deleteAttributeById(id);
  }

  @ApiOperation({summary: "Обновление характеристики по названию"})
  @Patch("/name")
  async updateAttributeByName(@Body() attributeDto: CreateAttributeDto){
    return this.attributeService.updateAttributeByName(attributeDto);
  }

  @ApiOperation({summary: "Обновление характеристики по id"})
  @Patch("/:id")
  async updateAttributeById(@Param("id")id:number, @Body() attributeDto: Partial<CreateAttributeDto>) {
    return this.attributeService.updateAttributeById(id, attributeDto);
  }
}
