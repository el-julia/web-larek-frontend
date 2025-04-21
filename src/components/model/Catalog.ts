import { Model } from '../base/Model';
import { Product } from '../../types';

export class Catalog extends Model<Product[]> {
	setProducts(products: Product[]) {
		this.changed(products);
	}
}
