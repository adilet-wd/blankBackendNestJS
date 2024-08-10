import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnerModel } from './entities/partner.model';
import { PrismaService } from '../prisma.service';
import { GetPartnerDto } from './dto/get-partner.dto';

@Injectable()
export class PartnerService {

  constructor( private prismaService: PrismaService) {}

  async createPartner(data: CreatePartnerDto): Promise<PartnerModel> {

    return this.prismaService.partner.create({
      data,
    });

  }

  async getAllPartners() : Promise<PartnerModel[]> {
    return this.prismaService.partner.findMany();
  }

  async getPartnerById(id: number) : Promise<PartnerModel> {
    return this.prismaService.partner.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  async getPartnerByBrandName(partnerDto: GetPartnerDto) : Promise<PartnerModel> {
    return this.prismaService.partner.findUnique({
      where: {
        brand_name: partnerDto.brand_name
      }
    });
  }

  async deletePartnerById(id: number): Promise<PartnerModel> {
    return this.prismaService.partner.delete({
      where: {
        id: Number(id)
      },
    });
  }

  async deletePartnerByBrandName(partnerDto: GetPartnerDto): Promise<PartnerModel> {
    return this.prismaService.partner.delete({
      where: {
          brand_name: partnerDto.brand_name
      },
    });
  }

  async updatePartnerById(id: number, data: Partial<CreatePartnerDto>): Promise<PartnerModel> {
    return this.prismaService.partner.update({
      where: {
        id: Number(id)
      },
      data,
    });
  }

  async updatePartnerByBrandName(brand_name: string, data: Partial<CreatePartnerDto>): Promise<PartnerModel> {
    return this.prismaService.partner.update({
      where: {
        brand_name: brand_name
      },
      data,
    });
  }
}
