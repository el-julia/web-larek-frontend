import { Product, ProductList } from '../types';
import { IEvents } from './base/Events';

// храним в этой модели массив наших продуктов

export class ProductModel {
	protected items: Product[] = [];

	constructor(protected events: IEvents) {
	}


	set products(items: Product[]) {
		this.items = items;
		this.events.emit('items:changed');
	}

	get products(): Product[] {
		return this.items
	}
}