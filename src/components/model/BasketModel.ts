import { AModel } from '../base/AModel';
import { Product } from '../../types';
import { BasketEvents } from '../events/BasketEvents';

export interface IBasketData {
	products: Product[];
	total: number;
}

export class BasketModel extends AModel {
	private products: Product[] = [];

	getProducts(): Product[] {
		return this.products;
	}

	getTotal(): number {
		return this.products.reduce((total, product) => total + product.price, 0);
	}

	add(product: Product) {
		this.products.push(product);
		this.changed();
	}

	remove(product: Product) {
		this.products = this.products.filter(
			(cartProduct) => cartProduct.id !== product.id
		);
		this.changed();
	}

	clear() {
		this.products = [];
		this.changed();
	}

	private changed() {
		this.emitChanges(BasketEvents.CHANGED, {
			products: this.getProducts(),
			total: this.getTotal(),
		} as IBasketData);
	}
}
