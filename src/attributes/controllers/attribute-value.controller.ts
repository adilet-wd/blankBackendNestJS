import { Body, Controller, Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttributeValueService } from '../services/attribute-value.service';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { DeleteAttributeValueDto } from '../dto/delete-attribute-value.dto';


@ApiTags("Значения характеристик")
@Controller('attribute-value')
export class AttributeValueController {

  constructor(private attributeValueService: AttributeValueService) {};

  @ApiOperation({summary: "Создание значения характеристики"})
  @Post("/")
  async createAttributeValue(@Body() attributeValueDto: CreateAttributeValueDto){
    return this.attributeValueService.createAttributeValue(attributeValueDto);
  }

  @ApiOperation({summary: "Получение всех значений характеристик"})
  @Get("/")
  async getAllAttributeValues(){
    return this.attributeValueService.getAllAttributeValues();
  }

  @ApiOperation({summary: "Удаление значения характеристики"})
  @Delete("/")
  async deleteAttributeValue(@Body() attributeValueDto: DeleteAttributeValueDto){
    return this.attributeValueService.deleteAttributeValue(attributeValueDto);
  };
  
  @ApiOperation({summary: "Обновление значения характеристики"})
  @Patch("/")
  async updateAttributeValue(@Body() attributeValueDto: UpdateAttributeValueDto){
    return this.attributeValueService.updateAttributeValue(attributeValueDto);
  }

}