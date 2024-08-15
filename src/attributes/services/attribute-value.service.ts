import { HttpException, Injectable } from '@nestjs/common';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { AttributeValueModel } from '../entities/attribute_value.model';
import { PrismaService } from '../../prisma.service';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { DeleteAttributeValueDto } from '../dto/delete-attribute-value.dto';

@Injectable()
export class AttributeValueService {

  constructor(
    private prismaService: PrismaService,
  ) {};

  // Получение всех значений характеристик
  async getAllAttributeValues(): Promise<AttributeValueModel[]> {
    return this.prismaService.attribute_Value.findMany();
  }

  // Создание значения характеристики
  async createAttributeValue(data: CreateAttributeValueDto): Promise<AttributeValueModel> {
    // Проверка на существование характеристики с таким названием
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        name: data.attribute_name
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

    // Проверка на существование значения характеристики с таким названием
    const attributeValue = attribute.attribute_Value.some(value => value.value === data.value);
    if (attributeValue) throw new HttpException('Значение характеристики с таким названием уже существует', 400);

    return this.prismaService.attribute_Value.create({
      data: {
        value: data.value,
        attribute_id: attribute.id,
      }
    });
  }

  // Обновление значения характерист
  async updateAttributeValue(attributeValueDto: UpdateAttributeValueDto): Promise<AttributeValueModel>{
    // Проверка на существование характеристики с таким названием
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        name: attributeValueDto.attribute_name
      },
      include: {
        attribute_Value: true
      }
    });
    if (!attribute) throw new HttpException('Характеристика с таким названием не найдена', 404);

    // Проверка на существование значения характеристики со старым названием
    const attributeValue = attribute.attribute_Value.find(value => value.value === attributeValueDto.current_value) as AttributeValueModel;
    if (!attributeValue) throw new HttpException('Значение характеристики с таким названием не найдена', 404);

    // Проверка на существование значения характеристики с таким названием
    const attributeValueNew = attribute.attribute_Value.find(value => value.value === attributeValueDto.updated_value) as AttributeValueModel;
    if (attributeValueNew) throw new HttpException('Значение характеристики с таким названием уже существует', 400);


    return this.prismaService.attribute_Value.update({
      where: {
        id: Number(attributeValue.id)
      },
      data: {
        value: attributeValueDto.updated_value
      }
    });
  }

  // Удаление значения характеристики
  async deleteAttributeValue(data: DeleteAttributeValueDto): Promise<AttributeValueModel>{
    // Проверка на существование характеристики с таким названием
    const attribute = await this.prismaService.attribute.findUnique({
      where: {
        name: data.attribute_name
      },
      include: {
        attribute_Value: true
      }
    });
    if (!attribute) throw new HttpException('Характеристика с таким названием не найдена', 404);

    // Проверка на существование значения характеристики с таким названием
    const attributeValue = attribute.attribute_Value.find(value => value.value === data.value) as AttributeValueModel;
    if (!attributeValue) throw new HttpException('Значение характеристики с таким названием не найдена', 404);

    return this.prismaService.attribute_Value.delete({
      where: {
        id: Number(attributeValue.id)
      }
    });

  };
}