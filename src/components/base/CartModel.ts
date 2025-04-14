import { Cart, CartItem } from '../../types';

// @ToDo добавить в документацию
export class CartModel implements Cart {

	items: CartItem[];

	addItem(item: CartItem) {
		this.items.push(item);
	}

	deleteItem(id: string) {
		this.items = this.items.filter(item => item.id !== id);
	}

}