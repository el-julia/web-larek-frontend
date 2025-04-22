import { AModel } from '../base/AModel';
import { Product } from '../../types';
import { CatalogEvents } from '../events/CatalogEvents';

export class Catalog extends AModel {
	setProducts(products: Product[]) {
		this.emitChanges(CatalogEvents.CHANGED, products);
	}
}
