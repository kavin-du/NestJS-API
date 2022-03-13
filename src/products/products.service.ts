import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async insertProduct(title: string, desc: string, price: number) {
    const newProd = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProd.save()
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({ id: prod.id, title: prod.title, description: prod.description, price: prod.price }));
    // return this.products; // this returns a pointer
    // return [...this.products];
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number
  ) {
    const updatedProduct = await this.findProduct(productId);

    if (title) updatedProduct.title = title;
    if (desc) updatedProduct.description = desc;
    if (price) updatedProduct.price = price;

    updatedProduct.save();
  }

  async removeProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find the product'); // auto sends 404
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find the product'); // auto sends 404
    }

    if (!product) {
      throw new NotFoundException('Could not find the product'); // auto sends 404
    }
    return product;
  }

}