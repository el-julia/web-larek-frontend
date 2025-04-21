import { Model } from '../base/Model';
import { Product } from '../../types';
import { CatalogEvents } from '../events/CatalogEvents';

export class Catalog extends Model {
	setProducts(products: Product[]) {
		this.emitChanges(CatalogEvents.CHANGED, products);
	}
}
