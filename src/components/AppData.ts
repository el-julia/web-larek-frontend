import { Product } from '../types';
import { Model } from './base/Model';

export type CatalogChangeEvent = {
	catalog: Product[]
};


export class ProductItem extends Model<Product> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}


export class AppState extends Model<any> {
	basket: string;
	catalog: Product[];

	preview: string | null;

	setCatalog(items: Product[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: items });
	}

	setPreview(item: ProductItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}
}