import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PartnerService, PrismaService],
  controllers: [PartnerController]
})
export class PartnerModule {}
