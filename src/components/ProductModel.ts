import { Product, ProductList } from '../types';

// храним в этой модели массив наших продуктов

export class ProductModel {
	protected items: Product[] = [];
	constructor() {}


	// метод который выводит список всех товаров
	getItems(): Product[] {
		return this.items;
	}

	set products(items: Product[]) {
		this.items = items;
	}

	get products(): Product[] {
	return this.items;}
}