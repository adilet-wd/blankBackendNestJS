import { Module } from '@nestjs/common'
import { FilterModule } from './filter/filter.module';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { AuthModule } from './auth/auth.module';
import { AttributeModule } from './attributes/attribute.module';

@Module({
  imports: [FilterModule, PartnerModule, AuthModule, AttributeModule],
  controllers: [],  
  providers: [AppService],
})
export class AppModule {}
