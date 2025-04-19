import { Model } from '../base/Model';
import { Product } from '../../types';
import { CartEvents } from '../events/CartEvents';

export interface ICart {
	products: Product[];
}

export class Cart extends Model<ICart> {
	private products: Product[] = [];

	getProducts(): Product[] {
		return this.products;
	}

	add(product: Product) {
		this.products.push(product);
		this.cartChanged();
	}

	remove(product: Product) {
		this.products = this.products.filter(
			(cartProduct) => cartProduct.id !== product.id
		);
		this.cartChanged();
	}

	clear() {
		this.products = [];
		this.cartChanged();
	}

	private cartChanged() {
		this.emitChanges(CartEvents.CHANGED, this.products);
	}
}
