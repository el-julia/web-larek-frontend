import { Model } from '../base/Model';
import { Product } from '../../types';

export class Basket extends Model<Product[]> {
	private products: Product[] = [];

	getProducts(): Product[] {
		return this.products;
	}

	add(product: Product) {
		this.products.push(product);
		this.changed(this.products);
	}

	remove(product: Product) {
		this.products = this.products.filter(
			(cartProduct) => cartProduct.id !== product.id
		);
		this.changed(this.products);
	}

	clear() {
		this.products = [];
		this.changed(this.products);
	}
}
