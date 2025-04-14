import { Cart, CartItem } from '../types';
import { IEvents } from './base/Events';
// Модель корзины

// @ToDo добавить в документацию


export class CartModel implements Cart {
	constructor(protected events: IEvents ) {
	}
	items: CartItem[];

	addItem(item: CartItem) {
		this.items.push(item);
		this.events.emit('items:changed');
	}

	deleteItem(id: string) {
		this.items = this.items.filter(item => item.id !== id);
		this.events.emit('items:changed');
	}

}