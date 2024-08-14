import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [AttributeService, PrismaService],
  controllers: [AttributeController]
})
export class AttributeModule {}
