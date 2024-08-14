import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnerService } from './partner.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetPartnerDto } from './dto/get-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { UpdatePartnerByBrandNameDto } from './dto/update-partner-byBrandName.dto';

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

  @ApiOperation({summary: "Получение партнера по названию бренда"})
  @Get("/brand_name")
  getPartnerByBrandName(@Body() partnerDto: GetPartnerDto){
    return this.partnerService.getPartnerByBrandName(partnerDto);
  }

  @ApiOperation({summary: "Получение партнера по id"})
  @Get("/:id")
  getPartnerById(@Param('id')id: number){
    return this.partnerService.getPartnerById(id);
  }


  @ApiOperation({summary: "Удаление партнера по названию бренда"})
  @Delete("/brand_name")
  deletePartnerByBrandName(@Body() partnerDto: GetPartnerDto){
    return this.partnerService.deletePartnerByBrandName(partnerDto);
  }

  @ApiOperation({summary: "Удаление партнера по id"})
  @Delete("/:id")
  deletePartnerById(@Param('id')id: number){
    return this.partnerService.deletePartnerById(id);
  }


  @ApiOperation({summary: "Обновление партнера по названию бренда"})
  @Patch("/brand_name")
  updatePartnerByBrandName(@Body() partnerDto: UpdatePartnerByBrandNameDto) {
    const { brand_name, ...updateData} = partnerDto;
    return this.partnerService.updatePartnerByBrandName(brand_name, updateData);
  }


  @ApiOperation({summary: "Обновление партнера по id"})
  @Patch("/:id")
  updatePartnerById(@Param('id')id: number, @Body() partnerDto: Partial<UpdatePartnerDto>) {
    return this.partnerService.updatePartnerById(id, partnerDto);
  }

  }
