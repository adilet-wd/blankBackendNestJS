import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnerService } from './partner.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetPartnerDto } from './dto/get-partner.dto';

@ApiTags("Партнер")
@Controller('partner')
export class PartnerController {

  constructor(private partnerService: PartnerService) {}

  @ApiOperation({summary: "Создание партнера"})
  @Post("/")
  createPartner(@Body() partnerDto: CreatePartnerDto){
    return this.partnerService.createPartner(partnerDto);
  }

  @ApiOperation({summary: "Получение всех партнеров"})
  @Get("/")
  getAllPartners(){
    return this.partnerService.getAllPartners();
  }

  @ApiOperation({summary: "Получение партнера по id"})
  @Get("/:id")
  getPartnerById(@Param('id')id: number){
    return this.partnerService.getPartnerById(id);
  }

  @ApiOperation({summary: "Получение партнера по названию бренда"})
  @Get("/brand_name")
  getPartnerByBrandName(@Body() getPartnerDto: GetPartnerDto){
    return this.partnerService.getPartnerByBrandName(getPartnerDto);
  }

  @ApiOperation({summary: "Удаление партнера по id"})
  @Delete("/:id")
  deletePartnerById(@Param('id')id: number){
    return this.partnerService.deletePartnerById(id);
  }
    
  @ApiOperation({summary: "Удаление партнера по названию бренда"})
  @Delete("/brand_name")
  deletePartnerByBrandName(@Body() getPartnerDto: GetPartnerDto){
    return this.partnerService.deletePartnerByBrandName(getPartnerDto);
  }
}
