import { HttpException, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { AttributeModel } from '../entities/attribute.model';
import { PrismaService } from '../../prisma.service';
import { GetAttributeByNameDto } from '../dto/get-attribute-byName.dto';

@Injectable()
export class AttributeService {
  constructor(private prismaService: PrismaService) {
  }

  // Характеристики

  // Получение всех характеристик
  async getAllAttributes(): Promise<AttributeModel[]> {
    return this.prismaService.attribute.findMany({
      include: {
        attribute_Value: {
          select: {
            value: true
          }
        }
      }
    });
  }

  // Получение характеристики по id
  async getAttributeById(id: number): Promise<AttributeModel> {
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        attribute_Value: {
          select: {
            value: true
          }
        }
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
      },
      include: {
        attribute_Value: {
          select: {
            value: true
          }
        }
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

    if (attribute) throw new HttpException('Атрибут с таким именем уже существует', 400);

    return this.prismaService.attribute.create({
      data,
    });
  }

  // Удаление характеристики по айди
  async deleteAttributeById(id: number): Promise<AttributeModel> {
    // Проверка на существование характеристики с таким id
    const attribute = await this.getAttributeById(id);

    return this.prismaService.$transaction(async (prisma) => {
      // Удаление всех значений характеристики
      await prisma.attribute_Value.deleteMany({
        where: {
          attribute_id: attribute.id
        }
      });

      // Удаление характеристики
      return prisma.attribute.delete({
        where: {
          id: attribute.id
        }
      });
    });
  }

  // Удаление характеристики по названию
  async deleteAttributeByName(attributeDto: GetAttributeByNameDto): Promise<AttributeModel> {
    // Проверка на существование характеристики с таким именем
    const attribute = await this.getAttributeByName(attributeDto);

    return this.prismaService.$transaction(async (prisma) => {
      // Удаление всех значений характеристики
      await prisma.attribute_Value.deleteMany({
        where: {
          attribute_id: attribute.id
        }
      });

      // Удаление характеристики
      return prisma.attribute.delete({
        where: {
          id: attribute.id
        }
      });
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
  async updateAttributeByName(attributeDto: GetAttributeByNameDto): Promise<AttributeModel> {
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
