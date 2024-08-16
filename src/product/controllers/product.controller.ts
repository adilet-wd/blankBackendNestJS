import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {


  @Post('')
  @UseGuards(JwtGuard)
  async createProduct() {
    return 'Product created';
  }

}
