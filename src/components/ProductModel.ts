import { Product } from '../types';

// храним в этой модели массив наших продуктов

export class ProductModel {
	protected items: Product[] = [];
	constructor() {}

	//метод для добавления товара в корзину
	addItemToCart(item: Product) {
		this.items.push(item);
	};


	//метод удаления товара из корзины
	removeItemFromCart(id: number) {
		this.items = this.items.filter(item => item.id !== id);
	};

	// метод который выводит список всех товаров
	getItems(): Product[] {
		return this.items;
	};

	// метод который получает один товар
	getItem(id: number): Product {
		return this.items.find(item => item.id === id);
	};

	// метод который выбирает способ оплаты
	selectPayment() {}

	// метод который считает кол-во товаров в корзине
	setCount(): number {
		return this.items.length;
	};

	// получить список товаров и сохранить
	setItems(items: Product[]) {
		this.items = items;
	}
}