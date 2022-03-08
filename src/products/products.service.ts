import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    // not a good ID, only for demo
    const id = new Date().toISOString();
    const newprod = new Product(id, title, desc, price);
    this.products.push(newprod); 
    return id;
  }

  getProducts() {
    // return this.products; // this returns a pointer
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ... product };
  }

  updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = {...product};

    if(title) updatedProduct.title = title;
    if(desc) updatedProduct.description = desc;
    if(price) updatedProduct.price = price;

    this.products[index] = updatedProduct;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if(!product) {
      throw new NotFoundException('Could not find the product'); // auto sends 404
    }
    return [product, productIndex];
  }

}