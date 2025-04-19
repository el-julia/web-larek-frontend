import { Model } from '../base/Model';
import { Product } from '../../types';
import { ProductsEvents } from '../events/ProductsEvents';

export interface ICatalog {
	products: Product[];
}

export class Catalog extends Model<ICatalog>{
	setProducts(products: Product[]) {
		this.emitChanges(ProductsEvents.CHANGED, products);
	}
}