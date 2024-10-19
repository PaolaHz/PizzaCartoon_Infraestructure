// import products_json from '../../database/products.json'
import Environment from '../shared/Environment'
import Product from '../types/Product'
import path from 'path'
import fs, { promises as fspr } from 'fs'

export default class ProductsModel {
  public fetchMovies = async(): Promise<Product[]> => {
    const products_json = await this.productsJson()
    const movies = (products_json as Product[]).map((product: Product) => {
      return {
        "id": product.id,
        "title": product.title,
        "amount": product.amount,
        "price": product.price,
        "description": product.description,
        "favorite": product.favorite,
        "discount": product.discount,
        "discountPer": product.discountPer,
        "discountUni": product.discountUni,
        "image": `${Environment.getDomain()}/api/v1.0/store/products/product/image/${product.id
          }.jpg`,
      }
    })
    return movies
  }

  public getMovieImage = async (file: string): Promise<string> => {
    const absolutePath = path.join(__dirname, `../../database/assets/`)
    const defaultImage = 'not-icon.png'
    try {
      await fspr.access(absolutePath + file, fspr.constants.F_OK)
      const stats = await fspr.stat(absolutePath + file)
      if (stats.isFile()) {
        return absolutePath + file
      }
      return absolutePath + defaultImage
    } catch (err) {
      return absolutePath + defaultImage
    }
  }

  public newProduct = async(product: Product): Promise<boolean> => {
    const data = await this.productsJson()

    const last = data[data.length - 1];
    if (last) {
      product.id = last.id + 1;
    }else{
      product.id = 1;
    }

    data.push(product)
    this.writeProductsToFile(data)
    return true
  }

  public deleteProduct = async(productId: number): Promise<boolean> => {
    const data = await this.productsJson()
    const index = data.findIndex((p) => p.id === productId)
    data.splice(index, 1)
    this.writeProductsToFile(data)
    return true
  }

  public updateProduct = async(product: Product): Promise<boolean> => {
    const data = await this.productsJson()
    const index = data.findIndex((p) => p.id === product.id)

    if (index === -1) {
      return false
    }

    data[index] = product
    this.writeProductsToFile(data)
    return true
  }

  public async productsJson(): Promise<Product[]> {
    try {
      const route = path.resolve(__dirname, '../../database/products.json');

      const data = await fspr.readFile(route, 'utf-8');

      return JSON.parse(data) as Product[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  public writeProductsToFile(data: Product[]): void {
    const filePath = '../../database/products.json';
    try {
      const jsonData = JSON.stringify(data, null, 2);

      fs.writeFileSync(path.resolve(__dirname, filePath), jsonData, 'utf8');
      console.log('JSON guardado');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
