import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { title } from "process";
import { ProductsService } from "./products.service";


@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductsService) {}
  
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);

    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id') // get req does not have a body
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ){
    this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }
}