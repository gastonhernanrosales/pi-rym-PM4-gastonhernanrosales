import { Body, Controller ,Delete,Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('products')
export class ProductsController {
    
  constructor(private readonly productsService: ProductsService) {}
  


 
  
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page') page: number = 1,
  @Query('limit') limit: number = 5) {
      return this.productsService.findAll(page,limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id') id: number) {
      return this.productsService.getProductById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProduct(@Body() createProductDto: Product) {
    const id = await this.productsService.createProduct(createProductDto);
    return { id };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateProduct(@Param('id') id: number, @Body() updateProductDto: Partial<Product>) {
      return this.productsService.updateProduct(id, updateProductDto);
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  removeProduct(@Param('id') id: number) {
      return this.productsService.removeProduct(id);
  }
  @Post('seeder')
  @HttpCode(HttpStatus.OK)
  async seedProducts() {
    await this.productsService.addProducts();
    return { message: 'Products seeded successfully.' };
  }
}

