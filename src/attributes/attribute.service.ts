import { HttpException, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { AttributeModel } from './entities/attribute.model';
import { PrismaService } from '../prisma.service';
import { GetAttributeByNameDto } from './dto/get-attribute-byName.dto';

@Injectable()
export class AttributeService {
  constructor(private prismaService: PrismaService) {}


  // Получение всех характеристик
  async getAllAttributes(): Promise<AttributeModel[]> {
    return this.prismaService.attribute.findMany();
  }


  // Получение характеристики по id
  async getAttributeById(id: number): Promise<AttributeModel> {
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (!attribute) throw new HttpException('Характеристика с таким id не найдена', 404);
    return attribute;
  }


  // Получение характеристики по названию
  async getAttributeByName(attributeDto: GetAttributeByNameDto): Promise<AttributeModel> {
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        name: attributeDto.name
      }
    });
    if (!attribute) throw new HttpException('Характеристика с таким названием не найдена', 404);
    return attribute;
  }


  // Создание характеристики по дто
  async createAttribute(data: CreateAttributeDto): Promise<AttributeModel> {
    // Проверка на существование характеристики с таким именем
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        name: data.name
      }
    })

    if(attribute) throw new HttpException('Атрибут с таким именем уже существует', 400);

    return this.prismaService.attribute.create({
      data,
    });
  }


  // Удаление характеристики по айди
  async deleteAttributeById(id: number): Promise<AttributeModel> {
    // Проверка на существование характеристики с таким id
    await this.getAttributeById(id);
    return this.prismaService.attribute.delete({
      where: {
        id: Number(id)
      }
    });
  }


  // Удаление характеристики по названию
  async deleteAttributeByName(attributeDto: GetAttributeByNameDto): Promise<AttributeModel> {
    // Проверка на существование характеристики с таким именем
    await this.getAttributeByName(attributeDto);
    return this.prismaService.attribute.delete({
      where: {
        name: attributeDto.name
      }
    });
  }


  // Обновление характеристики по айди
  async updateAttributeById(id: number, data: Partial<CreateAttributeDto>): Promise<AttributeModel> {
    // Проверка на существование характеристики с таким id
    await this.getAttributeById(id);
    return this.prismaService.attribute.update({
      where: {
        id: Number(id)
      },
      data
    });
  }


  // Обновление характеристики по названию
  async updateAttributeByName(attributeDto: GetAttributeByNameDto):Promise<AttributeModel> {
    const data = attributeDto;
    // Проверка на существование характеристики с таким названием
    await this.getAttributeByName(attributeDto);
    return this.prismaService.attribute.update({
      where: {
        name: attributeDto.name
      },
      data
    });
  }


}
