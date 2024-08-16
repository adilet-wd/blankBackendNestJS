import { Module } from '@nestjs/common'
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { AuthModule } from './auth/auth.module';
import { AttributeModule } from './attributes/attribute.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PartnerModule, AuthModule, AttributeModule, ProductModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
