import ProductsController from './controller/ProductsController'
import ProductsModel from './model/ProductsModel'
import ProductsView from './view/ProductsView'

export default class Products {
  public static readonly createView = (): ProductsView => {
    const model = new ProductsModel()
    const controller = new ProductsController(model)
    return new ProductsView(controller)  
  }
}
