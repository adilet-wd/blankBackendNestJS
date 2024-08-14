import { HttpException, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnerModel } from './entities/partner.model';
import { PrismaService } from '../prisma.service';
import { GetPartnerDto } from './dto/get-partner.dto';

@Injectable()
export class PartnerService {

  constructor( private prismaService: PrismaService) {}


  // Получение всех партнеров
  async getAllPartners() : Promise<PartnerModel[]> {
    return this.prismaService.partner.findMany();
  }


  // Получение партнера по id
  async getPartnerById(id: number) : Promise<PartnerModel> {
    // Проверка на существование партнера с таким id
    const partner = await this.prismaService.partner.findUnique({
      where: {
        id: Number(id)
      }
    });

    if(!partner) throw new HttpException('Партнер с таким id не найден', 404);

    return partner;
  }


  // Получение партнера по названию бренда
  async getPartnerByBrandName(partnerDto: GetPartnerDto) : Promise<PartnerModel> {
    // Проверка на существование партнера с таким названием
    const partner = await this.prismaService.partner.findUnique({
      where: {
        brand_name: partnerDto.brand_name
      }
    });

    if(!partner) throw new HttpException('Партнер с таким названием не найден', 404);

    return partner;
  }


  // Создание партнера по дто
  async createPartner(data: CreatePartnerDto): Promise<PartnerModel> {

    // Проверка на существование партнера с таким названием
    const partner = await this.prismaService.partner.findUnique({
      where: {
        brand_name: data.brand_name
      }
    });
    if(partner) throw new HttpException('Партнер с таким названием уже существует', 400);


    return this.prismaService.partner.create({
      data,
    });

  }


  // Удаление партнера по id
  async deletePartnerById(id: number): Promise<PartnerModel> {
    // Проверка на существование партнера с таким id
    await this.getPartnerById(id);

    return this.prismaService.partner.delete({
      where: {
        id: Number(id)
      },
    });
  }


  // Удаление партнера по названию бренда
  async deletePartnerByBrandName(partnerDto: GetPartnerDto): Promise<PartnerModel> {
    // Проверка на существование партнера с таким названием
    await this.getPartnerByBrandName(partnerDto);

    return this.prismaService.partner.delete({
      where: {
          brand_name: partnerDto.brand_name
      },
    });
  }


  // Обновление партнера по id
  async updatePartnerById(id: number, data: Partial<CreatePartnerDto>): Promise<PartnerModel> {
    // Проверка на существование партнера с таким id
    await this.getPartnerById(id);

    return this.prismaService.partner.update({
      where: {
        id: Number(id)
      },
      data,
    });
  }


  // Обновление партнера по названию бренда
  async updatePartnerByBrandName(brand_name: string, data: Partial<CreatePartnerDto>): Promise<PartnerModel>  {
    // Проверка на существование партнера с таким названием
    await this.getPartnerByBrandName({brand_name});

    return this.prismaService.partner.update({
      where: {
        brand_name: brand_name
      },
      data,
    });
  }
}
