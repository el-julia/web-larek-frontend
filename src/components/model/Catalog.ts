import { Model } from '../base/Model';
import { Product } from '../../types';
import { CatalogEvents } from '../events/CatalogEvents';

export interface ICatalog {
	products: Product[];
}

export class Catalog extends Model<ICatalog>{
	setProducts(products: Product[]) {
		this.emitChanges(CatalogEvents.CHANGED, products);
	}
}