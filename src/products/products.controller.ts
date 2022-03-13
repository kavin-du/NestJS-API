import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { title } from "process";
import { ProductsService } from "./products.service";


@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductsService) {}
  
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);

    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get(':id') // get req does not have a body
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ){
    await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productService.removeProduct(prodId);
    return null;
  }
}