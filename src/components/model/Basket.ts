import { Model } from '../base/Model';
import { Product } from '../../types';
import { BasketEvents } from '../events/BasketEvents';

export class Basket extends Model {
	private products: Product[] = [];

	getProducts(): Product[] {
		return this.products;
	}

	add(product: Product) {
		this.products.push(product);
		this.emitChanges(BasketEvents.CHANGED, this.products);
	}

	remove(product: Product) {
		this.products = this.products.filter(
			(cartProduct) => cartProduct.id !== product.id
		);
		this.emitChanges(BasketEvents.CHANGED, this.products);
	}

	clear() {
		this.products = [];
		this.emitChanges(BasketEvents.CHANGED, this.products);
	}
}
