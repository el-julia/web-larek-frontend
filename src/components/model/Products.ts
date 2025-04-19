import { Model } from '../base/Model';
import { Product } from '../../types';
import { ProductsEvents } from '../events/ProductsEvents';

export interface ProductsData {
	products: Product[];
}

export class Products extends Model<ProductsData>{
	private products: Product[];

	setProducts(products: Product[]) {
		this.products = products;
		this.emitChanges(ProductsEvents.CHANGED, products);
	}
}