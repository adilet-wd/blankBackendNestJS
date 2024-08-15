import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { PrismaService } from '../prisma.service';
import { AttributeValueService } from './services/attribute-value.service';
import { AttributeValueController } from './controllers/attribute-value.controller';

@Module({
  providers: [AttributeService, AttributeValueService, PrismaService],
  controllers: [AttributeController, AttributeValueController]
})
export class AttributeModule {}
