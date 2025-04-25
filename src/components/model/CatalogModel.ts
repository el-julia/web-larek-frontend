import { AModel } from '../base/AModel';
import { Product } from '../../types';
import { CatalogEvents } from '../events/CatalogEvents';

export class CatalogModel extends AModel {
	setProducts(products: Product[]) {
		this.emitChanges(CatalogEvents.CHANGED, products);
	}
}
