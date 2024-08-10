import { Module } from '@nestjs/common'
import { FilterModule } from './filter/filter.module';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FilterModule, PartnerModule, AuthModule],
  controllers: [],  
  providers: [AppService],
})
export class AppModule {}
