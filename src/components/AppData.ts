import { Product } from '../types';
import { Model } from './base/Model';

export type CatalogChangeEvent = {
	catalog: Product[]
};

export class AppState extends Model<any> {
	catalog: Product[];

	setCatalog(items: Product[]) {
		this.catalog = items;
	}
}